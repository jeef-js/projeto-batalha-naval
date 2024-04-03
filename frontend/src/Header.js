import React from 'react';

export const Header = ({ appState, gameCode }) => {
  const welcomeHeader = (
  <header>
    <h1>Batalha Naval</h1>
    <span role="img" aria-label="anchor">
      ⚓️
    </span>
  </header>
  );

  const gameHeader = (
    <header>
      <h1>Código do Jogo: {gameCode}</h1>
    </header>
    );
    
  return appState === 'play' ? gameHeader : welcomeHeader;
};
