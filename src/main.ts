import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import client from 'prom-client';

import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  client.collectDefaultMetrics();

  const httpRequestsTotal = new client.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status_code'],
  });

  app.use((req: any, res: any, next: any) => {
    res.on('finish', () => {
      httpRequestsTotal.inc({
        method: req.method,
        route: req.route?.path || req.path,
        status_code: res.statusCode,
      });
    });

    next();
  });

  app.getHttpAdapter().get('/metrics', async (_req, res) => {
    res.setHeader('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
  });

  await app.listen(process.env.PORT ?? 3001);

  console.log('Product Service running on port 3001');
}

bootstrap();
