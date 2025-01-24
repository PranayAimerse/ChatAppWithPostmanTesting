const express = require('express');
var cors=require("cors")
const http = require('http');
const { Server } = require('socket.io');
const { dbconnect } = require('./config/database');
const User = require('./Models/User');
const { router } = require('./routes/routes');
const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:"*"
    }
});

app.use(express.static('public'));


io.on('connection', (socket) => {
    console.log('A user connected');

    User.find().sort({ timestamp: 1 }).then((messages) => {
        socket.emit('previous messages', messages);
    });

    socket.on('chat message', async ({ name, message, createat }) => {
        console.log(`${name}: ${message}`);

        const newUserMessage = new User({ name, message, createat });
        await newUserMessage.save();

     
        io.emit('chat message', { name, message, createat: newUserMessage.createat });
    });

    // Handle disconnections
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});
app.use(express.json())
// app.use("/api/v1",router)
dbconnect();
const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
