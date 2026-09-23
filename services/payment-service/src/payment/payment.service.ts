import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Payment } from './payment.entity.js';
import { Order } from './order.entity.js';
import { CreatePaymentDto } from './dto/create-payment.dto.js';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,

    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async createPayment(userId: number, dto: CreatePaymentDto) {
    if (dto.amount <= 0) {
      throw new BadRequestException(
        'Payment amount must be greater than 0',
      );
    }

    const order = await this.orderRepository.findOne({
      where: {
        id: dto.orderId,
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order.userId !== userId) {
      throw new ForbiddenException(
        'You are not allowed to pay for this order',
      );
    }

    // Prevent paying an already completed order.
    if (order.status === 'PAID') {
      throw new BadRequestException(
        'Order has already been paid',
      );
    }

    const orderAmount = Number(order.totalAmount);
    const paymentAmount = Number(dto.amount);

    if (orderAmount !== paymentAmount) {
      throw new BadRequestException(
        'Payment amount does not match order total',
      );
    }

    const existingPayment = await this.paymentRepository.findOne({
      where: {
        orderId: dto.orderId,
      },
    });

    if (existingPayment) {
      throw new BadRequestException(
        'Payment already exists for this order',
      );
    }

    const payment = this.paymentRepository.create({
      orderId: dto.orderId,
      paymentMethod: dto.paymentMethod,
      transactionId: `TXN-${Date.now()}`,
      amount: paymentAmount,
      status: 'SUCCESS',
      paidAt: new Date(),
    });

    // Save payment first.
    const savedPayment =
      await this.paymentRepository.save(payment);

    // Payment succeeded, so update the corresponding order.
    order.status = 'PAID';

    await this.orderRepository.save(order);

    return {
      message: 'Payment successful',
      payment: savedPayment,
    };
  }

  async getUserPayments(userId: number) {
    const orders = await this.orderRepository.find({
      where: {
        userId,
      },
    });

    if (orders.length === 0) {
      return [];
    }

    const orderIds = orders.map((order) => order.id);

    return this.paymentRepository
      .createQueryBuilder('payment')
      .where('payment.order_id IN (:...orderIds)', {
        orderIds,
      })
      .orderBy('payment.id', 'DESC')
      .getMany();
  }

  async getPaymentById(userId: number, id: number) {
    const payment = await this.paymentRepository.findOne({
      where: {
        id,
      },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    const order = await this.orderRepository.findOne({
      where: {
        id: payment.orderId,
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order.userId !== userId) {
      throw new ForbiddenException(
        'You are not allowed to view this payment',
      );
    }

    return payment;
  }
}
