import React from 'react';

export const WelcomeScreen = ({ startPlay, joinGame }) => {
  const [gamecode, setGameCode] = React.useState('');

  const handleOnChange = React.useCallback((event) => {
    const { target: { value } } = event;
    
    setGameCode(value);
  }, []);

  const handleOnClick = () => {
    joinGame(gamecode);
  };

  return (
    <main>
      <div className='start-menu'> 
        <button onClick={startPlay}>Criar Partida</button>
        <div className='join-room'>
          <input type='text' placeholder='Código' gamecode="" value={gamecode} onChange={handleOnChange}></input>
          <button onClick={handleOnClick}>Entrar</button>
        </div>
      </div>
    </main>
  );
};
