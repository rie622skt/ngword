export interface Player {
    id: string;
    name: string;
    ngWords: string[];
}

export interface GameRoom {
    id: string;
    passphrase: string;
    players: Player[];
    status: 'waiting' | 'playing' | 'finished';
    timeLimit: number;
}

export interface GameState {
    currentRoom?: GameRoom;
    currentPlayer?: Player;
}