    // Bot move logic for easy mode (random move)
function botMove() {
    if (!running || currentPlayer !== "O") return;

    let emptyCells = [];
    options.forEach((val, i) => {
        if (val === "") emptyCells.push(i);
    });

    if (emptyCells.length === 0) return;
    let move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    
    // Make the move
    setTimeout(function() {
        const cell = cells[move];
        updateCell(cell, move);
        checkWinner();
    }, 500); //bot moves after 0.5s delay
}