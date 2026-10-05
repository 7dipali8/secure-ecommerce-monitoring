import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module.js';
import { Product } from '../product.entity.js';

import { ProductController } from './product.controller.js';
import { ProductService } from './product.service.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    AuthModule,
  ],

  controllers: [
    ProductController,
  ],

  providers: [
    ProductService,
  ],
})
export class ProductModule {}
