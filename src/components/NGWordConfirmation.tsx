import React, { useState } from 'react';
import { EyeOff, X } from 'lucide-react';
import { Player } from '../types/game';

interface NGWordConfirmationProps {
  player: Player;
  onConfirm: () => void;
  onCancel: () => void;
}

export function NGWordConfirmation({ player, onConfirm, onCancel }: NGWordConfirmationProps) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [showNGWord, setShowNGWord] = useState(false);

  const handleConfirmClick = () => {
    setIsConfirming(true);
    setShowNGWord(true);
    onConfirm();
  };

  return (
    <div className="fixed inset-0 bg-red-500 flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <button
          onClick={onCancel}
          className="p-2 text-white hover:bg-white/20 rounded-full"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      <EyeOff className="w-24 h-24 text-white mb-6" />
      <h1 className="text-4xl font-bold text-white text-center mb-4">
        NGワードの確認
      </h1>
      <p className="text-2xl font-bold text-white text-center mb-8">
        本人は確認できません
      </p>
      {!showNGWord ? (
        <button
          onClick={handleConfirmClick}
          disabled={isConfirming}
          className="px-6 py-3 bg-white text-red-500 rounded-full font-bold shadow-lg hover:bg-gray-100 active:bg-gray-200 transform active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
        >
          確認する
        </button>
      ) : (
        <div className="bg-white text-red-500 px-8 py-4 rounded-lg shadow-lg">
          <p className="text-2xl font-bold">{player.ngWord}</p>
        </div>
      )}
    </div>
  );
}