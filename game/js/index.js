document.addEventListener("DOMContentLoaded", () => {
    initializeGame();
});
const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('#statusText');
const restartBtn = document.querySelector('#restartBtn');
const homeBtn = document.getElementById('homeBtn');
const modeBtn = document.getElementById('modeBtn');
const playerNameSpan = document.getElementById('playerName');
const playerScoreSpan = document.getElementById('playerScore');

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false; 

function initializeGame() {
    // attach cell click handlers
    cells.forEach(cell => cell.addEventListener('click', cellClicked));
    restartBtn.addEventListener('click', restartGame);

    // quick navigation controls
    if (homeBtn) homeBtn.addEventListener('click', () => window.location.href = 'index.html');
    if (modeBtn) modeBtn.addEventListener('click', () => window.location.href = 'mode.html');

    // random start before updating text
    currentPlayer = Math.random() < 0.5 ? "X" : "O"; 
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;

    updateScoreUI();

    // let the bot start after a short delay if it's O
    if (currentPlayer === "O") {
        setTimeout(botMove, 500); 
    }
}
    // Update the displayed player name and score
function updateScoreUI() {
    const loggedIn = localStorage.getItem('loggedInUser');
    const displayName = loggedIn || 'Guest';
    let wins = 0;
    if (window.Ranking && typeof window.Ranking.getRankings === 'function') {
        const rankings = window.Ranking.getRankings();
        wins = Number(rankings[displayName] || 0);
    }
    if (playerNameSpan) playerNameSpan.textContent = displayName;
    if (playerScoreSpan) playerScoreSpan.textContent = wins;
}
    // Handle cell click
function cellClicked() {
    const cellsIndex = parseInt(this.getAttribute('cellIndex'), 10);

    if (options[cellsIndex] != "" || !running || currentPlayer !== "X") {
        return;
    }

    updateCell(this, cellsIndex);
    checkWinner();

    // removed immediate botMove() here — checkWinner will change player
    // and schedule the bot (if needed) with a small delay
}
function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
} 
function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}

    // Check for a win or draw
function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            roundWon = true;
            break;
        }
       
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;

        // If the human (X) wins and there is a logged in user, increment their score
        if (currentPlayer === "X") {
            const loggedIn = localStorage.getItem('loggedInUser');
            if (loggedIn && window.Ranking && typeof window.Ranking.addWinForUser === 'function') {
                window.Ranking.addWinForUser(loggedIn);
                // update the on-screen score immediately
                updateScoreUI();
            }
        }
    }
    else if (!options.includes("")) {
        statusText.textContent = `Draw!`;
        running = false;
    }
    else {
        changePlayer();
        if (currentPlayer == "O") {
            setTimeout(botMove, 500); //bot moves after 0.5s delay
        }
    }
}
    // Restart the game
function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
    updateScoreUI();
}
