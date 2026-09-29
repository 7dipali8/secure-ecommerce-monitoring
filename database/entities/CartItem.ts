import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('cart_items')
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', type: 'integer' })
  userId: number;

  @Column({ name: 'product_id', type: 'integer' })
  productId: number;

  @Column({ type: 'integer', default: 1 })
  quantity: number;

  @CreateDateColumn({ name: 'added_at', type: 'timestamp' })
  addedAt: Date;
}
