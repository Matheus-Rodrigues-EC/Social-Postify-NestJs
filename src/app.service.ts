import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(): string {
    return "I'm okay!";
  }

  getHello(): string {
    return "Hello World!";
  }
}
