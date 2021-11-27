function generateSlots() {
    for (const row of game.rows) {
        for (const col of game.cols) {
            $("<div></div>")
                .attr("id", `slot${row}_${col}`)
                .addClass("slot")
                .appendTo(".frame")
                .on("click", () => addChip(col));
        }
    }
}
