import React, { useState } from 'react';
import { PlayerRegistration } from './components/PlayerRegistration';
import { NGWordSetup } from './components/NGWordSetup';
import { GamePlay } from './components/GamePlay';
import { GameResults } from './components/GameResults';
import { GameSettings } from './components/GameSettings';
import { GameStartConfirmation } from './components/GameStartConfirmation';
import { GameState, Player, GameMode } from './types/game';
import { GAME_SETTINGS } from './constants/gameSettings';
import { Settings, Home } from 'lucide-react';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    phase: 'setup',
    players: [],
    currentPlayer: 0,
    timeRemaining: GAME_SETTINGS.gameDuration,
    gameStarted: false,
    topic: GAME_SETTINGS.topics[Math.floor(Math.random() * GAME_SETTINGS.topics.length)],
    gameMode: 'manual'
  });
  const [showSettings, setShowSettings] = useState(false);
  const [eliminatedPlayers, setEliminatedPlayers] = useState<Set<string>>(new Set());
  const [showGameStartConfirmation, setShowGameStartConfirmation] = useState(false);

  const handleModeSelect = (mode: GameMode) => {
    setGameState({
      ...gameState,
      gameMode: mode
    });
    setShowSettings(false);
  };

  const handlePlayersConfirmed = (players: Player[]) => {
    setGameState({
      ...gameState,
      players,
      phase: 'ngword'
    });
  };

  const handleNGWordSet = (ngWord: string) => {
    const players = [...gameState.players];
    const targetPlayerIndex = (gameState.currentPlayer + 1) % players.length;
    players[targetPlayerIndex] = { ...players[targetPlayerIndex], ngWord };

    if (gameState.currentPlayer === players.length - 1) {
      setShowGameStartConfirmation(true);
      setGameState({
        ...gameState,
        players,
        currentPlayer: gameState.currentPlayer + 1
      });
    } else {
      setGameState({
        ...gameState,
        players,
        currentPlayer: gameState.currentPlayer + 1
      });
    }
  };

  const handleGameStart = () => {
    setShowGameStartConfirmation(false);
    setGameState({
      ...gameState,
      phase: 'game',
      gameStarted: true
    });
  };

  const handleGameEnd = (eliminatedPlayers: Set<string>) => {
    setEliminatedPlayers(eliminatedPlayers);
    setGameState({ ...gameState, phase: 'results' });
  };

  const handlePlayAgain = () => {
    setGameState({
      phase: 'setup',
      players: [],
      currentPlayer: 0,
      timeRemaining: GAME_SETTINGS.gameDuration,
      gameStarted: false,
      topic: GAME_SETTINGS.topics[Math.floor(Math.random() * GAME_SETTINGS.topics.length)],
      gameMode: 'manual'
    });
    setEliminatedPlayers(new Set());
    setShowGameStartConfirmation(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="relative mb-8">
          <h1 className="text-4xl font-bold text-center text-gray-800">
            NGワードゲーム
          </h1>
          {showSettings ? (
            <button
              onClick={() => setShowSettings(false)}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-full transition-colors"
              title="ホームに戻る"
            >
              <Home className="w-6 h-6" />
            </button>
          ) : gameState.phase === 'setup' && (
            <button
              onClick={() => setShowSettings(true)}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-full transition-colors"
              title="設定"
            >
              <Settings className="w-6 h-6" />
            </button>
          )}
        </div>

        {showSettings ? (
          <GameSettings onModeSelect={handleModeSelect} />
        ) : (
          <>
            {gameState.phase === 'setup' && (
              <PlayerRegistration 
                onPlayersConfirmed={handlePlayersConfirmed}
                gameMode={gameState.gameMode}
              />
            )}

            {gameState.phase === 'ngword' && !showGameStartConfirmation && gameState.topic && (
              <NGWordSetup
                players={gameState.players}
                currentPlayerIndex={gameState.currentPlayer}
                targetPlayerIndex={(gameState.currentPlayer + 1) % gameState.players.length}
                onNGWordSet={handleNGWordSet}
                topic={gameState.topic}
                gameMode={gameState.gameMode}
              />
            )}

            {showGameStartConfirmation && gameState.topic && (
              <GameStartConfirmation
                players={gameState.players}
                topic={gameState.topic}
                onConfirm={handleGameStart}
              />
            )}

            {gameState.phase === 'game' && gameState.topic && (
              <GamePlay
                players={gameState.players}
                topic={gameState.topic}
                onGameEnd={handleGameEnd}
              />
            )}

            {gameState.phase === 'results' && (
              <GameResults
                players={gameState.players}
                eliminatedPlayers={eliminatedPlayers}
                onPlayAgain={handlePlayAgain}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;