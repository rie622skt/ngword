import { Observable } from '@nativescript/core';
import { GameService } from '../services/game-service';

export class HomeViewModel extends Observable {
    private gameService: GameService;
    private _playerName: string = '';
    private _passphrase: string = '';

    constructor() {
        super();
        this.gameService = GameService.getInstance();
    }

    get playerName(): string {
        return this._playerName;
    }

    set playerName(value: string) {
        if (this._playerName !== value) {
            this._playerName = value;
            this.notifyPropertyChange('playerName', value);
        }
    }

    get passphrase(): string {
        return this._passphrase;
    }

    set passphrase(value: string) {
        if (this._passphrase !== value) {
            this._passphrase = value;
            this.notifyPropertyChange('passphrase', value);
        }
    }

    async createRoom() {
        if (!this.validateInput()) return;
        
        const success = await this.gameService.createRoom(this.passphrase, this.playerName);
        if (success) {
            // TODO: Navigate to room page
            console.log('Room created successfully');
        }
    }

    async joinRoom() {
        if (!this.validateInput()) return;
        
        const success = await this.gameService.joinRoom(this.passphrase, this.playerName);
        if (success) {
            // TODO: Navigate to room page
            console.log('Joined room successfully');
        }
    }

    private validateInput(): boolean {
        if (!this.playerName || !this.passphrase) {
            // TODO: Show error dialog
            return false;
        }
        
        if (this.passphrase.length < 4 || this.passphrase.length > 10) {
            // TODO: Show error dialog
            return false;
        }
        
        return true;
    }
}