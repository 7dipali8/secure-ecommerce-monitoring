import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'order_id',
    type: 'integer',
  })
  orderId: number;

  @Column({
    name: 'product_id',
    type: 'integer',
  })
  productId: number;

  @Column({
    type: 'integer',
  })
  quantity: number;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
  })
  price: number;
}
