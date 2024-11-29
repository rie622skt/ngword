import React from 'react';
import { EyeOff } from 'lucide-react';
import { Player } from '../types/game';

interface PrivacyWarningProps {
  targetPlayer: Player;
}

export function PrivacyWarning({ targetPlayer }: PrivacyWarningProps) {
  return (
    <div className="fixed inset-0 bg-red-500 flex flex-col items-center justify-center p-4 animate-pulse">
      <EyeOff className="w-24 h-24 text-white mb-6" />
      <h1 className="text-4xl font-bold text-white text-center mb-4">
        {targetPlayer.name}さん
      </h1>
      <p className="text-2xl font-bold text-white text-center">
        画面を見ないでください！
      </p>
      <p className="text-xl text-white/90 text-center mt-4">
        あなたのNGワードを設定中です
      </p>
    </div>
  );
}