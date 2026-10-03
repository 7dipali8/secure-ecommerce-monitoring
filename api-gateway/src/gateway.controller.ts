import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
} from '@nestjs/common';

import { GatewayService } from './gateway.service.js';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  // =========================
  // AUTH ROUTES
  // =========================

  @Post('auth/register')
  async register(
    @Body()
    body: {
      name: string;
      email: string;
      password: string;
    },
  ) {
    return this.gatewayService.forwardPost(
      process.env.AUTH_SERVICE_URL!,
      '/auth/register',
      body,
    );
  }

  @Post('auth/login')
  async login(
    @Body()
    body: {
      email: string;
      password: string;
    },
  ) {
    return this.gatewayService.forwardPost(
      process.env.AUTH_SERVICE_URL!,
      '/auth/login',
      body,
    );
  }

  // =========================
  // PRODUCT ROUTES
  // =========================

  @Get('products')
  async getProducts(@Headers() headers: Record<string, string>) {
    return this.gatewayService.forwardGet(
      process.env.PRODUCT_SERVICE_URL!,
      '/products',
      {
        authorization: headers.authorization || '',
      },
    );
  }

  // =========================
  // CART ROUTES
  // =========================

  @Get('cart')
  async getCart(@Headers() headers: Record<string, string>) {
    return this.gatewayService.forwardGet(
      process.env.CART_SERVICE_URL!,
      '/cart',
      {
        authorization: headers.authorization || '',
      },
    );
  }

  @Post('cart')
  async addToCart(
    @Body() body: { productId: number; quantity: number },
    @Headers() headers: Record<string, string>,
  ) {
    return this.gatewayService.forwardPost(
      process.env.CART_SERVICE_URL!,
      '/cart',
      body,
      {
        authorization: headers.authorization || '',
      },
    );
  }

  @Post('cart/clear-purchased')
  async clearPurchasedCartItems(
    @Body() body: { cartItemIds: number[] },
    @Headers() headers: Record<string, string>,
  ) {
    return this.gatewayService.forwardPost(
      process.env.CART_SERVICE_URL!,
      '/cart/clear-purchased',
      body,
      {
        authorization: headers.authorization || '',
      },
    );
  }

  // =========================
  // ORDER ROUTES
  // =========================

  @Get('orders')
  async getOrders(@Headers() headers: Record<string, string>) {
    return this.gatewayService.forwardGet(
      process.env.ORDER_SERVICE_URL!,
      '/orders',
      {
        authorization: headers.authorization || '',
      },
    );
  }

  @Post('orders')
  async createOrder(
    @Body()
    body: {
      shippingAddress: string;
      items: {
        productId: number;
        quantity: number;
      }[];
    },
    @Headers() headers: Record<string, string>,
  ) {
    return this.gatewayService.forwardPost(
      process.env.ORDER_SERVICE_URL!,
      '/orders',
      body,
      {
        authorization: headers.authorization || '',
      },
    );
  }

  // =========================
  // PAYMENT ROUTES
  // =========================

  @Get('payments')
  async getPayments(@Headers() headers: Record<string, string>) {
    return this.gatewayService.forwardGet(
      process.env.PAYMENT_SERVICE_URL!,
      '/payments',
      {
        authorization: headers.authorization || '',
      },
    );
  }

  @Get('payments/:id')
  async getPaymentById(
    @Param('id') id: string,
    @Headers() headers: Record<string, string>,
  ) {
    return this.gatewayService.forwardGet(
      process.env.PAYMENT_SERVICE_URL!,
      `/payments/${id}`,
      {
        authorization: headers.authorization || '',
      },
    );
  }

  @Post('payments')
  async createPayment(
    @Body()
    body: {
      orderId: number;
      paymentMethod: string;
      amount: number;
    },
    @Headers() headers: Record<string, string>,
  ) {
    return this.gatewayService.forwardPost(
      process.env.PAYMENT_SERVICE_URL!,
      '/payments',
      body,
      {
        authorization: headers.authorization || '',
      },
    );
  }
}
