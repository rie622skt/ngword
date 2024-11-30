import React from 'react';
import { Play, Users } from 'lucide-react';
import { Player } from '../types/game';
import { motion } from 'framer-motion';
import { AnimatedPage, buttonVariants } from './AnimatedPage';

interface GameStartConfirmationProps {
  players: Player[];
  topic: string;
  onConfirm: () => void;
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

const playerVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 }
};

export function GameStartConfirmation({ players, topic, onConfirm }: GameStartConfirmationProps) {
  return (
    <AnimatedPage>
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <motion.div 
          className="flex items-center gap-2 mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <Play className="w-6 h-6 text-green-600" />
          <h2 className="text-2xl font-bold text-gray-800">ゲーム開始確認</h2>
        </motion.div>

        <motion.div 
          className="mb-6"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <motion.p 
            className="text-lg text-gray-700 mb-4"
            variants={playerVariants}
          >
            全員のNGワードが設定されました！
          </motion.p>
          
          <motion.div 
            className="bg-gray-50 p-4 rounded-lg mb-4"
            variants={playerVariants}
          >
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-gray-600" />
              <span className="font-bold text-gray-800">参加プレイヤー</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {players.map((player, index) => (
                <motion.div
                  key={player.id}
                  className={`${player.color} text-white px-3 py-2 rounded-lg text-center`}
                  variants={playerVariants}
                  transition={{ delay: index * 0.1 }}
                >
                  {player.name}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.p 
            className="text-gray-600 text-center"
            variants={playerVariants}
          >
            お題：
            <motion.span 
              className="font-bold text-gray-800"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {topic}
            </motion.span>
          </motion.p>
        </motion.div>

        <motion.button
          onClick={onConfirm}
          className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 text-lg font-bold flex items-center justify-center gap-2"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          initial="initial"
          animate="animate"
        >
          <Play className="w-5 h-5" />
          ゲームを開始する
        </motion.button>
      </div>
    </AnimatedPage>
  );
}