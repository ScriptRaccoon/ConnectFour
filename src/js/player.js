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
