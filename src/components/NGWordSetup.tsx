import React, { useState, useEffect } from 'react';
import { Player, GameMode } from '../types/game';
import { Lock, EyeOff, ArrowRight, Shuffle } from 'lucide-react';
import { PrivacyWarning } from './PrivacyWarning';
import { generateNGWord } from '../utils/ngWordGenerator';

interface NGWordSetupProps {
  players: Player[];
  currentPlayerIndex: number;
  targetPlayerIndex: number;
  onNGWordSet: (ngWord: string) => void;
  topic: string;
  gameMode: GameMode;
}

export function NGWordSetup({ 
  players, 
  currentPlayerIndex, 
  targetPlayerIndex, 
  onNGWordSet,
  topic,
  gameMode
}: NGWordSetupProps) {
  const [ngWord, setNGWord] = useState('');
  const [showPrivacyWarning, setShowPrivacyWarning] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const currentPlayer = players[currentPlayerIndex];
  const targetPlayer = players[targetPlayerIndex];

  useEffect(() => {
    setShowPrivacyWarning(true);
    setShowConfirmation(false);
    setNGWord('');
    
    // ランダム生成モードの場合はNGワードを生成
    if (gameMode === 'random') {
      const randomWord = generateNGWord(topic);
      setNGWord(randomWord);
    }
  }, [currentPlayerIndex, targetPlayerIndex, gameMode, topic]);

  const handleNGWordSubmit = () => {
    onNGWordSet(ngWord);
    setNGWord('');
    setShowPrivacyWarning(true);
    setShowConfirmation(false);
  };

  const handleRandomWord = () => {
    setNGWord(generateNGWord(topic));
  };

  if (showPrivacyWarning) {
    return (
      <>
        <PrivacyWarning targetPlayer={targetPlayer} />
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2">
          <button
            onClick={() => {
              setShowPrivacyWarning(false);
              if (gameMode === 'random') {
                setShowConfirmation(true);
              }
            }}
            className="px-6 py-3 bg-white text-red-500 rounded-full font-bold shadow-lg hover:bg-gray-100 flex items-center gap-2"
          >
            <span>{currentPlayer.name}さんですか？</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </>
    );
  }

  // ランダムモードでの確認画面
  if (gameMode === 'random' && showConfirmation) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center gap-2 mb-6">
          <Lock className="w-6 h-6 text-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-800">NGワード確認</h2>
        </div>

        <div className="mb-6">
          <div className="text-center mb-4">
            <span className={`inline-block font-bold ${targetPlayer.color} text-white px-4 py-2 rounded-full text-lg`}>
              {targetPlayer.name}
            </span>
            <span className="mx-2">さんの</span>
          </div>
          <p className="text-xl font-bold text-center text-gray-800 mb-2">
            NGワード
          </p>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-2xl font-bold text-center text-gray-800">
              {ngWord}
            </p>
          </div>
          <p className="text-center text-gray-600 mt-4">
            お題：{topic}
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleNGWordSubmit}
            className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-lg font-bold"
          >
            確定する
          </button>
          <button
            onClick={handleRandomWord}
            className="w-full px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-lg font-bold"
          >
            別のワードを生成
          </button>
        </div>

        <div className="mt-8 p-4 bg-red-50 rounded-lg border-2 border-red-200">
          <div className="flex items-center gap-2 text-red-600 justify-center">
            <EyeOff className="w-5 h-5" />
            <p className="font-bold">
              {targetPlayer.name}さんには見せないでください！
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <Lock className="w-6 h-6 text-indigo-600" />
        <h2 className="text-2xl font-bold text-gray-800">NGワード設定</h2>
      </div>

      <div className="mb-6">
        <div className="text-center mb-4">
          <span className={`inline-block font-bold ${currentPlayer.color} text-white px-4 py-2 rounded-full text-lg`}>
            {currentPlayer.name}
          </span>
          <span className="mx-2">さんが</span>
          <span className={`inline-block font-bold ${targetPlayer.color} text-white px-4 py-2 rounded-full text-lg`}>
            {targetPlayer.name}
          </span>
          <span className="mx-2">さんの</span>
        </div>
        <p className="text-xl font-bold text-center text-gray-800">
          NGワードを設定してください
        </p>
        <p className="text-center text-gray-600 mt-2">
          お題：{topic}
        </p>
      </div>

      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={ngWord}
            onChange={(e) => setNGWord(e.target.value)}
            placeholder="NGワードを入力"
            className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
            maxLength={20}
            autoFocus
          />
          {(gameMode === 'mixed') && (
            <button
              onClick={handleRandomWord}
              className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              title="ランダム生成"
            >
              <Shuffle className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <button
        onClick={handleNGWordSubmit}
        disabled={!ngWord.trim()}
        className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 text-lg font-bold"
      >
        設定する
      </button>

      <div className="mt-8 p-4 bg-red-50 rounded-lg border-2 border-red-200">
        <div className="flex items-center gap-2 text-red-600 justify-center">
          <EyeOff className="w-5 h-5" />
          <p className="font-bold">
            {targetPlayer.name}さんには見せないでください！
          </p>
        </div>
      </div>
    </div>
  );
}