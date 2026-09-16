import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { CreatePaymentDto } from './dto/create-payment.dto.js';
import { PaymentService } from './payment.service.js';

interface AuthenticatedRequest extends Request {
  user: {
    userId: number;
    email: string;
    role: string;
  };
}

@Controller('payments')
@UseGuards(JwtAuthGuard)
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
  ) {}

  @Post()
  async createPayment(
    @Req() request: AuthenticatedRequest,
    @Body() dto: CreatePaymentDto,
  ) {
    return this.paymentService.createPayment(
      request.user.userId,
      dto,
    );
  }

  @Get()
  async getPayments(
    @Req() request: AuthenticatedRequest,
  ) {
    return this.paymentService.getUserPayments(
      request.user.userId,
    );
  }

  @Get(':id')
  async getPaymentById(
    @Req() request: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.paymentService.getPaymentById(
      request.user.userId,
      id,
    );
  }
}
