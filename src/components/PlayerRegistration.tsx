import React, { useState } from 'react';
import { Player, GameMode } from '../types/game';
import { GAME_SETTINGS, PLAYER_COLORS } from '../constants/gameSettings';
import { Users, Shuffle, HandIcon, Combine } from 'lucide-react';
import { AnimatedPage } from './AnimatedPage';
import { motion } from 'framer-motion';

interface PlayerRegistrationProps {
  onPlayersConfirmed: (players: Player[]) => void;
  gameMode: GameMode;
}

const GAME_MODE_INFO = {
  manual: {
    icon: HandIcon,
    label: '手動設定',
    color: 'bg-blue-100 text-blue-600',
  },
  random: {
    icon: Shuffle,
    label: 'ランダム生成',
    color: 'bg-purple-100 text-purple-600',
  },
  mixed: {
    icon: Combine,
    label: 'ミックス',
    color: 'bg-green-100 text-green-600',
  },
} as const;

const playerVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 }
};

export function PlayerRegistration({ onPlayersConfirmed, gameMode }: PlayerRegistrationProps) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentName, setCurrentName] = useState('');

  const addPlayer = () => {
    if (currentName.trim() && players.length < GAME_SETTINGS.maxPlayers) {
      const newPlayer: Player = {
        id: crypto.randomUUID(),
        name: currentName.trim(),
        color: PLAYER_COLORS[players.length],
        score: 0
      };
      setPlayers([...players, newPlayer]);
      setCurrentName('');
    }
  };

  const ModeIcon = GAME_MODE_INFO[gameMode].icon;

  return (
    <AnimatedPage>
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <motion.div 
          className="flex items-center gap-2 mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <Users className="w-6 h-6 text-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-800">プレイヤー登録</h2>
        </motion.div>

        <motion.div 
          className={`flex items-center gap-2 p-3 rounded-lg mb-6 ${GAME_MODE_INFO[gameMode].color}`}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <ModeIcon className="w-5 h-5" />
          <span className="font-medium">{GAME_MODE_INFO[gameMode].label}モード</span>
        </motion.div>

        <div className="mb-6">
          <motion.div 
            className="flex gap-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <input
              type="text"
              value={currentName}
              onChange={(e) => setCurrentName(e.target.value)}
              placeholder="プレイヤー名を入力"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              maxLength={10}
            />
            <motion.button
              onClick={addPlayer}
              disabled={players.length >= GAME_SETTINGS.maxPlayers}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              追加
            </motion.button>
          </motion.div>
          <p className="mt-2 text-sm text-gray-600">
            {players.length}/{GAME_SETTINGS.maxPlayers}人
          </p>
        </div>

        <div className="space-y-2 mb-6">
          {players.map((player, index) => (
            <motion.div
              key={player.id}
              className={`px-4 py-2 rounded-lg text-white ${player.color} flex justify-between items-center`}
              variants={playerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ delay: index * 0.1 }}
            >
              <span>{player.name}</span>
              <motion.button
                onClick={() => setPlayers(players.filter(p => p.id !== player.id))}
                className="hover:bg-white/20 rounded-full p-1"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
            </motion.div>
          ))}
        </div>

        <motion.button
          onClick={() => onPlayersConfirmed(players)}
          disabled={players.length < 2}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          ゲームを始める ({players.length}人)
        </motion.button>
      </div>
    </AnimatedPage>
  );
}