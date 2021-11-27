function checkEnding() {
    game.duringMove = false;
    game.playing = false;
    if (isWon()) {
        $("#message").text(
            game.playerNames[game.currentPlayer] + " has won! 🎉"
        );
    } else if (!hasOpenSlots()) {
        $(".playerIcon").hide();
        $("#message").text("The game has ended in a draw.");
    } else {
        $("#game").removeClass("duringMove");
        game.playing = true;
        switchPlayer();
    }
}

function hasOpenSlots() {
    return game.array.some((row) => row.some((x) => x == null));
}

function isWonAt(row, col, direction) {
    const [xdir, ydir] = direction;
    const entries = [];
    const coords = [];
    for (let i = 0; i < game.winParam; i++) {
        if (
            row + i * ydir >= 0 &&
            row + i * ydir < game.rows.length &&
            col + i * xdir >= 0 &&
            col + i * xdir < game.cols.length
        ) {
            coords.push([row + ydir * i, col + xdir * i]);
            entries.push(game.array[row + ydir * i][col + xdir * i]);
        } else {
            return false;
        }
    }
    if (new Set(entries).size == 1) {
        highlightChips(coords);
        return true;
    } else {
        return false;
    }
}

function isWon() {
    return game.rows.some((row) =>
        game.cols.some(
            (col) =>
                game.array[row][col] != null &&
                game.directions.some((direction) =>
                    isWonAt(row, col, direction)
                )
        )
    );
}
