function enableControls() {
    $("#playerForm").on("submit", createPlayers);
    $("#restartBtn").on("click", resetGame);
    $("#rotateLeftBtn").on("click", () => rotateGame(+1));
    $("#rotateRightBtn").on("click", () => rotateGame(-1));
}
