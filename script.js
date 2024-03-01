let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function makeMove(index) {
    if (board[index] === '' && !checkWinner()) {
        board[index] = currentPlayer;
        renderBoard();
        if (!checkWinner() && !checkDraw()) {
            setTimeout(() => {
                botMove();
                renderBoard();
            }, 500);
        }
    }
}

function botMove() {
    let availableMoves = board.reduce((acc, cell, index) => {
        if (cell === '') {
            acc.push(index);
        }
        return acc;
    }, []);

    let randomIndex = Math.floor(Math.random() * availableMoves.length);
    let moveIndex = availableMoves[randomIndex];
    board[moveIndex] = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    for (let combo of winningCombinations) {
        if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[1]] === board[combo[2]]) {
            document.getElementById('message').innerText = `${currentPlayer} wins!`;
            return true;
        }
    }
    return false;
}

function checkDraw() {
    if (!board.includes('')) {
        document.getElementById('message').innerText = "It's a draw!";
        return true;
    }
    return false;
}

function resetGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    renderBoard();
    document.getElementById('message').innerText = '';
}

function renderBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.innerText = board[index];
    });
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}
