import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Gaming } from '../../../src/components/Canvas';

@WebSocketGateway()
export class GameGateway {
  g = new Gaming(1000, 600);
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): any {
    return this.g.Canvas({ width: 1000, height: 600 });
  }
}
