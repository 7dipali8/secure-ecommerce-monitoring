import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { Order } from './order.entity.js';
import { OrderItem } from './order-item.entity.js';
import { Product } from './product.entity.js';
import { CreateOrderDto } from './dto/create-order.dto.js';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async createOrder(userId: number, dto: CreateOrderDto) {
    if (!dto.items || dto.items.length === 0) {
      throw new BadRequestException(
        'Order must contain at least one item',
      );
    }

    return this.dataSource.transaction(async (manager) => {
      let totalAmount = 0;

      const orderItems: {
        product: Product;
        productId: number;
        quantity: number;
        price: number;
      }[] = [];

      // Check products and stock
      for (const item of dto.items) {
        const product = await manager.findOne(Product, {
          where: { id: item.productId },
        });

        if (!product) {
          throw new NotFoundException(
            `Product ${item.productId} not found`,
          );
        }

        if (item.quantity <= 0) {
          throw new BadRequestException(
            `Quantity for product ${product.name} must be greater than 0`,
          );
        }

        if (item.quantity > product.stock) {
          throw new BadRequestException(
            `Only ${product.stock} items of ${product.name} are available`,
          );
        }

        const price = Number(product.price);

        totalAmount += price * item.quantity;

        orderItems.push({
          product,
          productId: product.id,
          quantity: item.quantity,
          price,
        });
      }

      // Create order
      const order = manager.create(Order, {
        userId,
        totalAmount,
        status: 'PENDING',
        shippingAddress: dto.shippingAddress,
      });

      const savedOrder = await manager.save(Order, order);

      const itemsToSave: OrderItem[] = [];

      // Reduce stock and create order items
      for (const item of orderItems) {
        item.product.stock -= item.quantity;

        await manager.save(Product, item.product);

        const orderItem = manager.create(OrderItem, {
          orderId: savedOrder.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        });

        itemsToSave.push(orderItem);
      }

      // Save all order items
      await manager.save(OrderItem, itemsToSave);

      return {
        order: savedOrder,
        items: itemsToSave,
      };
    });
  }

  async getUserOrders(userId: number) {
    return this.orderRepository.find({
      where: { userId },
      order: { id: 'DESC' },
    });
  }
}

