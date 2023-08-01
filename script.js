let gameBtns = document.querySelectorAll(".cell");
let popup = document.querySelector(".popup");
let startBtn = document.getElementById("start");
let startPage = document.querySelector(".start-page");
let gameBoard = document.querySelector(".container");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msg = document.getElementById("message");
console.log(gameBtns, popup, newgameBtn, restartBtn, msg);

let player1Name, player2Name, xTurn;
let player1Marker, player2Marker;
let player1Score = 0;
let player2Score = 0;
let count = 0;
let winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const startGame = () => {
  player1Name = document.getElementById("player1").value || "Player 1";
  player2Name = document.getElementById("player2").value || "Player 2";

  player1Marker = document.getElementById("marker").value;
  player2Marker = player1Marker === "X" ? "O" : "X";
  if (player1Marker === "X") {
    console.log("player one is x");
    xTurn = true;
  } else {
    xTurn = false;
  }
  console.log(player1Name, player2Name, player1Marker, player2Marker);
  startPage.classList.add("hide");
  gameBoard.classList.remove("hide");
};

const disableButtons = () => {
  gameBtns.forEach((btn) => (btn.disabled = true));
  popup.classList.remove("hide");
  gameBoard.classList.add("hide");
};

const enableButtons = () => {
  gameBtns.forEach((btn) => {
    btn.innerText = "";
    btn.disabled = false;
  });
  popup.classList.add("hide");
};

const win = (winner) => {
  disableButtons();
  if (winner == player1Marker) msg.innerText = `${player1Name} wins 🎉🎉`;
  else msg.innerText = `${player2Name} wins 🎉🎉`;
};

const draw = () => {
  disableButtons();
  popup.classList.remove("hide");
  msg.innerHTML = "Draw!";
};

const checkWinner = () => {
  for (let i of winningPatterns) {
    console.log(i);
    let [element1, element2, element3] = [
      gameBtns[i[0]].innerText,
      gameBtns[i[1]].innerText,
      gameBtns[i[2]].innerText,
    ];
    console.log(element1, element2, element3);
    if (element1 != "" && element2 != "" && element3 != "") {
      if (element1 == element2 && element1 == element3) {
        console.log("wins");
        win(element1);
      }
    }
  }
};

startBtn.addEventListener("click", () => {
  startGame();
});

newgameBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
  startGame();
});

restartBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});

gameBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (xTurn) {
      xTurn = false;
      btn.innerHTML = "X";
      btn.classList.add("x-marker");
      btn.disabled = true;
    } else {
      xTurn = true;
      btn.innerHTML = "O";
      btn.classList.add("o-marker");
      btn.disabled = true;
    }
    count++;
    if (count === 9) {
      draw();
    }
    checkWinner();
  });
});
