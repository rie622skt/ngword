import { io, Socket } from 'socket.io-client';
import { GameRoom, Player } from '../types';

class SocketService {
  private socket: Socket | null = null;
  private static instance: SocketService;

  private constructor() {
    this.socket = io(import.meta.env.VITE_WS_URL);
  }

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  public connect() {
    if (!this.socket) {
      this.socket = io(import.meta.env.VITE_WS_URL);
    }
  }

  public createRoom(passphrase: string, player: Player): Promise<GameRoom> {
    return new Promise((resolve, reject) => {
      this.socket?.emit('createRoom', { passphrase, player }, (response: { room: GameRoom } | { error: string }) => {
        if ('error' in response) {
          reject(response.error);
        } else {
          resolve(response.room);
        }
      });
    });
  }

  public joinRoom(passphrase: string, player: Player): Promise<GameRoom> {
    return new Promise((resolve, reject) => {
      this.socket?.emit('joinRoom', { passphrase, player }, (response: { room: GameRoom } | { error: string }) => {
        if ('error' in response) {
          reject(response.error);
        } else {
          resolve(response.room);
        }
      });
    });
  }

  public onRoomUpdate(callback: (room: GameRoom) => void) {
    this.socket?.on('roomUpdate', callback);
  }

  public onPlayerJoined(callback: (room: GameRoom) => void) {
    this.socket?.on('playerJoined', callback);
  }

  public onGameStart(callback: (room: GameRoom) => void) {
    this.socket?.on('gameStart', callback);
  }

  public disconnect() {
    this.socket?.disconnect();
    this.socket = null;
  }
}

export const socketService = SocketService.getInstance();