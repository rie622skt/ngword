import { useState } from 'react';
import { useGameStore } from '../store/gameStore';

export function HomePage() {
  const [playerName, setPlayerName] = useState('');
  const [passphrase, setPassphrase] = useState('');
  const setPlayer = useGameStore((state) => state.setPlayer);
  const setRoom = useGameStore((state) => state.setRoom);

  const handleCreateRoom = () => {
    if (!validateInput()) return;

    const player = {
      id: Math.random().toString(36).substring(7),
      name: playerName,
      ngWords: []
    };

    const room = {
      id: Math.random().toString(36).substring(7),
      passphrase,
      players: [player],
      status: 'waiting' as const,
      timeLimit: 300
    };

    setPlayer(player);
    setRoom(room);
  };

  const validateInput = () => {
    if (!playerName || !passphrase) return false;
    if (passphrase.length < 4 || passphrase.length > 10) return false;
    return true;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">NGワードゲーム</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              プレイヤー名
            </label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="input w-full mt-1"
              placeholder="名前を入力"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              合言葉
            </label>
            <input
              type="text"
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
              className="input w-full mt-1"
              placeholder="4-10文字の英数字"
            />
          </div>

          <button
            onClick={handleCreateRoom}
            className="btn btn-primary w-full"
          >
            ルームを作成
          </button>
          
          <button
            onClick={handleCreateRoom}
            className="btn btn-secondary w-full"
          >
            ルームに参加
          </button>
        </div>
      </div>
    </div>
  );
}