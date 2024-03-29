import { Controller, Get, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  @HttpCode(200)
  getHealth(): string {
    return this.appService.getHealth();
  }

  @Get('/')
  @HttpCode(200)
  getHello(): string {
    return this.appService.getHello();
  }
}
