import React from 'react';

import { PlayerFleet } from './PlayerFleet';
import { PlayerBoard } from './PlayerBoard';
import { ComputerBoard } from './ComputerBoard';
import { PlayerTips } from './PlayerTips';

export const GameView = ({
  gameCode,
  availableShips,
  selectShip,
  currentlyPlacing,
  setCurrentlyPlacing,
  rotateShip,
  placeShip,
  placedShips,
  startTurn,
  computerShips,
  gameState,
  changeTurn,
  hitComputer,
  hitsByPlayer,
  setHitsByPlayer,
  hitsByComputer,
  handleComputerTurn,
  checkIfGameOver,
  winner,
  startAgain,
  setComputerShips,
  playSound,
  opponentTitle,
  isHost,
  markAsReady,
  isOpponentReady,
  board,
}) => {
  return (
    <section id="game-screen">
      {gameState !== 'placement' ? (
        <PlayerTips
          gameState={gameState}
          hitsbyPlayer={hitsByPlayer}
          hitsByComputer={hitsByComputer}
          winner={winner}
          startAgain={startAgain}
        />
      ) : (
        <PlayerFleet
          availableShips={availableShips}
          selectShip={selectShip}
          currentlyPlacing={currentlyPlacing}
          startTurn={startTurn}
          startAgain={startAgain}
          isHost={isHost}
          markAsReady={markAsReady}
          isOpponentReady={isOpponentReady}
          board={board}
        />
      )}

      <PlayerBoard
        currentlyPlacing={currentlyPlacing}
        setCurrentlyPlacing={setCurrentlyPlacing}
        rotateShip={rotateShip}
        placeShip={placeShip}
        placedShips={placedShips}
        hitsByComputer={hitsByComputer}
        playSound={playSound}
      />
      <ComputerBoard
        computerShips={computerShips}
        changeTurn={changeTurn}
        gameState={gameState}
        hitComputer={hitComputer}
        hitsByPlayer={hitsByPlayer}
        setHitsByPlayer={setHitsByPlayer}
        handleComputerTurn={handleComputerTurn}
        checkIfGameOver={checkIfGameOver}
        setComputerShips={setComputerShips}
        playSound={playSound}
        opponentTitle={opponentTitle}
      />
    </section>
  );
};
