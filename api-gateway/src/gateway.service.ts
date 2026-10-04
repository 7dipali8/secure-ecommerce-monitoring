import {
  BadGatewayException,
  HttpException,
  Injectable,
} from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GatewayService {
  private readonly authUrl = process.env.AUTH_SERVICE_URL!;
  private readonly productUrl = process.env.PRODUCT_SERVICE_URL!;
  private readonly cartUrl = process.env.CART_SERVICE_URL!;
  private readonly orderUrl = process.env.ORDER_SERVICE_URL!;
  private readonly paymentUrl = process.env.PAYMENT_SERVICE_URL!;

  private handleAxiosError(error: unknown): never {
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;
      const data = error.response.data;

      throw new HttpException(
        data || {
          message: 'Downstream service request failed',
        },
        status,
      );
    }

    throw new BadGatewayException(
      'Unable to communicate with downstream service',
    );
  }

  async forwardGet(
    service: string,
    path: string,
    headers: Record<string, string> = {},
  ) {
    const url = `${service}${path}`;

    try {
      const response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      this.handleAxiosError(error);
    }
  }

  async forwardPost(
    service: string,
    path: string,
    body: Record<string, unknown>,
    headers: Record<string, string> = {},
  ) {
    const url = `${service}${path}`;

    try {
      const response = await axios.post(url, body, {
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      this.handleAxiosError(error);
    }
  }

  async forwardPatch(
    service: string,
    path: string,
    body: Record<string, unknown>,
    headers: Record<string, string> = {},
  ) {
    const url = `${service}${path}`;

    try {
      const response = await axios.patch(url, body, {
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      this.handleAxiosError(error);
    }
  }

  async forwardDelete(
    service: string,
    path: string,
    headers: Record<string, string> = {},
  ) {
    const url = `${service}${path}`;

    try {
      const response = await axios.delete(url, { headers });
      return response.data;
    } catch (error) {
      this.handleAxiosError(error);
    }
  }
}
