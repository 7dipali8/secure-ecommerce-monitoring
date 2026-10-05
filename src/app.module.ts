import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { Product } from './product.entity.js';
import { ProductModule } from './products/product.module.js';
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
      entities: [Product],
      synchronize: false,
      ssl: {
      rejectUnauthorized: false,
      },
    }),

    AuthModule,

    ProductModule,
  ],
})
export class AppModule {}
