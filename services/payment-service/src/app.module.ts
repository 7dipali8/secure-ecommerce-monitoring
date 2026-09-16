import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { Payment } from './payment/payment.entity.js';
import { Order } from './payment/order.entity.js';
import { PaymentModule } from './payment/payment.module.js';
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: process.env.DB_PASSWORD,
      database: 'ecommerce_db',
      entities: [Payment, Order],
      synchronize: false,
    }),

    AuthModule,
    PaymentModule,
  ],
})
export class AppModule {}
