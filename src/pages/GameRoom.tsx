import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { Message } from '../types';

export function GameRoom() {
  const [messageText, setMessageText] = useState('');
  const [newNGWord, setNewNGWord] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  
  const { currentRoom, currentPlayer, addNGWord, removeNGWord } = useGameStore();

  const handleAddNGWord = () => {
    if (!newNGWord.trim() || !currentPlayer) return;
    if (currentPlayer.ngWords.length >= 3) return;
    
    addNGWord(newNGWord.trim());
    setNewNGWord('');
  };

  const handleSendMessage = () => {
    if (!messageText.trim() || !currentPlayer) return;

    const newMessage: Message = {
      player: currentPlayer.name,
      content: messageText.trim(),
      timestamp: Date.now()
    };

    setMessages([...messages, newMessage]);
    setMessageText('');
  };

  if (!currentRoom || !currentPlayer) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold">ルーム: {currentRoom.id}</h2>
          <p>プレイヤー: {currentRoom.players.length}/2</p>
          <p className="font-bold">
            {currentRoom.status === 'waiting' ? '対戦相手を待っています...' : 
             currentRoom.status === 'playing' ? 'ゲーム中' : 'ゲーム終了'}
          </p>
        </div>

        {currentRoom.status === 'waiting' && (
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-2">NGワードを設定 (1-3個)</h3>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newNGWord}
                onChange={(e) => setNewNGWord(e.target.value)}
                className="input flex-1"
                placeholder="NGワードを入力"
              />
              <button onClick={handleAddNGWord} className="btn btn-primary">
                追加
              </button>
            </div>
            <ul className="space-y-2">
              {currentPlayer.ngWords.map((word, index) => (
                <li key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                  <span>{word}</span>
                  <button
                    onClick={() => removeNGWord(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    削除
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {currentRoom.status === 'playing' && (
          <div className="mb-6">
            <div className="h-96 overflow-y-auto bg-gray-50 p-4 rounded mb-4">
              {messages.map((msg, index) => (
                <div key={index} className="mb-2">
                  <span className="font-bold">{msg.player}:</span> {msg.content}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="input flex-1"
                placeholder="メッセージを入力"
              />
              <button onClick={handleSendMessage} className="btn btn-primary">
                送信
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}