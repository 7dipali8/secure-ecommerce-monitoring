import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { User } from './entities/User.js';
import { Product } from './entities/Product.js';
import { CartItem } from './entities/CartItem.js';
import { Order } from './entities/Order.js';
import { OrderItem } from './entities/OrderItem.js';
import { Payment } from './entities/Payment.js';

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
