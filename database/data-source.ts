import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { User } from './entities/User.ts';
import { Product } from './entities/Product.ts';
import { CartItem } from './entities/CartItem.ts';
import { Order } from './entities/Order.ts';
import { OrderItem } from './entities/OrderItem.ts';
import { Payment } from './entities/Payment.ts';

export default new DataSource({
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
    User,
    Product,
    CartItem,
    Order,
    OrderItem,
    Payment,
  ],

  migrations: [
    'database/migrations/*.{ts,js}',
  ],

  synchronize: false,
});
