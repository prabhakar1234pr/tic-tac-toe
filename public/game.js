document.addEventListener('DOMContentLoaded', () => {
    const gameState = {
        currentPlayer: 'X',
        board: Array(9).fill(''),
        gameActive: true
    };

    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    const statusDisplay = document.getElementById('status');
    const cells = document.querySelectorAll('.cell');
    const restartButton = document.getElementById('restartButton');

    statusDisplay.textContent = `Player ${gameState.currentPlayer}'s turn`;

    function handleCellClick(clickedCellEvent) {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

        if (gameState.board[clickedCellIndex] !== '' || !gameState.gameActive) {
            return;
        }

        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
    }

    function handleCellPlayed(clickedCell, clickedCellIndex) {
        gameState.board[clickedCellIndex] = gameState.currentPlayer;
        clickedCell.textContent = gameState.currentPlayer;
    }

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            const position1 = gameState.board[a];
            const position2 = gameState.board[b];
            const position3 = gameState.board[c];

            if (position1 === '' || position2 === '' || position3 === '') {
                continue;
            }
            if (position1 === position2 && position2 === position3) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            statusDisplay.textContent = `Player ${gameState.currentPlayer} has won!`;
            gameState.gameActive = false;
            return;
        }

        const roundDraw = !gameState.board.includes('');
        if (roundDraw) {
            statusDisplay.textContent = 'Game ended in a draw!';
            gameState.gameActive = false;
            return;
        }

        gameState.currentPlayer = gameState.currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `Player ${gameState.currentPlayer}'s turn`;
    }

    function handleRestartGame() {
        gameState.currentPlayer = 'X';
        gameState.board = Array(9).fill('');
        gameState.gameActive = true;
        statusDisplay.textContent = `Player ${gameState.currentPlayer}'s turn`;
        cells.forEach(cell => {
            cell.textContent = '';
        });
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', handleRestartGame);
}); 