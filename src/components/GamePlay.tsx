import React, { useState, useEffect } from 'react';
import { Player } from '../types/game';
import { Timer, AlertTriangle, EyeOff } from 'lucide-react';
import { GAME_SETTINGS } from '../constants/gameSettings';
import { NGWordConfirmation } from './NGWordConfirmation';

interface GamePlayProps {
  players: Player[];
  topic: string;
  onGameEnd: (eliminatedPlayers: Set<string>) => void;
}

export function GamePlay({ players, topic, onGameEnd }: GamePlayProps) {
  const [timeRemaining, setTimeRemaining] = useState(GAME_SETTINGS.gameDuration);
  const [showNGWord, setShowNGWord] = useState<string | null>(null);
  const [confirmingPlayer, setConfirmingPlayer] = useState<Player | null>(null);
  const [eliminatedPlayers, setEliminatedPlayers] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      onGameEnd(eliminatedPlayers);
    }
  }, [timeRemaining, onGameEnd, eliminatedPlayers]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNGWordCheck = (player: Player) => {
    setConfirmingPlayer(player);
  };

  const handleConfirmNGWord = () => {
    if (confirmingPlayer) {
      setShowNGWord(confirmingPlayer.ngWord || '');
      setTimeout(() => {
        setShowNGWord(null);
        setConfirmingPlayer(null);
      }, 3000);
    }
  };

  const handleCancelNGWordCheck = () => {
    setConfirmingPlayer(null);
    setShowNGWord(null);
  };

  const handleNGWordViolation = (playerId: string) => {
    const newEliminatedPlayers = new Set([...eliminatedPlayers, playerId]);
    setEliminatedPlayers(newEliminatedPlayers);
    
    const remainingPlayers = players.filter(p => !newEliminatedPlayers.has(p.id));
    if (remainingPlayers.length === 1) {
      onGameEnd(newEliminatedPlayers);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Timer className="w-6 h-6 text-indigo-600" />
            <span className="text-2xl font-bold">{formatTime(timeRemaining)}</span>
          </div>
          <div className="text-xl font-bold text-gray-800">
            お題: {topic}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {players.map((player) => (
            <div
              key={player.id}
              className={`${player.color} text-white p-4 rounded-lg ${
                eliminatedPlayers.has(player.id) ? 'opacity-50' : ''
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-bold">{player.name}</span>
                <span>{eliminatedPlayers.has(player.id) ? '脱落' : '生存'}</span>
              </div>
              <div className="mt-2">
                {!eliminatedPlayers.has(player.id) && (
                  <button
                    className="w-full px-3 py-1 bg-white/20 rounded hover:bg-white/30 flex items-center justify-center gap-2"
                    onClick={() => handleNGWordCheck(player)}
                  >
                    <EyeOff className="w-4 h-4" />
                    NGワードを確認
                  </button>
                )}
                {showNGWord && confirmingPlayer?.id === player.id && (
                  <div className="mt-2 text-center font-bold bg-white/20 p-2 rounded animate-pulse">
                    {showNGWord}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4">
          {players
            .filter(player => !eliminatedPlayers.has(player.id))
            .map((player) => (
              <button
                key={player.id}
                onClick={() => handleNGWordViolation(player.id)}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                <AlertTriangle className="w-4 h-4" />
                {player.name}がNGワードを言った！
              </button>
            ))}
        </div>
      </div>

      {confirmingPlayer && (
        <NGWordConfirmation
          player={confirmingPlayer}
          onConfirm={handleConfirmNGWord}
          onCancel={handleCancelNGWordCheck}
        />
      )}
    </div>
  );
}