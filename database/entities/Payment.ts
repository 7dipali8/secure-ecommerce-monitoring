import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'order_id',
    type: 'integer',
  })
  orderId: number;

  @Column({
    name: 'payment_method',
    type: 'varchar',
    length: 50,
  })
  paymentMethod: string;

  @Column({
    name: 'transaction_id',
    type: 'varchar',
    length: 150,
    nullable: true,
  })
  transactionId: string | null;

  @Column({
    type: 'numeric',
  })
  amount: number;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: true,
  })
  status: string | null;

  @Column({
    name: 'paid_at',
    type: 'timestamp',
    nullable: true,
  })
  paidAt: Date | null;
}
