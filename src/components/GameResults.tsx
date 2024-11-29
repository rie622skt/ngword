import React from 'react';
import { Player } from '../types/game';
import { Trophy, Medal } from 'lucide-react';

interface GameResultsProps {
  players: Player[];
  eliminatedPlayers: Set<string>;
  onPlayAgain: () => void;
}

export function GameResults({ players, eliminatedPlayers, onPlayAgain }: GameResultsProps) {
  // Sort players by elimination order (survivors first, then eliminated)
  const sortedPlayers = [...players].sort((a, b) => {
    const aEliminated = eliminatedPlayers.has(a.id);
    const bEliminated = eliminatedPlayers.has(b.id);
    
    if (!aEliminated && bEliminated) return -1;
    if (aEliminated && !bEliminated) return 1;
    return 0;
  });

  const winner = sortedPlayers[0];

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">ゲーム結果</h2>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-6 h-6 text-yellow-500" />
          <h3 className="text-xl font-bold">優勝</h3>
        </div>
        <div className={`${winner.color} text-white p-4 rounded-lg text-center`}>
          <p className="text-2xl font-bold">{winner.name}</p>
          <p className="text-lg">最後まで生き残った！</p>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Medal className="w-6 h-6 text-gray-500" />
          <h3 className="text-xl font-bold">順位</h3>
        </div>
        <div className="space-y-2">
          {sortedPlayers.map((player, index) => (
            <div
              key={player.id}
              className={`${player.color} text-white p-3 rounded-lg flex justify-between items-center ${
                eliminatedPlayers.has(player.id) ? 'opacity-50' : ''
              }`}
            >
              <span>{index + 1}位: {player.name}</span>
              <span>
                {eliminatedPlayers.has(player.id) ? '脱落' : '生存'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onPlayAgain}
        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        もう一度遊ぶ
      </button>
    </div>
  );
}