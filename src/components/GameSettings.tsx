import React from 'react';
import { Settings, Users, Shuffle, Combine } from 'lucide-react';
import { GameMode } from '../types/game';
import { AnimatedPage, buttonVariants } from './AnimatedPage';
import { motion } from 'framer-motion';

interface GameSettingsProps {
  onModeSelect: (mode: GameMode) => void;
}

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function GameSettings({ onModeSelect }: GameSettingsProps) {
  return (
    <AnimatedPage>
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <motion.div 
          className="flex items-center gap-2 mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <Settings className="w-6 h-6 text-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-800">ゲームモード選択</h2>
        </motion.div>

        <motion.div 
          className="space-y-4"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <motion.button
            onClick={() => onModeSelect('manual')}
            className="w-full p-4 bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 rounded-lg transition-colors"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-6 h-6 text-blue-600" />
              <span className="text-lg font-bold text-blue-600">手動設定モード</span>
            </div>
            <p className="text-gray-600 text-left">
              プレイヤー同士でNGワードを設定し合います。
              戦略的な単語選びが勝負の鍵となります。
            </p>
          </motion.button>

          <motion.button
            onClick={() => onModeSelect('random')}
            className="w-full p-4 bg-purple-50 hover:bg-purple-100 border-2 border-purple-200 rounded-lg transition-colors"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <div className="flex items-center gap-3 mb-2">
              <Shuffle className="w-6 h-6 text-purple-600" />
              <span className="text-lg font-bold text-purple-600">ランダム生成モード</span>
            </div>
            <p className="text-gray-600 text-left">
              システムがお題に沿ってNGワードを自動生成します。
              予測不可能な展開が楽しめます。
            </p>
          </motion.button>

          <motion.button
            onClick={() => onModeSelect('mixed')}
            className="w-full p-4 bg-green-50 hover:bg-green-100 border-2 border-green-200 rounded-lg transition-colors"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <div className="flex items-center gap-3 mb-2">
              <Combine className="w-6 h-6 text-green-600" />
              <span className="text-lg font-bold text-green-600">ミックスモード</span>
            </div>
            <p className="text-gray-600 text-left">
              手動設定とランダム生成を組み合わせて遊べます。
              NGワードを設定する際に選択できます。
            </p>
          </motion.button>
        </motion.div>
      </div>
    </AnimatedPage>
  );
}