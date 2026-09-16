import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module.js';
import { CartItem } from './cart.entity.js';
import { Product } from './product.entity.js';
import { CartController } from './cart.controller.js';
import { CartService } from './cart.service.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CartItem,
      Product,
    ]),
    AuthModule,
  ],

  controllers: [
    CartController,
  ],

  providers: [
    CartService,
  ],
})
export class CartModule {}
