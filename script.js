'use strict';

const data = document.querySelectorAll('.td');
const overlay = document.querySelector('.overlay');
const overlay2 = document.querySelector('.overlay-2');
const playerSelect = document.querySelector('.player-select');
const players = document.querySelectorAll('.player');
const winner = document.querySelector('.winner');
const playerWins = document.querySelector('.player-wins');
const button = document.querySelector('button');
const scoreX = document.querySelector('.score-x');
const scoreO = document.querySelector('.score-o');
const draw = document.querySelector('.score-0');
const turn = document.querySelector('.each-turn');
const opponent = document.querySelector('.opponent');
const options = document.querySelectorAll('.options');

let player1;
let select;
let dataArray;
let x = 0;
let o = 0;
let d = 0;
let next = 0;
let playing = 0;
let narr = [];

//initial conditions
function initial() {
  dataArray = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
  player1 = [' ', ' '];
  select = [' ', ' '];

  for (let i = 0; i < data.length; i++) {
    document.querySelectorAll('.td')[i].textContent = ' ';
  }
  overlay2.classList.add('hidden');
  winner.classList.add('hidden');
  winner.classList.remove('flex');
  overlay.classList.remove('hidden');
  opponent.classList.remove('hidden');
}

initial();

function nextRound() {
  dataArray = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
  player1 = [' ', ' '];

  for (let i = 0; i < data.length; i++) {
    document.querySelectorAll('.td')[i].textContent = ' ';
  }
  overlay2.classList.add('hidden');
  winner.classList.add('hidden');
  winner.classList.remove('flex');
  if (next === 0) {
    player1[0] = 0;
    turn.textContent = 'X';
    turn.style.color = '#1EE3CF';
  } else {
    player1[1] = 1;
    turn.textContent = 'O';
    turn.style.color = '#ffab4c';
  }
}

//2 Players
function inputX() {
  overlay.classList.add('hidden');
  playerSelect.classList.add('hidden');
  for (let k = 0; k < players.length; k++) {
    document.querySelectorAll('.player')[k].classList.add('hidden');
  }
  player1[0] = 0;
  next = 0;
}

function inputO() {
  overlay.classList.add('hidden');
  playerSelect.classList.add('hidden');
  for (let k = 0; k < players.length; k++) {
    document.querySelectorAll('.player')[k].classList.add('hidden');
  }
  player1[1] = 1;
  next = 1;
}

//Begin

function opponentSelect() {
  for (let i = 0; i < options.length; i++) {
    options[i].addEventListener('click', function () {
      opponent.classList.add('hidden');
      playerSelect.classList.remove('hidden');
      for (let k = 0; k < players.length; k++) {
        document.querySelectorAll('.player')[k].classList.remove('hidden');
      }
    });
  }
}

opponentSelect();

options[0].addEventListener('click', function () {
  play();
  computer();
});
options[1].addEventListener('click', function () {
  play();
  switchPlayer();
});

function play() {
  players[0].addEventListener('click', inputX);
  players[1].addEventListener('click', inputO);
}

// play();

//switch player
function switchPlayer() {
  for (let i = 0; i < data.length; i++) {
    data[i].addEventListener('click', function () {
      if (player1[0] === 0 && dataArray[i] === ' ') {
        turn.textContent = 'O';
        turn.style.color = '#ffab4c';
        data[i].style.color = '#1EE3CF';
        this.textContent = 'X';
        dataArray[i] = data[i].textContent;
        win('X');
        player1[0] = 1;
      } else if (player1[0] !== 0 && dataArray[i] === ' ') {
        turn.textContent = 'X';
        turn.style.color = '#1EE3CF';
        data[i].style.color = '#ffab4c';
        this.textContent = 'O';
        dataArray[i] = data[i].textContent;
        win('O');
        player1[0] = 0;
      }
    });
  }
}

//what to do when the game is won
function winGame(x, y, z) {
  setTimeout(function () {
    winner.classList.remove('hidden');
    winner.classList.add('flex');
  }, 400);
  overlay2.classList.remove('hidden');
  for (let i = x; i <= y; i += z) {
    data[i].style.backgroundColor = 'yellowgreen';
    data[i].style.color = 'black';

    //Next Round
    button.addEventListener('click', function () {
      data[i].style.backgroundColor = null;
      nextRound();
    });
  }
}

function drawGame() {
  setTimeout(function () {
    winner.classList.remove('hidden');
    winner.classList.add('flex');
  }, 400);
  overlay2.classList.remove('hidden');
  button.addEventListener('click', function () {
    nextRound();
  });
}

function newGame() {
  button.addEventListener('click', initial);
}

function scoreBoard(score) {
  if (score === 'X') {
    x++;
    scoreX.textContent = `X ${x} wins`;
    if (x === 10) {
      playerWins.textContent = `${score} Wins!`;
      button.textContent = 'New Game';
      newGame();
    }
  } else if (score === 'O') {
    o++;
    scoreO.textContent = `O ${o} wins`;
    if (o === 10) {
      playerWins.textContent = `${score} Wins!`;
      button.textContent = 'New Game';
      newGame();
    }
  } else if (score === 'd') {
    d++;
    draw.textContent = `${d} Draws`;
  }
}

//Condition to win
function win(number) {
  if (
    dataArray[0] === dataArray[1] &&
    dataArray[1] === dataArray[2] &&
    dataArray[0] !== ' '
  ) {
    winGame(0, 2, 1);
    playerWins.textContent = `${number} Takes the Round!`;
    scoreBoard(number);
  } else if (
    dataArray[3] === dataArray[4] &&
    dataArray[4] === dataArray[5] &&
    dataArray[3] !== ' '
  ) {
    winGame(3, 5, 1);
    playerWins.textContent = `${number} Takes the Round!`;
    scoreBoard(number);
  } else if (
    dataArray[6] === dataArray[7] &&
    dataArray[7] === dataArray[8] &&
    dataArray[6] !== ' '
  ) {
    winGame(6, 8, 1);
    playerWins.textContent = `${number} Takes the Round!`;
    scoreBoard(number);
  } else if (
    dataArray[0] === dataArray[3] &&
    dataArray[3] === dataArray[6] &&
    dataArray[0] !== ' '
  ) {
    winGame(0, 6, 3);
    playerWins.textContent = `${number} Takes the Round!`;
    scoreBoard(number);
  } else if (
    dataArray[1] === dataArray[4] &&
    dataArray[4] === dataArray[7] &&
    dataArray[1] !== ' '
  ) {
    winGame(1, 7, 3);
    playerWins.textContent = `${number} Takes the Round!`;
    scoreBoard(number);
  } else if (
    dataArray[2] === dataArray[5] &&
    dataArray[5] === dataArray[8] &&
    dataArray[2] !== ' '
  ) {
    winGame(2, 8, 3);
    scoreBoard(number);
    playerWins.textContent = `${number} Takes the Round!`;
  } else if (
    dataArray[0] === dataArray[4] &&
    dataArray[4] === dataArray[8] &&
    dataArray[0] !== ' '
  ) {
    winGame(0, 8, 4);
    playerWins.textContent = `${number} Takes the Round!`;
    scoreBoard(number);
  } else if (
    dataArray[2] === dataArray[4] &&
    dataArray[4] === dataArray[6] &&
    dataArray[2] !== ' '
  ) {
    winGame(2, 6, 2);
    playerWins.textContent = `${number} Takes the Round!`;
    scoreBoard(number);
  } else if (!dataArray.includes(' ')) {
    drawGame();
    playerWins.textContent = `- It's a draw!`;
    scoreBoard('d');
  }
}

//Computer
function computer() {
  let start = true;
  for (let i = 0; i < data.length; i++) {
    data[i].addEventListener('click', function () {
      if (player1[0] === 0 && dataArray[i] === ' ') {
        turn.textContent = 'X';
        turn.style.color = '#1EE3CF';
        data[i].style.color = '#1EE3CF';
        this.textContent = 'X';
        dataArray[i] = data[i].textContent;
        if (start) {
          let c = [];
          let g = -1;
          for (let k = 0; k < dataArray.length; k++) {
            c.push(dataArray.indexOf(' ', k, k + 1));
            g++;
            if (c[g] === c[g - 1] || c[g] === -1) {
              c.pop();
              g--;
            }
          }
          computerWin();
          if (c.length === 0) {
            dataArray[i] = data[i].textContent;
            this.textContent = 'X';
          }
          let random = Math.trunc(Math.random() * c.length);
          let randomIndex = c[random];
          condition(dataArray, randomIndex, data, 'O', '#ffab4c');
          computerWin();
          if (!dataArray.includes(' ')) {
            drawGame();
            playerWins.textContent = `- It's a draw!`;
            scoreBoard('d');
          }
        }
      } else if (player1[0] !== 0 && dataArray[i] === ' ') {
        turn.textContent = 'O';
        turn.style.color = '#ffab4c';
        data[i].style.color = '#ffab4c';
        this.textContent = 'O';
        dataArray[i] = data[i].textContent;
        computerWin();
        if (start) {
          let c = [];
          let g = -1;
          for (let k = 0; k < dataArray.length; k++) {
            c.push(dataArray.indexOf(' ', k, k + 1));
            g++;
            if (c[g] === c[g - 1] || c[g] === -1) {
              c.pop();
              g--;
            }
          }

          if (c.length === 0) {
            this.textContent = 'X';
            dataArray[i] = data[i].textContent;
          }
          let random = Math.trunc(Math.random() * c.length);
          let randomIndex = c[random];
          condition(dataArray, randomIndex, data, 'X', '#1EE3CF');
          computerWin();
          if (!dataArray.includes(' ')) {
            drawGame();
            playerWins.textContent = `- It's a draw!`;
            scoreBoard('d');
          }
        }
      }
    });
  }
}

function condition(dataArray, randomIndex, data, text, color) {
  if (
    (dataArray[0] === dataArray[1] &&
      dataArray[0] === text &&
      dataArray[2] === ' ') ||
    (dataArray[2] === dataArray[1] &&
      dataArray[2] === text &&
      dataArray[0] === ' ') ||
    (dataArray[0] === dataArray[2] &&
      dataArray[0] === text &&
      dataArray[1] === ' ')
  ) {
    positionText(data, dataArray, text, color, 0, 2, 1);
  } else if (
    (dataArray[3] === dataArray[4] &&
      dataArray[4] === text &&
      dataArray[5] === ' ') ||
    (dataArray[5] === dataArray[4] &&
      dataArray[5] === text &&
      dataArray[3] === ' ') ||
    (dataArray[3] === dataArray[5] &&
      dataArray[3] === text &&
      dataArray[4] === ' ')
  ) {
    positionText(data, dataArray, text, color, 3, 5, 1);
  } else if (
    (dataArray[6] === dataArray[7] &&
      dataArray[6] === text &&
      dataArray[8] === ' ') ||
    (dataArray[8] === dataArray[7] &&
      dataArray[8] === text &&
      dataArray[6] === ' ') ||
    (dataArray[6] === dataArray[8] &&
      dataArray[6] === text &&
      dataArray[7] === ' ')
  ) {
    positionText(data, dataArray, text, color, 6, 8, 1);
  } else if (
    (dataArray[0] === dataArray[4] &&
      dataArray[0] === text &&
      dataArray[8] === ' ') ||
    (dataArray[8] === dataArray[4] &&
      dataArray[8] === text &&
      dataArray[0] === ' ') ||
    (dataArray[0] === dataArray[8] &&
      dataArray[0] === text &&
      dataArray[4] === ' ')
  ) {
    positionText(data, dataArray, text, color, 0, 8, 4);
  } else if (
    (dataArray[2] === dataArray[4] &&
      dataArray[2] === text &&
      dataArray[6] === ' ') ||
    (dataArray[6] === dataArray[4] &&
      dataArray[6] === text &&
      dataArray[2] === ' ') ||
    (dataArray[2] === dataArray[6] &&
      dataArray[2] === text &&
      dataArray[4] === ' ')
  ) {
    positionText(data, dataArray, text, color, 2, 6, 2);
  } else if (
    (dataArray[0] === dataArray[3] &&
      dataArray[0] === text &&
      dataArray[6] === ' ') ||
    (dataArray[6] === dataArray[3] &&
      dataArray[6] === text &&
      dataArray[0] === ' ') ||
    (dataArray[0] === dataArray[6] &&
      dataArray[0] === text &&
      dataArray[3] === ' ')
  ) {
    positionText(data, dataArray, text, color, 0, 6, 3);
  } else if (
    (dataArray[1] === dataArray[4] &&
      dataArray[1] === text &&
      dataArray[7] === ' ') ||
    (dataArray[7] === dataArray[4] &&
      dataArray[7] === text &&
      dataArray[1] === ' ') ||
    (dataArray[1] === dataArray[7] &&
      dataArray[1] === text &&
      dataArray[4] === ' ')
  ) {
    positionText(data, dataArray, text, color, 1, 7, 3);
  } else if (
    (dataArray[2] === dataArray[5] &&
      dataArray[2] === text &&
      dataArray[8] === ' ') ||
    (dataArray[8] === dataArray[5] &&
      dataArray[8] === text &&
      dataArray[2] === ' ') ||
    (dataArray[2] === dataArray[8] &&
      dataArray[2] === text &&
      dataArray[5] === ' ')
  ) {
    positionText(data, dataArray, text, color, 2, 8, 3);
  } else if (
    (dataArray[0] === dataArray[1] &&
      dataArray[0] !== ' ' &&
      dataArray[2] === ' ') ||
    (dataArray[2] === dataArray[1] &&
      dataArray[2] !== ' ' &&
      dataArray[0] === ' ') ||
    (dataArray[0] === dataArray[2] &&
      dataArray[0] !== ' ' &&
      dataArray[1] === ' ')
  ) {
    position(1, 1, 0, data, dataArray, randomIndex, text, color);
  } else if (
    (dataArray[3] === dataArray[4] &&
      dataArray[4] !== ' ' &&
      dataArray[5] === ' ') ||
    (dataArray[5] === dataArray[4] &&
      dataArray[5] !== ' ' &&
      dataArray[3] === ' ') ||
    (dataArray[3] === dataArray[5] &&
      dataArray[3] !== ' ' &&
      dataArray[4] === ' ')
  ) {
    position(4, 1, 3, data, dataArray, randomIndex, text, color);
  } else if (
    (dataArray[6] === dataArray[7] &&
      dataArray[6] !== ' ' &&
      dataArray[8] === ' ') ||
    (dataArray[8] === dataArray[7] &&
      dataArray[8] !== ' ' &&
      dataArray[6] === ' ') ||
    (dataArray[6] === dataArray[8] &&
      dataArray[6] !== ' ' &&
      dataArray[7] === ' ')
  ) {
    position(7, 1, 6, data, dataArray, randomIndex, text, color);
  } else if (
    (dataArray[0] === dataArray[4] &&
      dataArray[0] !== ' ' &&
      dataArray[8] === ' ') ||
    (dataArray[8] === dataArray[4] &&
      dataArray[8] !== ' ' &&
      dataArray[0] === ' ') ||
    (dataArray[0] === dataArray[8] &&
      dataArray[0] !== ' ' &&
      dataArray[4] === ' ')
  ) {
    position(4, 4, 0, data, dataArray, randomIndex, text, color);
  } else if (
    (dataArray[2] === dataArray[4] &&
      dataArray[2] !== ' ' &&
      dataArray[6] === ' ') ||
    (dataArray[6] === dataArray[4] &&
      dataArray[6] !== ' ' &&
      dataArray[2] === ' ') ||
    (dataArray[2] === dataArray[6] &&
      dataArray[2] !== ' ' &&
      dataArray[4] === ' ')
  ) {
    position(4, 2, 2, data, dataArray, randomIndex, text, color);
  } else if (
    (dataArray[0] === dataArray[3] &&
      dataArray[0] !== ' ' &&
      dataArray[6] === ' ') ||
    (dataArray[6] === dataArray[3] &&
      dataArray[6] !== ' ' &&
      dataArray[0] === ' ') ||
    (dataArray[0] === dataArray[6] &&
      dataArray[0] !== ' ' &&
      dataArray[3] === ' ')
  ) {
    position(3, 3, 0, data, dataArray, randomIndex, text, color);
  } else if (
    (dataArray[1] === dataArray[4] &&
      dataArray[1] !== ' ' &&
      dataArray[7] === ' ') ||
    (dataArray[7] === dataArray[4] &&
      dataArray[7] !== ' ' &&
      dataArray[1] === ' ') ||
    (dataArray[1] === dataArray[7] &&
      dataArray[1] !== ' ' &&
      dataArray[4] === ' ')
  ) {
    position(4, 3, 1, data, dataArray, randomIndex, text, color);
  } else if (
    (dataArray[2] === dataArray[5] &&
      dataArray[2] !== ' ' &&
      dataArray[8] === ' ') ||
    (dataArray[8] === dataArray[5] &&
      dataArray[8] !== ' ' &&
      dataArray[2] === ' ') ||
    (dataArray[2] === dataArray[8] &&
      dataArray[2] !== ' ' &&
      dataArray[5] === ' ')
  ) {
    position(5, 3, 2, data, dataArray, randomIndex, text, color);
  } else {
    dataArray[randomIndex] = text;
    setTimeout(function () {
      data[randomIndex].style.color = color;
      data[randomIndex].textContent = text;
    }, 100);
  }
}

function position(n, m, b, arr, arr1, randy, text, color) {
  if (arr1[n + m] !== ' ' && arr1[n - m] === ' ') {
    arr1[n - m] = text;
    setTimeout(function () {
      arr[n - m].style.color = color;
      arr[n - m].textContent = text;
    }, 100);
  } else if (arr1[b] !== ' ' && arr1[b + m] === ' ') {
    arr1[b + m] = text;
    setTimeout(function () {
      arr[b + m].style.color = color;
      arr[b + m].textContent = text;
    }, 100);
  } else if (arr[n + m].textContent !== ' ') {
    arr1[randy] = text;
    setTimeout(function () {
      arr[randy].style.color = color;
      arr[randy].textContent = text;
    }, 100);
  } else {
    dataArray[n + m] = text;
    setTimeout(function () {
      arr[n + m].style.color = color;
      arr[n + m].textContent = text;
    }, 100);
  }
}

function positionText(arr, arr1, text, color, x, y, z) {
  let oarr = [];
  for (let i = x; i <= y; i += z) {
    oarr.push(arr1[i]);
  }
  for (let i = 0; i < oarr.length; i++) {
    playing = oarr.indexOf(' ');
  }
  if (playing === 0) {
    arr1[x] = text;
    setTimeout(function () {
      arr[x].style.color = color;
      arr[x].textContent = text;
    }, 100);
  } else if (playing === 1) {
    arr1[x + z] = text;
    setTimeout(function () {
      arr[x + z].style.color = color;
      arr[x + z].textContent = text;
    }, 100);
  } else if (playing === 2) {
    arr1[y] = text;
    setTimeout(function () {
      arr[y].style.color = color;
      arr[y].textContent = text;
    }, 100);
  }
}

function computerWin() {
  let p = 0;
  let q = 0;
  let r = 0;
  let f = 0;
  let a = 0;
  let b = 0;
  let o1 = 0;
  let o2 = 0;
  let o3 = 0;
  for (let j = 0; j < 9; j++) {
    if (dataArray[j] === 'X' && j < 3) {
      p++;
    } else if (dataArray[j] === 'O' && j < 3) {
      o1++;
    }
    if (dataArray[j] === 'X' && j >= 3 && j < 6) {
      q++;
    } else if (dataArray[j] === 'O' && j >= 3 && j < 6) {
      o2++;
    }
    if (dataArray[j] === 'X' && j >= 6) {
      r++;
    } else if (dataArray[j] === 'O' && j >= 6) {
      o3++;
    }
  }
  if (p === 3 || q === 3 || r === 3) {
    win('X');
    start = false;
  } else if (o1 === 3 || o2 === 3 || o3 === 3) {
    win('O');
    start = false;
  }

  let y = 1;
  let g = 2;
  let o4 = 0;
  let o5 = 0;
  let o6 = 0;
  for (let j = 0; j < 9; j += 3) {
    if (dataArray[j] === 'X' && j < 7) {
      f++;
    } else if (dataArray[j] === 'O' && j < 7) {
      o4++;
    }
    if (dataArray[y] === 'X' && y < 8) {
      a++;
    } else if (dataArray[y] === 'O' && y < 8) {
      o5++;
    }
    if (dataArray[g] === 'X' && g < 9) {
      b++;
    } else if (dataArray[g] === 'O' && g < 9) {
      o6++;
    }
    g += 3;
    y += 3;
  }
  if (f === 3 || a === 3 || b === 3) {
    win('X');
    start = false;
  } else if (o4 === 3 || o5 === 3 || o6 === 3) {
    win('O');
    start = false;
  }

  let h = 0;
  let l = 0;
  let c = 2;
  let o7 = 0;
  let o8 = 0;
  for (let j = 0; j < 9; j += 4) {
    if (dataArray[j] === 'X') {
      h++;
    } else if (dataArray[j] === 'O') {
      o7++;
    }
    if (dataArray[c] === 'X' && c < 7) {
      l++;
    } else if (dataArray[c] === 'O' && c < 7) {
      o8++;
    }
    c += 2;
  }
  if (h === 3 || l === 3) {
    win('X');
    start = false;
  } else if (o7 === 3 || o8 === 3) {
    win('O');
    start = false;
  }
}
