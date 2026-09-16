
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GatewayService {
  private readonly authUrl = process.env.AUTH_SERVICE_URL!;
  private readonly productUrl = process.env.PRODUCT_SERVICE_URL!;
  private readonly cartUrl = process.env.CART_SERVICE_URL!;
  private readonly orderUrl = process.env.ORDER_SERVICE_URL!;
  private readonly paymentUrl = process.env.PAYMENT_SERVICE_URL!;

  async forwardGet(
    service: string,
    path: string,
    headers: Record<string, string> = {},
  ) {
    const url = `${service}${path}`;

    const response = await axios.get(url, {
      headers,
    });

    return response.data;
  }

  async forwardPost(
    service: string,
    path: string,
    body: Record<string, unknown>,
    headers: Record<string, string> = {},
  ) {
    const url = `${service}${path}`;

    const response = await axios.post(url, body, {
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  }
}

