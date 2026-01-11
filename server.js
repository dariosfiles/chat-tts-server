const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Carpeta pública donde está tu HTML
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// Ruta raíz para asegurarnos que Render no cierre la app
app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// Socket.IO: chat en tiempo real
io.on('connection', (socket) => {
  console.log('Usuario conectado');

  // Cuando alguien envía un mensaje
  socket.on('sendMessage', (data) => {
    // Reenviar a todos menos al que envió
    socket.broadcast.emit('receiveMessage', data);
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

// Puerto dinámico para Render
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
