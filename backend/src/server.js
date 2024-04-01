const WebSocketServer = require('ws').Server;
const uuid = require('uuid');

const PORT = 8081;

const wsServer = new WebSocketServer({ 'port': PORT });

const clients = new Map();

wsServer.on('connection', (client) => {
    clients.set(uuid.v4(), { connection: client });

    console.log('Um cliente se conectou ao servidor e recebeu o id: ' +  clients[client].id);

    client.on('message', (message) => {
        const payload = {
            user: clients[client].id,
            message: message
        };

        wsServer.send(JSON.stringify(payload));
    });
});