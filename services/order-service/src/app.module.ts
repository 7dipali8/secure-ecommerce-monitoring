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
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: process.env.DB_PASSWORD,
      database: 'ecommerce_db',

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
