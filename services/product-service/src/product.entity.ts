import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 150,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  brand: string | null;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string | null;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
  })
  price: number;

  @Column({
    name: 'original_price',
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  originalPrice: number | null;

  @Column({
    name: 'discount_percent',
    type: 'integer',
    default: 0,
    nullable: true,
  })
  discountPercent: number | null;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  category: string | null;

  @Column({
    type: 'integer',
    default: 0,
  })
  stock: number;

  @Column({
    name: 'image_url',
    type: 'text',
    nullable: true,
  })
  imageUrl: string | null;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt: Date;
}
