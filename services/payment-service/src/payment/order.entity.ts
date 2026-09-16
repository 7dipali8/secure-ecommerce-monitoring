import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'user_id',
    type: 'integer',
  })
  userId: number;

  @Column({
    name: 'total_amount',
    type: 'numeric',
    precision: 10,
    scale: 2,
  })
  totalAmount: number;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: true,
  })
  status: string | null;

  @Column({
    name: 'shipping_address',
    type: 'text',
  })
  shippingAddress: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt: Date;
}
