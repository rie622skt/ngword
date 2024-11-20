import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { Users, Bug } from 'lucide-react';

const LobbyScreen: React.FC = () => {
  const { createRoom, joinRoom, roomId, error, isDebugMode, toggleDebugMode } = useGameStore();
  const [joinRoomId, setJoinRoomId] = useState('');
  const [playerName, setPlayerName] = useState('');

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
      createRoom(playerName.trim());
    }
  };

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim() && joinRoomId.trim()) {
      joinRoom(joinRoomId.trim(), playerName.trim());
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          ゲームを始める
        </h2>
        <button
          onClick={toggleDebugMode}
          className={`p-2 rounded-lg transition-colors ${
            isDebugMode ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'
          }`}
          title="デバッグモード"
        >
          <Bug className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            あなたの名前
          </label>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="名前を入力してください"
            required
          />
        </div>

        <form onSubmit={handleCreateRoom}>
          <button
            type="submit"
            disabled={!playerName.trim()}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            新しいルームを作成
          </button>
        </form>

        {roomId && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">ルームID:</p>
            <p className="font-mono text-lg font-bold text-indigo-600">{roomId}</p>
          </div>
        )}

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">または</span>
          </div>
        </div>

        <form onSubmit={handleJoinRoom} className="space-y-4">
          <input
            type="text"
            value={joinRoomId}
            onChange={(e) => setJoinRoomId(e.target.value)}
            placeholder="ルームIDを入力"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            required
          />
          <button
            type="submit"
            disabled={!playerName.trim() || !joinRoomId.trim()}
            className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ルームに参加
          </button>
        </form>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 text-sm text-center">{error}</p>
          </div>
        )}

        {isDebugMode && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800 text-sm text-center">
              デバッグモード: 自動的に2人目のプレイヤーが参加します
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LobbyScreen;