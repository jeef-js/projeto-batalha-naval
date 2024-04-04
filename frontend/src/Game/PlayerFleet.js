import React from 'react';
import { ReplicaBox } from './ReplicaBox';

export const PlayerFleet = ({
  availableShips,
  selectShip,
  currentlyPlacing,
  startGame,
  startAgain,
  isHost,
  markAsReady,
  isOpponentReady,
  board,
}) => {
  let shipsLeft = availableShips.map((ship) => ship.name);

  // For every ship still available, return a Replica Box with the ship's name and as many squares as its length
  let shipReplicaBoxes = shipsLeft.map((shipName) => (
    <ReplicaBox
      selectShip={selectShip}
      key={shipName}
      isCurrentlyPlacing={
        currentlyPlacing && currentlyPlacing.name === shipName
      }
      shipName={shipName}
      availableShips={availableShips}
    />
  ));

  let playButton = (
    <div id="play-ready">
      <button
        id="play-button"
        onClick={() => startGame(board)}
        disabled={availableShips.length > 0 || !isOpponentReady}
      >
        Iniciar Jogo
      </button>
    </div>
  );

  let readyButton = (
    <div id="play2-ready">
      <button
        id="play-button"
        onClick={() => markAsReady(board)}
        disabled={availableShips.length > 0}
      >
        Pronto
      </button>
    </div>
  );

  return (
    <div id="available-ships">
      <div className="tip-box-title">Suas Embarcações</div>
      <div id="replica-fleet">
        {shipReplicaBoxes}
        <p className="player-tip">
          Clique com o botão direito enquanto estiver posicionando o navio para
          rotacionar.
        </p>
        <p className="restart" onClick={startAgain}>
          Limpar Tabuleiro
        </p>
      </div>
      {isHost ? playButton : readyButton}
    </div>
  );
};
