import React from 'react';
import { EyeOff } from 'lucide-react';
import { Player } from '../types/game';
import { motion } from 'framer-motion';
import { overlayVariants } from './AnimatedPage';

interface PrivacyWarningProps {
  targetPlayer: Player;
}

const contentVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  },
  exit: { scale: 0.8, opacity: 0 }
};

export function PrivacyWarning({ targetPlayer }: PrivacyWarningProps) {
  return (
    <motion.div
      className="fixed inset-0 bg-red-500 flex flex-col items-center justify-center p-4"
      variants={overlayVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        variants={contentVariants}
        className="text-center"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [1, 0.8, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <EyeOff className="w-24 h-24 text-white mb-6 mx-auto" />
        </motion.div>
        
        <motion.h1
          className="text-4xl font-bold text-white text-center mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {targetPlayer.name}さん
        </motion.h1>
        
        <motion.p
          className="text-2xl font-bold text-white text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          画面を見ないでください！
        </motion.p>
        
        <motion.p
          className="text-xl text-white/90 text-center mt-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          あなたのNGワードを設定中です
        </motion.p>
      </motion.div>
    </motion.div>
  );
}