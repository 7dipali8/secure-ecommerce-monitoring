import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { GatewayController } from './gateway.controller.js';
import { GatewayService } from './gateway.service.js';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [GatewayController, AppController],
  providers: [GatewayService, AppService],
})
export class AppModule {}
