function getPos(p) {
    return p * (cellSideLength + cellSpace) + cellSpace;
}

function getBackgroundColor(num) {
    switch (num) {
        case 2: return '#eee4da'; break;
        case 4: return '#ede0c8'; break;
        case 8: return '#f2b179'; break;
        case 16: return '#f59563'; break;
        case 32: return '#f67c5f'; break;
        case 64: return '#f65e3b'; break;
        case 128: return '#edcf72'; break;
        case 256: return '#edcc61'; break;
        case 512: return '#9c0'; break;
        case 1024: return '#33b5e5'; break;
        case 2048: return '#09c'; break;
        case 4096: return '#a6c'; break;
        case 8192: return '#93c'; break;
        default: return 'black'; break;
    }
}

function getFontColor(num) {
    if (num < 8) {
        return '#776e65';
    }
    return 'white';
}

function getFontSize(num) {
    return (8 - (num + '').length) * cellSideLength * 0.1;
}

function isNoSpace(board) {
    return !board.some((rows, row) => {
        return rows.some((num, col) => {
            if (num == 0) {
                return true;
            }
        })
    })
}

function canMoveLeft(board) {
    for (var row = 0; row < 4; row++) {
        for (var col = 1; col < 4; col++) {
            if ((board[row][col] != 0) && (board[row][col - 1] == 0 || board[row][col] == board[row][col - 1])) {
                return true;
            }
        }
    }
    return false;
}

function canMoveRight(board) {
    for (let row = 0; row < 4; row++) {
        for (let col = 2; col >= 0; col--) {
            if ((board[row][col] != 0) && (board[row][col + 1] == 0 || board[row][col] == board[row][col + 1])) {
                return true;
            }
        }
    }
    return false;
}

function canMoveUp(board) {
    for (var col = 0; col < 4; col++) {
        for (var row = 1; row < 4; row++) {
            if ((board[row][col] != 0) && (board[row - 1][col] == 0 || board[row - 1][col] == board[row][col])) {
                return true;
            }
        }
    }
    return false;
}

function canMoveDown(board) {
    for (var col = 0; col < 4; col++) {
        for (var row = 2; row >= 0; row--) {
            if ((board[row][col] != 0) && (board[row + 1][col] == 0 || board[row + 1][col] == board[row][col])) {
                return true;
            }
        }
    }
    return false;
}

function hasHorizontalSpace (row, startCol, endCol, board) {
    for (let colIndex = startCol + 1; colIndex < endCol; colIndex++) {
        if (board[row][colIndex] != 0) {
            return false;
        }
    }
    return true;
}

function hasVerticalSpace (col, startRow, endRow, board) {
    for (let rowIndex = startRow + 1; rowIndex < endRow; rowIndex++) {
        if (board[rowIndex][col] != 0) {
            return false;
        }
    }
    return true;
}

function canMove (board) {
    if (canMoveUp(board) || canMoveDown(board) || canMoveLeft(board) || canMoveRight(board)) {
        return true;
    }
    return false;
}

// unstable
function updateHighestScore (score) {
    const highestScore = $.cookie('highestScore');
    if (highestScore && highestScore < score) {
        // console.log(highestScore);
        // console.log(score);
        // console.log(highestScore && highestScore < score);
        $.cookie('highestScore', `${score}`, { expires: 7, path: '/' });
        return;
    }
    $.cookie('highestScore', `${score}`, { expires: 7, path: '/' });
}

function getHighestScore () {
    const highestScore = $.cookie('highestScore');
    if (highestScore) {
        return highestScore;
    }
    return null;
}

function previousStep () {
    if (stepCount > 0) {
        board = cloneBoard(steps[--stepCount].board);
        score = steps[stepCount].score;
        steps.pop();
        renderBoardView();
        renderScore(score);
    }
}

function cloneBoard (board) {
    let target = [];
    board.forEach((rows, row) => {
        target[row] = [];
        rows.forEach((num, col) => {
            target[row][col] = num;
        })
    })
    return target;
}