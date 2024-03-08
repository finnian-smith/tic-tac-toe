// Gameboard -> create board and actions
const gameboard = (function () {
  const rows = 3;
  const columns = 3;
  let board = [];

  function createBoard() {
    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j = 0; j < columns; j++) {
        row.push(null);
      }
      board.push(row);
    }
  }

  createBoard(); // create board when module is loaded

  const getBoard = () => board;

  function displayBoard() {
    console.log("Current Board:");
    for (let i = 0; i < rows; i++) {
      console.log(board[i].join("|"));
    }
  }

  const placeMarker = (row, column, marker) => {
    if (board[row][column] === null) {
      board[row][column] = marker;
      return true;
    } else {
      return false;
    }
  };

  const resetBoard = () => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        board[i][j] = null;
      }
    }
  };

  return { getBoard, displayBoard, placeMarker, resetBoard };
})();

// Player -> create players
function createPlayer(name, marker) {
  return { name, marker };
}

// Game -> controls flow of the game
const gameController = (() => {
  const player1 = createPlayer("John", "X");
  const player2 = createPlayer("Mary", "O");
  let gameOver = false;

  let activePlayer = player1;

  const playRound = () => {
    while (!gameOver) {
      console.log(`${activePlayer.name} it's your turn!`);
      gameboard.displayBoard();
      let row = prompt("Row: ");
      let col = prompt("Column: ");
      gameboard.placeMarker(row, col, activePlayer.marker);
      gameboard.displayBoard();
      checkGameOver();
      switchPlayer();
    }
  };

  const getActivePlayer = () => activePlayer;

  const switchPlayer = () => {
    activePlayer = activePlayer === player1 ? player2 : player1;
  };

  const checkWin = () => {
    const marker = activePlayer.marker;
    const board = gameboard.getBoard();

    // Row or column win
    for (let i = 0; i < board.length; i++) {
      if (
        (board[i][0] === marker &&
          board[i][1] === marker &&
          board[i][2] === marker) ||
        (board[0][i] === marker &&
          board[1][i] === marker &&
          board[2][i] === marker)
      ) {
        console.log(`${activePlayer.name} wins!`);
        return true;
      }
    }

    // Diagonal win
    if (
      (board[0][0] === marker &&
        board[1][1] === marker &&
        board[2][2] === marker) ||
      (board[0][2] === marker &&
        board[1][1] === marker &&
        board[2][0] === marker)
    ) {
      console.log(`${activePlayer.name} wins!`);
      return true;
    }

    return false;
  };

  const checkDraw = () => {
    const board = gameboard.getBoard();

    // Check if board is full
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === null) {
          return false;
        }
      }
    }
    console.log("It's a tie!");
    return true; // Board is full = draw
  };

  const checkGameOver = () => {
    if (checkWin() || checkDraw()) {
      gameOver = true;
    }
  };

  return {
    playRound,
    getActivePlayer,
    switchPlayer,
    checkWin,
    checkDraw,
    checkGameOver,
  };
})();

const game = gameController;

gameController.playRound();
