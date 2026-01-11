const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Carpeta pública donde está tu HTML
app.use(express.static('public'));

// Socket.IO
io.on('connection', (socket) => {
    console.log('Usuario conectado');

    // Cuando un usuario envía mensaje
    socket.on('sendMessage', (data) => {
        // Reenvía a todos menos al que envió
        socket.broadcast.emit('receiveMessage', data);
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});

// Puerto
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
