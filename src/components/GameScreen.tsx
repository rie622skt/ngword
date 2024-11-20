import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

const TOPICS = [
  '好きな食べ物について',
  '休日の過ごし方',
  '理想の旅行プラン',
  '最近見た映画やドラマ',
  '子供の頃の思い出',
  '将来の夢について',
];

const GameScreen: React.FC = () => {
  const { playerId, players, messages, ngWords, sendMessage, endGame } = useGameStore();
  const [topic] = useState(TOPICS[Math.floor(Math.random() * TOPICS.length)]);
  const [input, setInput] = useState('');
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const message = input.trim();
    const myNgWord = ngWords[playerId || '']?.toLowerCase();

    if (message.toLowerCase().includes(myNgWord)) {
      endGame(playerId || '');
      return;
    }

    sendMessage(message);
    setInput('');
  };

  if (timer <= 0) {
    return (
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-4">時間切れ!</h3>
        <button
          onClick={() => endGame('')}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg"
        >
          結果を見る
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            お題: {topic}
          </h2>
          <span className="text-xl font-mono bg-gray-100 px-3 py-1 rounded-lg">
            {timer}秒
          </span>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-6 h-64 overflow-y-auto">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-2 ${
              msg.playerId === playerId ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block px-4 py-2 rounded-lg ${
                msg.playerId === playerId
                  ? 'bg-indigo-100 text-indigo-900'
                  : 'bg-pink-100 text-pink-900'
              }`}
            >
              {msg.message}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="メッセージを入力..."
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          送信
        </button>
      </form>
    </div>
  );
};

export default GameScreen;