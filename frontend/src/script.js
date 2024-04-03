const ws = new WebSocket('ws://localhost:8081');

let clientId;

function createGame() {
  const payload = {
    method: 'create',
    clientId,
    board: null,
  };

  ws.send(JSON.stringify(payload));
}

ws.onmessage = function (event) {
  const messageBody = JSON.parse(event.data);

  console.log(event.data);

  if (messageBody.method == 'connected') {
    clientId = messageBody.clientId;
  }

  if (messageBody.method == 'create-sucess') {
    let div = document.createElement('div');
    let p = document.createElement('p');

    p.append(messageBody.gameCode);

    div.append(p);

    let divOpponent = document.createElement('div');
    divOpponent.setAttribute('class', 'opponentinfo');

    let opponentText = document.createElement('p');
    opponentText.append('Aguardando Oponente');

    divOpponent.append(opponentText);

    div.append(divOpponent);

    document.querySelector('.gameinfo').append(div);
  }

  if (messageBody.method == 'opponent-joined') {
    let div = document.querySelector('.opponentinfo');

    div.innerHTML = '<p>Player 2 | Aguardando Confirmação</p>';
  }

  if (messageBody.method == 'opponent-ready') {
    let div = document.querySelector('.opponentinfo');

    div.innerHTML = '<p>Player 2 | Pronto</p>';
  }
};
