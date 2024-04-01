const WebSocketServer = require('ws').Server;

const PORT = 8081;

const wsServer = new WebSocketServer({ 'port': PORT });

wsServer.on('connection', (client) => {
    console.log('Um cliente se conectou ao servidor');
});