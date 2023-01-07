grid = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1],
]

function getCell(x, y) {
    return 3 * x + y;
}

function check_draw() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[i][j] == -1) return false;
        }
    }
    return true;
}

function getXY(cell) {
    const [x, y] = [cell / 3, cell % 3];
    return [parseInt(x), y];
}

function display_board() {
    for (let i = 0; i < 9; i++) {
        let cell_info = getXY(i);
        if (grid[cell_info[0]][cell_info[1]] == 1) {

            let d = document.getElementsByName('button' + i);
            if (d.length == 0) {
                continue;
            }
            d[0].parentElement.innerHTML = "X";
        } else if (grid[cell_info[0]][cell_info[1]] == 0) {
            let d = document.getElementsByName('button' + i);
            if (d.length == 0) {
                continue;
            }
            d[0].parentElement.innerHTML = "O";
        }
    }
}

function check_win(player) {
    const winningLines = [
        // rows
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        // columns
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        // diagonals
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]],
    ];

    for (const line of winningLines) {
        const [a, b, c] = line;
        if (grid[a[0]][a[1]] === player && grid[b[0]][b[1]] === player && grid[c[0]][c[1]] === player) {
            return true;
        }
    }
    return false;
}

function make_move(cell, player) {
    let cell_info = getXY(cell);
    grid[cell_info[0]][cell_info[1]] = player;
}

function undo_make_move(x, y) {
    grid[x][y] = -1;
}

function random_shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function make_random_move(player) {
    emptyCells = []
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[i][j] == -1) {
                emptyCells.push(getCell(i, j));
            }
        }
    }

    if (emptyCells.length == 0) {
        alert("Game Draw !");
        location.reload();
    }

    random_shuffle(v);
    let temp = emptyCells[emptyCells.length / 2];
    temp = getXY(temp);
    if (player == 1) {
        grid[temp[0]][temp[1]] = 1;
    } else {
        grid[temp[0]][temp[1]] = 0;
    }
}

function solve(player, dep) {
    if (check_win(player ^ 1)) {
        return [0, -1, -1];
    }

    let maxi = 0;
    let x = -1;
    let y = -1;

    let cnt = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[i][j] == -1) {
                make_move(getCell(i, j), player);
                let popat = solve(player ^ 1, dep + 1);
                undo_make_move(i, j);
                let counter = 100 - popat[0];
                if (counter >= maxi) {
                    maxi = counter;
                    x = i;
                    y = j;
                    cnt++;
                }
            }
        }
    }

    if (cnt == 0) {
        return [50, -1, -1];
    }

    return [maxi, x, y];
}

function handlePlayerMove(cell) {
    make_move(cell, 1);
    display_board();
    if (check_win(1)) {
        alert("You Win !");
        location.reload();
        return;
    }
    if (check_draw()) {
        alert("Game Draw !");
        location.reload();
        return;
    }
    popat = solve(0, 0);

    if (popat[0] == 0) {
        console.log("RANDOM");
        make_random_move(0);
    } else {
        make_move(getCell(popat[1], popat[2]), 0);
    }
    display_board();
    if (check_win(0)) {
        alert("Computer Wins");
        location.reload();
        return;
    }
    if (check_draw()) {
        alert("Game Draw !");
        location.reload();
        return;
    }
}