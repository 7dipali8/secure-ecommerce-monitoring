
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { Request } from 'express';

import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { AddCartItemDto } from './dto/add-cart-item.dto.js';
import { CartService } from './cart.service.js';

interface AuthenticatedRequest extends Request {
  user: {
    userId: number;
    email: string;
    role: string;
  };
}

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(
    private readonly cartService: CartService,
  ) {}

  @Get()
  async getCart(
    @Req() request: AuthenticatedRequest,
  ) {
    return this.cartService.getCart(
      request.user.userId,
    );
  }

  @Post()
  async addToCart(
    @Req() request: AuthenticatedRequest,
    @Body() dto: AddCartItemDto,
  ) {
    return this.cartService.addToCart(
      request.user.userId,
      dto,
    );
  }

  @Patch(':id')
  async updateQuantity(
    @Req() request: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
    @Body('quantity', ParseIntPipe) quantity: number,
  ) {
    return this.cartService.updateQuantity(
      request.user.userId,
      id,
      quantity,
    );
  }

  @Post('clear-purchased')
  async removePurchasedItems(
    @Req() request: AuthenticatedRequest,
    @Body('cartItemIds') cartItemIds: number[],
  ) {
    if (!Array.isArray(cartItemIds)) {
      throw new BadRequestException('cartItemIds must be an array');
    }

    return this.cartService.removePurchasedItems(
      request.user.userId,
      cartItemIds,
    );
  }

  @Delete(':id')
  async removeFromCart(
    @Req() request: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.cartService.removeFromCart(
      request.user.userId,
      id,
    );
  }
}
