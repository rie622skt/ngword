import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

const NGWordSettings: React.FC = () => {
  const { players, playerId, setNgWord } = useGameStore();
  const [ngWord, setNgWordInput] = useState('');
  
  const otherPlayerId = players.find(id => id !== playerId) || '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ngWord.trim()) {
      setNgWord(ngWord.trim(), otherPlayerId);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center justify-center gap-2 mb-6">
        <AlertTriangle className="w-6 h-6 text-yellow-500" />
        <h2 className="text-2xl font-bold text-gray-800">
          NGワード設定
        </h2>
      </div>
      
      <div className="mb-6 text-center">
        <p className="text-sm text-gray-600">
          相手プレイヤーの禁止ワードを設定してください
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="text"
            value={ngWord}
            onChange={(e) => setNgWordInput(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            placeholder="NGワードを入力"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition-colors font-medium"
        >
          設定完了
        </button>
      </form>
    </div>
  );
};

export default NGWordSettings;