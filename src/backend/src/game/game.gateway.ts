  import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Gaming } from '../Canvas';

@WebSocketGateway(5001, { cors: { origin: true, credentials: true } })
export class GameGateway {
  gameInstance = new Gaming(1000, 1000);

  @SubscribeMessage('events')
  handleEvent(
      @MessageBody() data: string,
      @ConnectedSocket() client: Socket,
  ): any {
    this.gameInstance.rendering(client);
    return this.gameInstance.Info;
  }

  @SubscribeMessage('PaddleUp')
  handlePaddleUp(
      @MessageBody() data: string,
      @ConnectedSocket() client: Socket,
  ): any {
      try {
        this.gameInstance.Info.CheckMove(client.id).PaddleUp();
      } catch (e) {
        console.log(e);
      }
  }

  @SubscribeMessage('PaddleDown')
  handlePaddleDown(
      @MessageBody() data: string,
      @ConnectedSocket() client: Socket,
  ): any {
      try {
        this.gameInstance.Info.CheckMove(client.id).PaddleDown();
      } catch (e) {
        console.log(e);
      }
  }
}
