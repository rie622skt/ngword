import React from 'react';
import { HomePage } from './pages/HomePage';
import { GameRoom } from './pages/GameRoom';
import { useGameStore } from './store/gameStore';

function App() {
  const currentRoom = useGameStore((state) => state.currentRoom);

  return (
    <div className="min-h-screen bg-gray-100">
      {currentRoom ? <GameRoom /> : <HomePage />}
    </div>
  );
}

export default App;