import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CartItem } from './cart.entity.js';
import { Product } from './product.entity.js';
import { AddCartItemDto } from './dto/add-cart-item.dto.js';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartRepository: Repository<CartItem>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getCart(userId: number) {
    const items = await this.cartRepository.find({
      where: { userId },
      order: { id: 'ASC' },
    });

    const total = items.reduce(
      (sum, item) => sum + Number(item.quantity),
      0,
    );

    return {
      items,
      totalItems: total,
    };
  }

  async addToCart(userId: number, dto: AddCartItemDto) {
    const product = await this.productRepository.findOne({
      where: { id: dto.productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const existingItem = await this.cartRepository.findOne({
      where: {
        userId,
        productId: dto.productId,
      },
    });

    const newQuantity =
      (existingItem?.quantity ?? 0) + dto.quantity;

    if (newQuantity > product.stock) {
      throw new BadRequestException(
        `Only ${product.stock} items are available in stock`,
      );
    }

    if (existingItem) {
      existingItem.quantity = newQuantity;

      return this.cartRepository.save(existingItem);
    }

    const cartItem = this.cartRepository.create({
      userId,
      productId: dto.productId,
      quantity: dto.quantity,
    });

    return this.cartRepository.save(cartItem);
  }

  async updateQuantity(
    userId: number,
    cartItemId: number,
    quantity: number,
  ) {
    const item = await this.cartRepository.findOne({
      where: {
        id: cartItemId,
        userId,
      },
    });

    if (!item) {
      throw new NotFoundException('Cart item not found');
    }

    const product = await this.productRepository.findOne({
      where: { id: item.productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (quantity > product.stock) {
      throw new BadRequestException(
        `Only ${product.stock} items are available in stock`,
      );
    }

    item.quantity = quantity;

    return this.cartRepository.save(item);
  }

  async removeFromCart(
    userId: number,
    cartItemId: number,
  ) {
    const item = await this.cartRepository.findOne({
      where: {
        id: cartItemId,
        userId,
      },
    });

    if (!item) {
      throw new NotFoundException('Cart item not found');
    }

    await this.cartRepository.remove(item);

    return {
      message: 'Item removed from cart',
    };
  }
}
