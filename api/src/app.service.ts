import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  x = 0;
  // getHello(): string {
  //   return 'Hello World!';
  // }
  getInc(): number {
    return ++this.x;
  }
}
