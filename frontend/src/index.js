import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { WelcomeScreen } from './WelcomeScreen';
import { Game } from './Game/Game.js';
import { Header } from './Header';

import './css/style.css';

export const App = () => {
  let clientId;

  const [gameCode, setGameCode] = useState();
  const [opponentTitle, setOpponentTitle] = useState('Aguardando Oponente');

  const ws = new WebSocket('ws://localhost:8081');

  ws.onmessage = function (event) {
    const messageBody = JSON.parse(event.data);
    console.log(messageBody)

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
      setAppState('play');
    }

    if (messageBody.method === 'opponent-joined') {
      setOpponentTitle('Oponente | Aguardando Confirmação')
    }

    if (messageBody.method === 'opponent-ready') {
      setOpponentTitle('Oponente | Pronto')
    }
  };

  const [appState, setAppState] = useState('welcome'); // play or welcome

  const startPlay = () => {
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
  }


  // Renders either Welcome Screen or Game
  return (
    <React.Fragment>
      <Header appState={appState} gameCode={gameCode}/>
      {appState === 'play' ? <Game gameCode={gameCode} opponentTitle={opponentTitle}/> : <WelcomeScreen startPlay={startPlay} joinGame={joinGame}/>}
    </React.Fragment>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
