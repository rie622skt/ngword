import React from 'react';
import { Trophy, RotateCcw } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

const ResultScreen: React.FC = () => {
  const { playerId, players, ngWords, error, reset } = useGameStore();

  const handleRestart = () => {
    reset();
  };

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-6">
          {error}
        </h2>
        <button
          onClick={handleRestart}
          className="flex items-center justify-center gap-2 w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          新しいゲームを始める
        </button>
      </div>
    );
  }

  const isWinner = ngWords[playerId || ''] ? true : false;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 text-center">
      <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
      
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        ゲーム終了!
      </h2>

      {isWinner ? (
        <p className="text-xl mb-6 text-indigo-600 font-bold">
          おめでとうございます！あなたの勝ちです！
        </p>
      ) : (
        <p className="text-xl mb-6 text-gray-600">
          残念！NGワード「{ngWords[playerId || '']}」を使ってしまいました。
        </p>
      )}

      <div className="space-y-4">
        <button
          onClick={handleRestart}
          className="flex items-center justify-center gap-2 w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          新しいゲームを始める
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;