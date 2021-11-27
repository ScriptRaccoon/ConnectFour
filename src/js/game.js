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