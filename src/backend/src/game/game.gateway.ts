  import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Gaming } from '../Canvas';
import { LobbyManager } from '../lobby/lobby';

@WebSocketGateway(5001, { cors: { origin: true, credentials: true } })
export class GameGateway {
  //gameInstance = new Gaming(1000, 1000);
  maxlobby = 0;
  jwt = require('jwt-simple');
  name = ['charli', 'florian', 'julien', 'lucas', 'maxime', 'mickael', 'nicolas', 'pierre', 'quentin', 'thomas'];
  payload = {
    sub: '1234567890',
    name: '',
    log: new Date().getTime(),
    };
  secret = "xxx";
  token:any;
  LobbyManager = new LobbyManager();
  PlayerConnected = [];
  @SubscribeMessage('events')
  handleEvent(
      @MessageBody() data: string,
      @ConnectedSocket() client: Socket,
  ): any {

    this.LobbyManager.createLobby();
    this.LobbyManager.getLobbyInstance('0').rendering(client);
    return this.LobbyManager.getLobbyInstance('0').Info;
  }
  @SubscribeMessage('connection')
    handleConnection(
        @MessageBody() data: string,
        @ConnectedSocket() client: Socket,
    ): any {
        console.log('Player connected');
        this.payload.log = new Date().getTime();
        this.payload.name = this.name[Math.floor(Math.random() * this.name.length)];
        console.log('Player connected');
        console.log('TEST');
        this.token = this.jwt.encode(this.payload, this.secret);
        this.PlayerConnected.push(this.jwt.decode(this.token, this.secret));
        console.log(this.token);
        console.log(this.jwt.decode(this.token, this.secret));
        console.log('Connected : ' + this.PlayerConnected.length);
        console.log(this.PlayerConnected);
  }

  @SubscribeMessage('CreateLobby')
    handleCreateLobby(
        @MessageBody() data: string,
        @ConnectedSocket() client: Socket,
    ): any {
      console.log('Attempting to create a lobby');
      this.LobbyManager.createLobby();
      console.log(this.LobbyManager.LobbyList.length);

  }
  @SubscribeMessage('JoinLobby')
    handleJoinLobby(
        @MessageBody() data: string,
        @ConnectedSocket() client: Socket,
    ): any {
        console.log('Player joining lobby');
        this.LobbyManager.JoinLobby('0');
  }

  @SubscribeMessage('LeaveLobby')
    handleLeaveLobby(
        @MessageBody() data: string,
        @ConnectedSocket() client: Socket,
    ): any {
        console.log('Player leaving lobby');
        this.LobbyManager.LeaveLobby('0');
  }

  @SubscribeMessage('disconnect')
    handleDisconnect(
        @MessageBody() data: string,
        @ConnectedSocket() client: Socket,
    ): any {
    console.log('Player disconnected');
    this.LobbyManager.LeaveLobby('0');
    this.LobbyManager.printLobby();
    this.LobbyManager.getLobbyInstance('0').Info.Connected[0] = "";
  }
  @SubscribeMessage('LobbyInfo')
  handleLobbyInfo(
      @MessageBody() data: string,
      @ConnectedSocket() client: Socket,
  ): any {
    console.log('Player asking for lobby info');
    this.LobbyManager.printLobby();
  }

  @SubscribeMessage('PaddleUp')
  handlePaddleUp(
      @MessageBody() data: string,
      @ConnectedSocket() client: Socket,
  ): any {
      try {
        this.LobbyManager.getLobbyInstance('0').Info.CheckMove(client.id).PaddleUp();
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
        this.LobbyManager.getLobbyInstance('0').Info.CheckMove(client.id).PaddleDown();
      } catch (e) {
        console.log(e);
      }
  }
}
