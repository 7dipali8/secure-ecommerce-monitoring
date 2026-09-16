import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '../product.entity.js';
import { CreateProductDto } from './dto/create-product.dto.js';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll() {
    return this.productRepository.find({
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create({
      name: createProductDto.name,
      description: createProductDto.description ?? null,
      price: createProductDto.price,
      category: createProductDto.category ?? null,
      stock: createProductDto.stock ?? 0,
      imageUrl: createProductDto.imageUrl ?? null,
    });

    return this.productRepository.save(product);
  }
}
