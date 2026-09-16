import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { CartItem } from './cart/cart.entity.js';
import { Product } from './cart/product.entity.js';
import { CartModule } from './cart/cart.module.js';

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
        CartItem,
        Product,
      ],
      synchronize: false,
    }),

    CartModule,
  ],
})
export class AppModule {}
