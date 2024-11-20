import React, { useState } from 'react';
import { UserCircle } from 'lucide-react';

type PlayerRegistrationProps = {
  onSubmit: (player1Name: string, player2Name: string) => void;
};

const PlayerRegistration: React.FC<PlayerRegistrationProps> = ({ onSubmit }) => {
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (player1Name.trim() && player2Name.trim()) {
      onSubmit(player1Name, player2Name);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 transition-all">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        プレイヤー登録
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {[1, 2].map((num) => (
          <div key={num} className="space-y-2">
            <label className="flex items-center gap-2 text-gray-700">
              <UserCircle className="w-5 h-5 text-indigo-500" />
              <span>プレイヤー{num}</span>
            </label>
            <input
              type="text"
              value={num === 1 ? player1Name : player2Name}
              onChange={(e) => 
                num === 1 
                  ? setPlayer1Name(e.target.value)
                  : setPlayer2Name(e.target.value)
              }
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="名前を入力してください"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
        >
          次へ進む
        </button>
      </form>
    </div>
  );
};

export default PlayerRegistration;