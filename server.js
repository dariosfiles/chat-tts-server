const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Servir la carpeta pública (index.html y assets)
app.use(express.static('public'));

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
