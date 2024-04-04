import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { WelcomeScreen } from './WelcomeScreen';
import { Game } from './Game/Game.js';
import { Header } from './Header';

import './css/style.css';

const ws = new WebSocket('ws://localhost:8081');
let clientId;

export const App = () => {
  ws.onmessage = function (event) {
    const messageBody = JSON.parse(event.data);
    console.log(messageBody);

    if (messageBody.method === 'connected') {
      clientId = messageBody.clientId;
    }

    if (messageBody.method === 'create-sucess') {
      setGameCode(messageBody.gameCode);
      setAppState('play');
    }

    if (messageBody.method === 'join-sucess') {
      setGameCode(messageBody.gameCode);
      setOpponentTitle('Oponente (Host)');
      setIsHost(false);
      setAppState('play');
    }

    if (messageBody.method === 'opponent-joined') {
      setOpponentTitle('Oponente (Aguardando Confirmação)');
    }

    if (messageBody.method === 'opponent-ready') {
      setOpponentTitle('Oponente (Pronto)');
      setIsOpponentReady(true);
    }
  };

  const [gameCode, setGameCode] = useState();
  const [opponentTitle, setOpponentTitle] = useState('Aguardando Oponente');
  const [isHost, setIsHost] = useState(true);
  const [isOpponentReady, setIsOpponentReady] = useState(false);

  const [appState, setAppState] = useState('welcome');

  const createGame = () => {
    const payload = {
      method: 'create',
      clientId,
      board: null,
    };

    ws.send(JSON.stringify(payload));
  };

  const joinGame = (gameCode) => {
    const payload = {
      method: 'join',
      clientId,
      gameCode,
      board: null,
    };

    ws.send(JSON.stringify(payload));
  };

  const markAsReady = (board) => {
    console.log(board);
    const payload = {
      method: 'mark-as-ready',
      clientId,
      gameCode,
      board,
    };

    console.log(payload);

    ws.send(JSON.stringify(payload));
  };

  return (
    <React.Fragment>
      <Header appState={appState} gameCode={gameCode} />
      {appState === 'play' ? (
        <Game
          gameCode={gameCode}
          opponentTitle={opponentTitle}
          isHost={isHost}
          markAsReady={markAsReady}
          isOpponentReady={isOpponentReady}
        />
      ) : (
        <WelcomeScreen createGame={createGame} joinGame={joinGame} />
      )}
    </React.Fragment>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
