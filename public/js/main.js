const game = {
    winParam: 4,
    array: [],
    currentPlayer: 0,
    playing: false,
    duringMove: false,
    rows: [0, 1, 2, 3, 4, 5],
    cols: [0, 1, 2, 3, 4, 5, 6],
    playerNames: ["", ""],
    directions: [
        [0, 1],
        [1, 0],
        [1, 1],
        [0, -1],
        [-1, 0],
        [-1, -1],
        [1, -1],
        [-1, 1],
    ],
    rotation: 0,
};

$(() => {
    $("#game")
        .addClass("start")
        .css("--rows", game.rows.length)
        .css("--cols", game.cols.length);
    $("#modalContent").fadeIn("slow");
    generateSlots();
    resetArray();
    enableControls();
});

function generateSlots() {
    for (const row of game.rows) {
        for (const col of game.cols) {
            $("<div></div>")
                .attr("id", `slot${row}_${col}`)
                .addClass("slot")
                .appendTo(".frame")
                .on("click", () => fallChip(col));
        }
    }
}

function setPlayer(index) {
    $("body")
        .removeClass(`player${game.currentPlayer}`)
        .addClass(`player${index}`);
    $("#message").text(game.playerNames[index] + "'s turn");
    game.currentPlayer = index;
}

function switchPlayer() {
    setPlayer(1 - game.currentPlayer);
}

function resetArray() {
    game.array = new Array(game.rows.length)
        .fill(null)
        .map(() => new Array(game.cols.length).fill(null));
}

function enableControls() {
    $("#playerForm").on("submit", createPlayers);
    $("#restartBtn").on("click", resetGame);
    $("#rotateLeftBtn").on("click", () => rotateGame(+1));
    $("#rotateRightBtn").on("click", () => rotateGame(-1));
}

function createPlayers(e) {
    e.preventDefault();
    const player1 = $("#playerName1").val();
    const player2 = $("#playerName2").val();
    if (player1.length == 0 || player2.length == 0) {
        $(".error").text("Please input a name for each player");
    } else if (player1 == player2) {
        $(".error").text("Please input different names");
    } else {
        game.playerNames = [player1, player2];
        startGame();
    }
}

function startGame() {
    game.playing = true;
    setPlayer(randInt(0, 2));
    $("#modal").remove();
    $("#status, menu").fadeIn("slow");
}

function resetGame() {
    removeChips();
    resetArray();
    $("#game").addClass("restart");
    setTimeout(() => {
        $("#game").removeClass("restart");
    }, 1000);
    $("#scene").removeClass("grow");
    $("#game").removeClass("duringMove");
    $(".playerIcon").show();
    setTimeout(() => {
        setPlayer(randInt(0, 2));
        game.playing = true;
    }, 2000);
}

function removeChips() {
    const firstRow = getFirstNonEmptyRow();
    for (let row = firstRow; row < game.rows.length; row++) {
        setTimeout(() => {
            for (const col of game.cols) {
                const chip = $(`#chip${row}_${col}`).css("--row", -3);
                setTimeout(() => chip.remove(), 600);
            }
        }, 200 * (row - firstRow));
    }
}

function rotateGame(direction) {
    game.rotation += direction * (90 / 4);
    if ((game.rotation - 90) % 180 == 0) {
        game.rotation += direction * (90 / 4);
    }
    $("#game").css("--rotation-y", game.rotation + "deg");
}

function fallChip(col) {
    if (!game.playing || game.duringMove) return;
    const row = getFirstEmptyRow(col);
    if (row == -1) return;
    game.array[row][col] = game.currentPlayer;
    game.duringMove = true;
    $("#game").addClass("duringMove");
    const chip = $("<div></div>")
        .attr("id", `chip${row}_${col}`)
        .addClass("chip fall")
        .css("--col", col)
        .css("--row", -2)
        .addClass(game.currentPlayer == 0 ? "red" : "yellow")
        .appendTo("#inner");
    setTimeout(() => {
        chip.css("--row", row);
    }, 0);
    setTimeout(() => {
        checkEnding();
    }, 600);
}

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

function getFirstEmptyRow(col) {
    let row = game.rows[game.rows.length - 1];
    while (row >= 0 && game.array[row][col] != null) {
        row--;
    }
    return row;
}

function getFirstNonEmptyRow() {
    let row = 0;
    while (
        row < game.rows.length &&
        game.array[row].every((x) => x == null)
    ) {
        row++;
    }
    return row;
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

function highlightChips(coords) {
    for (const coord of coords) {
        const [row, col] = coord;
        $(`#chip${row}_${col}`).addClass("highlight");
    }
    $("#scene").addClass("grow");
}

function randInt(a, b) {
    return a + Math.floor((b - a) * Math.random());
}
