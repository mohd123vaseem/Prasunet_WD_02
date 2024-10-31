const board = document.getElementById('board');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');
let cells = Array.from(document.querySelectorAll('.cell'));
let currentPlayer = 'X';
let gameState = Array(9).fill(null);

// Winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleClick(event) {
  const cell = event.target;
  const index = cell.dataset.index;

  // Check if cell is already filled or game is over
  if (gameState[index] || checkWinner()) return;

  // Update cell and game state
  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  // Check for a winner or tie
  if (checkWinner()) {
    statusText.textContent = `${currentPlayer} wins!`;
  } else if (gameState.every(cell => cell !== null)) {
    statusText.textContent = "It's a tie!";
  } else {
    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
  });
}

function resetGame() {
  gameState.fill(null);
  cells.forEach(cell => (cell.textContent = ''));
  currentPlayer = 'X';
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);

// Initialize game status
statusText.textContent = `Player ${currentPlayer}'s turn`;
