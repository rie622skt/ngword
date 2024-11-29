import React from 'react';
import { Play, Users } from 'lucide-react';
import { Player } from '../types/game';

interface GameStartConfirmationProps {
  players: Player[];
  topic: string;
  onConfirm: () => void;
}

export function GameStartConfirmation({ players, topic, onConfirm }: GameStartConfirmationProps) {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <Play className="w-6 h-6 text-green-600" />
        <h2 className="text-2xl font-bold text-gray-800">ゲーム開始確認</h2>
      </div>

      <div className="mb-6">
        <p className="text-lg text-gray-700 mb-4">
          全員のNGワードが設定されました！
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-gray-600" />
            <span className="font-bold text-gray-800">参加プレイヤー</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {players.map((player) => (
              <div
                key={player.id}
                className={`${player.color} text-white px-3 py-2 rounded-lg text-center`}
              >
                {player.name}
              </div>
            ))}
          </div>
        </div>
        <p className="text-gray-600 text-center">
          お題：<span className="font-bold text-gray-800">{topic}</span>
        </p>
      </div>

      <button
        onClick={onConfirm}
        className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 text-lg font-bold flex items-center justify-center gap-2"
      >
        <Play className="w-5 h-5" />
        ゲームを開始する
      </button>
    </div>
  );
}