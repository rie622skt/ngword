import React from 'react';
import { Player } from '../types/game';
import { Trophy, Medal, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedPage, buttonVariants } from './AnimatedPage';

interface GameResultsProps {
  players: Player[];
  eliminatedPlayers: Set<string>;
  onPlayAgain: () => void;
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

const itemVariants = {
  initial: { x: -20, opacity: 0 },
  animate: { x: 0, opacity: 1 }
};

const winnerVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
};

export function GameResults({ players, eliminatedPlayers, onPlayAgain }: GameResultsProps) {
  const sortedPlayers = [...players].sort((a, b) => {
    const aEliminated = eliminatedPlayers.has(a.id);
    const bEliminated = eliminatedPlayers.has(b.id);
    
    if (!aEliminated && bEliminated) return -1;
    if (aEliminated && !bEliminated) return 1;
    return 0;
  });

  const winner = sortedPlayers[0];

  return (
    <AnimatedPage>
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <motion.h2 
          className="text-2xl font-bold text-gray-800 mb-6 text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          ゲーム結果
        </motion.h2>

        <motion.div 
          className="mb-8"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <motion.div 
            className="flex items-center gap-2 mb-4"
            variants={itemVariants}
          >
            <Trophy className="w-6 h-6 text-yellow-500" />
            <h3 className="text-xl font-bold">優勝</h3>
          </motion.div>
          
          <motion.div
            className={`${winner.color} text-white p-4 rounded-lg text-center`}
            variants={winnerVariants}
          >
            <motion.p 
              className="text-2xl font-bold"
              animate={{
                scale: [1, 1.1, 1],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              {winner.name}
            </motion.p>
            <p className="text-lg">最後まで生き残った！</p>
          </motion.div>
        </motion.div>

        <motion.div 
          className="mb-8"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <motion.div 
            className="flex items-center gap-2 mb-4"
            variants={itemVariants}
          >
            <Medal className="w-6 h-6 text-gray-500" />
            <h3 className="text-xl font-bold">順位</h3>
          </motion.div>
          
          <div className="space-y-2">
            {sortedPlayers.map((player, index) => (
              <motion.div
                key={player.id}
                className={`${player.color} text-white p-3 rounded-lg flex justify-between items-center ${
                  eliminatedPlayers.has(player.id) ? 'opacity-50' : ''
                }`}
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
              >
                <span>{index + 1}位: {player.name}</span>
                <span>
                  {eliminatedPlayers.has(player.id) ? '脱落' : '生存'}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.button
          onClick={onPlayAgain}
          className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-lg font-bold flex items-center justify-center gap-2"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <RotateCcw className="w-5 h-5" />
          もう一度遊ぶ
        </motion.button>
      </div>
    </AnimatedPage>
  );
}