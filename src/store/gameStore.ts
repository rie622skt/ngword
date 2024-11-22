import { create } from 'zustand';
import { GameRoom, Player } from '../types';

interface GameState {
  currentRoom: GameRoom | null;
  currentPlayer: Player | null;
  setRoom: (room: GameRoom) => void;
  setPlayer: (player: Player) => void;
  addNGWord: (word: string) => void;
  removeNGWord: (index: number) => void;
}

export const useGameStore = create<GameState>((set) => ({
  currentRoom: null,
  currentPlayer: null,
  setRoom: (room) => set({ currentRoom: room }),
  setPlayer: (player) => set({ currentPlayer: player }),
  addNGWord: (word) => set((state) => ({
    currentPlayer: state.currentPlayer ? {
      ...state.currentPlayer,
      ngWords: [...state.currentPlayer.ngWords, word]
    } : null
  })),
  removeNGWord: (index) => set((state) => ({
    currentPlayer: state.currentPlayer ? {
      ...state.currentPlayer,
      ngWords: state.currentPlayer.ngWords.filter((_, i) => i !== index)
    } : null
  }))
}));