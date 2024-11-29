import React, { useState } from 'react';
import { Player, GameMode } from '../types/game';
import { GAME_SETTINGS, PLAYER_COLORS } from '../constants/gameSettings';
import { Users, Shuffle, HandIcon, Combine } from 'lucide-react';

interface PlayerRegistrationProps {
  onPlayersConfirmed: (players: Player[]) => void;
  gameMode: GameMode;
}

const GAME_MODE_INFO = {
  manual: {
    icon: HandIcon,
    label: '手動設定',
    color: 'bg-blue-100 text-blue-600',
  },
  random: {
    icon: Shuffle,
    label: 'ランダム生成',
    color: 'bg-purple-100 text-purple-600',
  },
  mixed: {
    icon: Combine,
    label: 'ミックス',
    color: 'bg-green-100 text-green-600',
  },
} as const;

export function PlayerRegistration({ onPlayersConfirmed, gameMode }: PlayerRegistrationProps) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentName, setCurrentName] = useState('');

  const addPlayer = () => {
    if (currentName.trim() && players.length < GAME_SETTINGS.maxPlayers) {
      const newPlayer: Player = {
        id: crypto.randomUUID(),
        name: currentName.trim(),
        color: PLAYER_COLORS[players.length],
        score: 0
      };
      setPlayers([...players, newPlayer]);
      setCurrentName('');
    }
  };

  const ModeIcon = GAME_MODE_INFO[gameMode].icon;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <Users className="w-6 h-6 text-indigo-600" />
        <h2 className="text-2xl font-bold text-gray-800">プレイヤー登録</h2>
      </div>

      <div className={`flex items-center gap-2 p-3 rounded-lg mb-6 ${GAME_MODE_INFO[gameMode].color}`}>
        <ModeIcon className="w-5 h-5" />
        <span className="font-medium">{GAME_MODE_INFO[gameMode].label}モード</span>
      </div>

      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={currentName}
            onChange={(e) => setCurrentName(e.target.value)}
            placeholder="プレイヤー名を入力"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            maxLength={10}
          />
          <button
            onClick={addPlayer}
            disabled={players.length >= GAME_SETTINGS.maxPlayers}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
          >
            追加
          </button>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          {players.length}/{GAME_SETTINGS.maxPlayers}人
        </p>
      </div>

      <div className="space-y-2 mb-6">
        {players.map((player, index) => (
          <div
            key={player.id}
            className={`px-4 py-2 rounded-lg text-white ${player.color} flex justify-between items-center`}
          >
            <span>{player.name}</span>
            <button
              onClick={() => setPlayers(players.filter(p => p.id !== player.id))}
              className="hover:bg-white/20 rounded-full p-1"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => onPlayersConfirmed(players)}
        disabled={players.length < 2}
        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
      >
        ゲームを始める ({players.length}人)
      </button>
    </div>
  );
}