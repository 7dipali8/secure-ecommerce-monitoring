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
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME || 'ecommerce_db',
      ssl: {
        rejectUnauthorized: false,
      },
      entities: [Payment, Order],
      synchronize: false,
    }),

    AuthModule,
    PaymentModule,
  ],
})
export class AppModule {}
