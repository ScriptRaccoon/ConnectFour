function addChip(col) {
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

function getFirstEmptyRow(col) {
    let row = game.rows[game.rows.length - 1];
    while (row >= 0 && game.array[row][col] != null) {
        row--;
    }
    return row;
}

function highlightChips(coords) {
    for (const coord of coords) {
        const [row, col] = coord;
        $(`#chip${row}_${col}`).addClass("highlight");
    }
    $("#scene").addClass("grow");
    $("header").addClass("jumping");
}
