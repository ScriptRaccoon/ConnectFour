function resetArray() {
    game.array = new Array(game.rows.length)
        .fill(null)
        .map(() => new Array(game.cols.length).fill(null));
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
