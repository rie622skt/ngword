import React from 'react';
import { MessageCircle, Users, AlertTriangle, Trophy } from 'lucide-react';
import { useGameStore } from './store/gameStore';
import LobbyScreen from './components/LobbyScreen';
import NGWordSettings from './components/NGWordSettings';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';

function App() {
  const { gameStatus, initialize } = useGameStore();

  React.useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-pink-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 font-japanese">
            NGワードゲーム
          </h1>
          <div className="flex justify-center gap-4 text-indigo-600">
            {gameStatus === 'waiting' && <Users className="w-6 h-6" />}
            {gameStatus === 'ready' && <AlertTriangle className="w-6 h-6" />}
            {gameStatus === 'playing' && <MessageCircle className="w-6 h-6" />}
            {gameStatus === 'ended' && <Trophy className="w-6 h-6" />}
          </div>
        </header>

        {gameStatus === 'waiting' && <LobbyScreen />}
        {gameStatus === 'ready' && <NGWordSettings />}
        {gameStatus === 'playing' && <GameScreen />}
        {gameStatus === 'ended' && <ResultScreen />}
      </div>
    </div>
  );
}

export default App;