let currentPlayer;
const player1Input = document.querySelector("#player1");
const player2Input = document.querySelector("#player2");
const resultDisplay = document.querySelector(".result");
const boardElement = document.querySelector(".board");

// Gameboard factory function
const Gameboard = () => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => [...board];

  const placeMarker = (index, marker) => {
    if (board[index] === "") {
      board[index] = marker;
      return true;
    }
    return false;
  };

  const resetBoard = () => {
    board.fill("");
  };

  return { getBoard, placeMarker, resetBoard };
};

// Player factory function
const Player = (name, marker) => ({ name, marker });

// Game controller module
const gameController = (() => {
  let player1, player2;
  let gameStarted = false;
  const gameboard = Gameboard();

  const startGame = () => {
    const name1 = player1Input.value.trim() || "Player 1";
    const name2 = player2Input.value.trim() || "Player 2";
    player1 = Player(name1, "X");
    player2 = Player(name2, "O");
    currentPlayer = player1;
    gameStarted = true;
    resultDisplay.textContent = "";
    gameboard.resetBoard();
    updateBoard();
  };

  const playRound = (index) => {
    if (!gameStarted) return;
    if (gameboard.placeMarker(index, currentPlayer.marker)) {
      if (checkWin()) {
        resultDisplay.textContent = `${currentPlayer.name} wins!`;
        gameStarted = false;
      } else if (checkDraw()) {
        resultDisplay.textContent = "It's a draw!";
        gameStarted = false;
      } else {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        // updateBoard();
      }
      updateBoard();
    }
  };

  const checkWin = () => {
    const board = gameboard.getBoard();
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // columns
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ];

    for (const condition of winConditions) {
      const [a, b, c] = condition;
      if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
        return true;
      }
    }
    return false;
  };

  const checkDraw = () => !gameboard.getBoard().includes("");

  const updateBoard = () => {
    boardElement.innerHTML = "";
    gameboard.getBoard().forEach((cell, index) => {
      const cellElement = document.createElement("div");
      cellElement.classList.add("cell");
      cellElement.dataset.index = index;
      cellElement.textContent = cell;
      boardElement.appendChild(cellElement);
    });
  };

  return { startGame, playRound };
})();

// Event handler for cell clicks
function handleCellClick(event) {
  if (!event.target.classList.contains("cell")) return;
  const index = parseInt(event.target.dataset.index);
  gameController.playRound(index);
}

// Start the game
function startGame() {
  gameController.startGame();
}
