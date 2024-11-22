import { Observable } from '@nativescript/core';
import { GameService } from '../services/game-service';
import { GameRoom } from '../models/game';

export class RoomViewModel extends Observable {
    private gameService: GameService;
    private _messageText: string = '';
    private _newNGWord: string = '';
    private _ngWords: string[] = [];
    private _messages: Array<{player: string, message: string}> = [];

    constructor() {
        super();
        this.gameService = GameService.getInstance();
        this.initialize();
    }

    private async initialize() {
        // Initialize room state
        const room = this.gameService.getCurrentRoom();
        if (room) {
            this.notifyPropertyChange('roomId', room.id);
            this.notifyPropertyChange('playerCount', room.players.length);
            this.notifyPropertyChange('gameStatus', this.getStatusText(room));
        }
    }

    get messageText(): string {
        return this._messageText;
    }

    set messageText(value: string) {
        if (this._messageText !== value) {
            this._messageText = value;
            this.notifyPropertyChange('messageText', value);
        }
    }

    get newNGWord(): string {
        return this._newNGWord;
    }

    set newNGWord(value: string) {
        if (this._newNGWord !== value) {
            this._newNGWord = value;
            this.notifyPropertyChange('newNGWord', value);
        }
    }

    get ngWords(): string[] {
        return this._ngWords;
    }

    get messages(): Array<{player: string, message: string}> {
        return this._messages;
    }

    get isWaiting(): boolean {
        return this.gameService.getCurrentRoom()?.status === 'waiting';
    }

    get isPlaying(): boolean {
        return this.gameService.getCurrentRoom()?.status === 'playing';
    }

    async addNGWord() {
        if (!this.newNGWord.trim()) return;
        
        if (this._ngWords.length >= 3) {
            // Show error: Maximum 3 NG words allowed
            return;
        }

        this._ngWords.push(this.newNGWord.trim());
        this.newNGWord = '';
        this.notifyPropertyChange('ngWords', this._ngWords);
        await this.gameService.setNGWords(this._ngWords);
    }

    removeNGWord(args: any) {
        const index = args.index;
        if (index >= 0) {
            this._ngWords.splice(index, 1);
            this.notifyPropertyChange('ngWords', this._ngWords);
            this.gameService.setNGWords(this._ngWords);
        }
    }

    async sendMessage() {
        if (!this.messageText.trim()) return;

        const player = this.gameService.getCurrentPlayer();
        if (!player) return;

        this._messages.push({
            player: player.name,
            message: this.messageText.trim()
        });

        this.messageText = '';
        this.notifyPropertyChange('messages', this._messages);
        
        // TODO: Send message through WebSocket
    }

    private getStatusText(room: GameRoom): string {
        switch (room.status) {
            case 'waiting':
                return '対戦相手を待っています...';
            case 'playing':
                return 'ゲーム中';
            case 'finished':
                return 'ゲーム終了';
            default:
                return '';
        }
    }
}