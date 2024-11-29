export interface Player {
  id: string;
  name: string;
  color: string;
  ngWord?: string;
}

export type GameMode = 'manual' | 'random' | 'mixed';

export interface GameState {
  phase: 'settings' | 'setup' | 'ngword' | 'game' | 'results';
  players: Player[];
  currentPlayer: number;
  timeRemaining: number;
  topic?: string;
  gameStarted: boolean;
  gameMode: GameMode;
}

export interface GameSettings {
  maxPlayers: number;
  gameDuration: number; // in seconds
  topics: string[];
}