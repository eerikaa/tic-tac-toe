//Making sure the players really want to play this game

confirm("Do you want to play Tic Tac Toe?");
const statusDisplay = document.querySelector(".gameStatus");
let gameActive = true;
let currentMove = "X";

//This allows the players to input names for player one and two and confirms everyone knows who is playing as X or O
let playerOne = prompt("Player 1 Name");
if (playerOne != null) {
  document.getElementById("username").value = playerOne + ", you are X!";
}

let playerTwo = prompt("Player 2 Name");
if (playerTwo != null) {
  document.getElementById("username1").value = playerTwo + ", you are O!";
} else {
  playerTwo = "Computer";
}
//here is where I need to randomize who goes first
let currentPlayer = playerOne;

let gameState = ["", "", "", "", "", "", "", "", ""];

//This displays who's turn and who is the winner

let winningMessage = () => `${currentPlayer} is the winner!`;
const drawMessage = () => `It's a tie!!! `;
let currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

//These are all the possible winning combinations

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
// this handling game play
function handleCellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentMove;
  clickedCell.innerHTML = currentMove;
}

function handlePlayerChange() {
  currentMove = currentMove === "X" ? "O" : "X";
  currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;

  console.log(currentMove, currentPlayer);

  statusDisplay.innerHTML = currentPlayerTurn();
}
//game play logic

function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDisplay.innerHTML = winningMessage();
    gameActive = false;
    return;
  }
  //Here is where we display if the game was a tie
  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
  }

  handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute("data-cell-index")
  );

  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}
// Game restart

function handleRestartGame() {
  gameActive = true;
  playerOne = playerOne;
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
}

document
  .querySelectorAll(".cell")
  .forEach((cell) => cell.addEventListener("click", handleCellClick));
document
  .querySelector(".gameRestart")
  .addEventListener("click", handleRestartGame);
