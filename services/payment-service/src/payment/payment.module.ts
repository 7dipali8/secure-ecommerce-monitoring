import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { Payment } from './payment.entity.js';
import { Order } from './order.entity.js';
import { PaymentController } from './payment.controller.js';
import { PaymentService } from './payment.service.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment, Order]),

    AuthModule,

    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
