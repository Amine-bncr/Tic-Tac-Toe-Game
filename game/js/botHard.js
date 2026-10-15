function botMove() {
    if (!running || currentPlayer !== "O") return;

    // helper: check if a move wins the game
    function isWinningMove(player, index) {
        let tempOptions = [...options];
        tempOptions[index] = player;
        return winConditions.some(condition => {
            return condition.every(i => tempOptions[i] === player);
        });
    }

    let move = null;

    // 1. Try to win
    for (let i = 0; i < options.length; i++) {
        if (options[i] === "" && isWinningMove("O", i)) {
            move = i;
            break;
        }
    }

    // 2. Block X if about to win
    if (move === null) {
        for (let i = 0; i < options.length; i++) {
            if (options[i] === "" && isWinningMove("X", i)) {
                move = i;
                break;
            }
        }
    }

    // 3. Take center if free
    if (move === null && options[4] === "") {
        move = 4;
    }

    // 4. Take a corner if free
    if (move === null) {
        const corners = [0, 2, 6, 8];
        const availableCorners = corners.filter(i => options[i] === "");
        if (availableCorners.length > 0) {
            move = availableCorners[Math.floor(Math.random() * availableCorners.length)];
        }
    }

    // 5. Pick random empty
    if (move === null) {
        let emptyCells = [];
        options.forEach((val, i) => {
            if (val === "") emptyCells.push(i);
        });
        move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }

    // Make the move
    setTimeout(function() {
        const cell = cells[move];
        updateCell(cell, move);
        checkWinner();
    }, 500); //bot moves after 0.5s delay
}
