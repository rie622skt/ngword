import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { socketService } from '../services/socketService';

export function HomePage() {
  const [playerName, setPlayerName] = useState('');
  const [passphrase, setPassphrase] = useState('');
  const [error, setError] = useState('');
  const setPlayer = useGameStore((state) => state.setPlayer);
  const setRoom = useGameStore((state) => state.setRoom);

  const handleCreateRoom = async () => {
    if (!validateInput()) return;

    const player = {
      id: Math.random().toString(36).substring(7),
      name: playerName,
      ngWords: []
    };

    try {
      const room = await socketService.createRoom(passphrase, player);
      setPlayer(player);
      setRoom(room);
    } catch (err) {
      setError(err instanceof Error ? err.message : '部屋の作成に失敗しました');
    }
  };

  const handleJoinRoom = async () => {
    if (!validateInput()) return;

    const player = {
      id: Math.random().toString(36).substring(7),
      name: playerName,
      ngWords: []
    };

    try {
      const room = await socketService.joinRoom(passphrase, player);
      setPlayer(player);
      setRoom(room);
    } catch (err) {
      setError(err instanceof Error ? err.message : '部屋への参加に失敗しました');
    }
  };

  const validateInput = () => {
    setError('');
    if (!playerName) {
      setError('プレイヤー名を入力してください');
      return false;
    }
    if (!passphrase) {
      setError('合言葉を入力してください');
      return false;
    }
    if (passphrase.length < 4 || passphrase.length > 10) {
      setError('合言葉は4～10文字で入力してください');
      return false;
    }
    return true;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">NGワードゲーム</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        
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
            onClick={handleJoinRoom}
            className="btn btn-secondary w-full"
          >
            ルームに参加
          </button>
        </div>
      </div>
    </div>
  );
}