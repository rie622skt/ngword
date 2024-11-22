import { Observable } from '@nativescript/core';
import { GameRoom, Player } from '../models/game';

export class GameService extends Observable {
    private static instance: GameService;
    private currentRoom: GameRoom | null = null;
    private currentPlayer: Player | null = null;

    private constructor() {
        super();
    }

    public static getInstance(): GameService {
        if (!GameService.instance) {
            GameService.instance = new GameService();
        }
        return GameService.instance;
    }

    public getCurrentRoom(): GameRoom | null {
        return this.currentRoom;
    }

    public getCurrentPlayer(): Player | null {
        return this.currentPlayer;
    }

    public async createRoom(passphrase: string, playerName: string): Promise<boolean> {
        this.currentPlayer = {
            id: Math.random().toString(36).substring(7),
            name: playerName,
            ngWords: []
        };
        
        this.currentRoom = {
            id: Math.random().toString(36).substring(7),
            passphrase,
            players: [this.currentPlayer],
            status: 'waiting',
            timeLimit: 300 // 5 minutes
        };

        this.notifyPropertyChange('currentRoom', this.currentRoom);
        return true;
    }

    public async joinRoom(passphrase: string, playerName: string): Promise<boolean> {
        // TODO: Implement WebSocket connection and room joining
        this.currentPlayer = {
            id: Math.random().toString(36).substring(7),
            name: playerName,
            ngWords: []
        };
        return true;
    }

    public async setNGWords(words: string[]): Promise<boolean> {
        if (!this.currentPlayer || !this.currentRoom) return false;
        this.currentPlayer.ngWords = words;
        return true;
    }
}