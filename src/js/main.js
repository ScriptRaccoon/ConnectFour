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
