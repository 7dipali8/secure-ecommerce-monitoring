import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { Order } from './order/order.entity.js';
import { OrderItem } from './order/order-item.entity.js';
import { Product } from './order/product.entity.js';
import { OrderModule } from './order/order.module.js';

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
      entities: [
        Order,
        OrderItem,
        Product,
      ],

      synchronize: false,
    }),

    OrderModule,
  ],
})
export class AppModule {}
