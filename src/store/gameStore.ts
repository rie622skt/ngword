import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';

interface Player {
  id: string;
  name: string;
}

interface GameState {
  socket: Socket | null;
  roomId: string | null;
  playerId: string | null;
  playerName: string | null;
  players: Player[];
  ngWords: Record<string, string>;
  messages: Array<{ playerId: string; message: string; playerName: string }>;
  gameStatus: 'waiting' | 'ready' | 'playing' | 'ended';
  error: string | null;
  isDebugMode: boolean;
  initialize: () => void;
  createRoom: (playerName: string) => void;
  joinRoom: (roomId: string, playerName: string) => void;
  setNgWord: (ngWord: string, forPlayer: string) => void;
  sendMessage: (message: string) => void;
  endGame: (loser: string) => void;
  reset: () => void;
  toggleDebugMode: () => void;
}

let socket: Socket;

export const useGameStore = create<GameState>((set, get) => ({
  socket: null,
  roomId: null,
  playerId: null,
  playerName: null,
  players: [],
  ngWords: {},
  messages: [],
  gameStatus: 'waiting',
  error: null,
  isDebugMode: false,

  initialize: () => {
    if (!socket) {
      socket = io('http://localhost:3000', {
        reconnectionAttempts: 5,
        timeout: 10000,
        withCredentials: true,
        transports: ['websocket', 'polling']
      });
    }

    set({ socket });

    socket.on('connect', () => {
      console.log('Connected to server');
      set({ playerId: socket.id, error: null });
    });

    socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      set({ error: 'サーバーに接続できません。しばらく待ってから再度お試しください。' });
    });

    socket.on('roomCreated', (roomId: string) => {
      set({ roomId, gameStatus: 'waiting', error: null });
      
      if (get().isDebugMode) {
        setTimeout(() => {
          socket.emit('joinRoom', { 
            roomId, 
            playerName: 'デバッグプレイヤー'
          });
        }, 1000);
      }
    });

    socket.on('gameReady', (players: Player[]) => {
      set({ players, gameStatus: 'ready', error: null });
      
      if (get().isDebugMode) {
        const otherPlayer = players.find(p => p.id !== get().playerId);
        if (otherPlayer) {
          setTimeout(() => {
            socket.emit('setNgWord', {
              roomId: get().roomId,
              ngWord: 'テスト',
              forPlayer: otherPlayer.id
            });
            socket.emit('setNgWord', {
              roomId: get().roomId,
              ngWord: 'デバッグ',
              forPlayer: get().playerId || ''
            });
          }, 1000);
        }
      }
    });

    socket.on('gameStart', (ngWords: Record<string, string>) => {
      set({ ngWords, gameStatus: 'playing', error: null });
      
      if (get().isDebugMode) {
        const debugMessages = [
          'こんにちは！',
          '今日はいい天気ですね',
          '趣味は何ですか？',
          '映画を見るのが好きです'
        ];
        
        debugMessages.forEach((msg, index) => {
          setTimeout(() => {
            socket.emit('sendMessage', {
              roomId: get().roomId,
              message: msg,
              playerName: 'デバッグプレイヤー'
            });
          }, (index + 1) * 2000);
        });
      }
    });

    socket.on('newMessage', (message: { playerId: string; message: string; playerName: string }) => {
      set(state => ({
        messages: [...state.messages, message]
      }));
    });

    socket.on('gameOver', ({ loser }) => {
      set({ gameStatus: 'ended' });
    });

    socket.on('playerLeft', () => {
      set({ 
        error: '相手プレイヤーが退出しました',
        gameStatus: 'ended' 
      });
    });

    socket.on('roomError', (error: string) => {
      set({ error });
    });

    socket.on('disconnect', () => {
      set({ error: 'サーバーとの接続が切断されました。再接続しています...' });
    });

    return () => {
      socket.disconnect();
    };
  },

  createRoom: (playerName: string) => {
    get().socket?.emit('createRoom', { playerName });
    set({ playerName });
  },

  joinRoom: (roomId: string, playerName: string) => {
    get().socket?.emit('joinRoom', { roomId, playerName });
    set({ playerName });
  },

  setNgWord: (ngWord: string, forPlayer: string) => {
    get().socket?.emit('setNgWord', {
      roomId: get().roomId,
      ngWord,
      forPlayer
    });
  },

  sendMessage: (message: string) => {
    get().socket?.emit('sendMessage', {
      roomId: get().roomId,
      message,
      playerName: get().playerName
    });
  },

  endGame: (loser: string) => {
    get().socket?.emit('gameEnd', {
      roomId: get().roomId,
      loser
    });
  },

  reset: () => {
    set({
      roomId: null,
      players: [],
      ngWords: {},
      messages: [],
      gameStatus: 'waiting',
      error: null
    });
  },

  toggleDebugMode: () => {
    set(state => ({ isDebugMode: !state.isDebugMode }));
  }
}));