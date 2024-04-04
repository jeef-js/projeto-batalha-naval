const WebSocketServer = require('ws').Server;
const uuid = require('uuid');

const PORT = 8081;

const wsServer = new WebSocketServer({ port: PORT });

const clients = {};
const games = {};

wsServer.on('connection', (connection) => {
  const clientId = uuid.v4();

  clients[clientId] = { connection: connection };

  console.log('Um cliente se conectou ao servidor e recebeu o id: ' + clientId);

  connection.on('message', (message) => {
    const messageBody = JSON.parse(message.toString());

    if (messageBody.method == 'create') {
      const gameCode = generateCode();

      const game = {
        players: [
          {
            clientId: messageBody.clientId,
            board: messageBody.board,
            status: 'ready',
          },
          null,
        ],
        turnPlayer: null,
        guests: [],
      };

      games[gameCode] = game;

      const payload = {
        method: 'create-sucess',
        gameCode,
      };

      connection.send(JSON.stringify(payload));

      return;
    }

    if (messageBody.method == 'join') {
      if (!games.hasOwnProperty(messageBody.gameCode)) {
        const payload = {
          method: 'join-error',
          message: 'Game not found.',
        };

        connection.send(JSON.stringify(payload));

        return;
      }

      if (
        games[messageBody.gameCode].players[0].clientId == messageBody.clientId
      ) {
        const payload = {
          method: 'join-error',
          message: 'Already connected on this game.',
        };

        connection.send(JSON.stringify(payload));

        return;
      }

      if (games[messageBody.gameCode].players[1] != null) {
        const payload = {
          method: 'join-error',
          message: 'This game is full.',
        };

        connection.send(JSON.stringify(payload));

        return;
      }

      const player2 = {
        clientId: messageBody.clientId,
        board: messageBody.board,
        status: 'not_ready',
      };

      games[messageBody.gameCode].players[1] = player2;

      const payloadPlayer2 = {
        method: 'join-sucess',
        gameCode: messageBody.gameCode,
      };

      connection.send(JSON.stringify(payloadPlayer2));

      const player1Id = games[messageBody.gameCode].players[0].clientId;

      const payloadPlayer1 = {
        method: 'opponent-joined',
      };

      clients[player1Id].connection.send(JSON.stringify(payloadPlayer1));

      return;
    }

    if (messageBody.method == 'mark-as-ready') {
      if (
        games[messageBody.gameCode].players[1].clientId == messageBody.clientId
      ) {
        games[messageBody.gameCode].players[1].status = 'ready';
        games[messageBody.gameCode].players[1].board = messageBody.board;

        const payload = {
          method: 'opponent-ready',
        };

        const player1Id = games[messageBody.gameCode].players[0].clientId;

        clients[player1Id].connection.send(JSON.stringify(payload));

        return;
      }
    }

    if (messageBody.method == 'start-game') {
    }

    if (messageBody.method == 'turn-action') {
      const payload = {
        sender: messageBody.clientId,
        message: messageBody.message,
      };

      broadcast(games[messageBody.gameCode].members, payload);
    }
  });

  const payload = {
    method: 'connected',
    clientId,
  };

  connection.send(JSON.stringify(payload));
});

function generateCode() {
  const digits = '0123456789';
  let code = '';

  for (let i = 0; i < 6; i++) {
    code += digits[Math.floor(Math.random() * digits.length)];
  }

  return games.hasOwnProperty(code) ? generateCode() : code;
}

function broadcast(members, payload) {
  for (const member of members) {
    clients[member].connection.send(JSON.stringify(payload));
  }
}
