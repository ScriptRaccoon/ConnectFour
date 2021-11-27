function rotateGame(direction) {
    game.rotation += direction * (90 / 4);
    if ((game.rotation - 90) % 180 == 0) {
        game.rotation += direction * (90 / 4);
    }
    $("#game").css("--rotation-y", game.rotation + "deg");
}
