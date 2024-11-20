import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ['websocket', 'polling']
});

app.use(express.static(join(__dirname, '../dist')));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../dist/index.html'));
});

const rooms = new Map();

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('createRoom', ({ playerName }) => {
    const roomId = Math.random().toString(36).substring(7);
    rooms.set(roomId, { 
      players: [{ id: socket.id, name: playerName }],
      ngWords: {} 
    });
    socket.join(roomId);
    socket.emit('roomCreated', roomId);
  });

  socket.on('joinRoom', ({ roomId, playerName }) => {
    const room = rooms.get(roomId);
    if (room && room.players.length < 2) {
      room.players.push({ id: socket.id, name: playerName });
      socket.join(roomId);
      io.to(roomId).emit('gameReady', room.players);
    } else {
      socket.emit('roomError', 'ルームが見つからないか、満員です');
    }
  });

  socket.on('setNgWord', ({ roomId, ngWord, forPlayer }) => {
    const room = rooms.get(roomId);
    if (room) {
      room.ngWords[forPlayer] = ngWord;
      if (Object.keys(room.ngWords).length === 2) {
        io.to(roomId).emit('gameStart', room.ngWords);
      }
    }
  });

  socket.on('sendMessage', ({ roomId, message, playerName }) => {
    io.to(roomId).emit('newMessage', { 
      playerId: socket.id, 
      message,
      playerName
    });
  });

  socket.on('gameEnd', ({ roomId, loser }) => {
    io.to(roomId).emit('gameOver', { loser });
    rooms.delete(roomId);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    for (const [roomId, room] of rooms.entries()) {
      if (room.players.some(player => player.id === socket.id)) {
        io.to(roomId).emit('playerLeft');
        rooms.delete(roomId);
      }
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});