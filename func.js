function getPos(p) {
    return p * (cellSideLength + cellSpace) + cellSpace;
}

function getBackgroundColor(num) {
    switch (num) {
        case 2:
            return '#eee4da'; break;
        case 4:
            return '#ede0c8'; break;
        case 8:
            return '#f2b179'; break;
        case 16:
            return '#f59563'; break;
        case 32:
            return '#f67c5f'; break;
        case 64:
            return '#f65e3b'; break;
        case 128:
            return '#edcf72'; break;
        case 256:
            return '#edcc61'; break;
        case 512:
            return '#9c0'; break;
        case 1024:
            return '#33b5e5'; break;
        case 2048:
            return '#09c'; break;
        case 4096:
            return '#a6c'; break;
        case 8192:
            return '#93c'; break;
        default:
            return 'black'; break;
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
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] == 0) {
                return false;
            }
        }
    }
    return true;
}

function canMoveLeft(board) {
    for (var row = 0; row < 4; row++) {
        for (var col = 1; col < 4; col++) {
            if (board[row][col] != 0 && (board[row][col - 1] == 0 || board[row][col] == board[row][col - 1])) {
                return true;
            }
        }
    }
    return false;
}

function canMoveRight(board) {
    for (var row = 0; row < 4; row++) {
        for (var col = 2; col >= 0; col--) {
            if (board[row][col] != 0 && (board[row][col + 1] == 0 || board[row][col] == board[row][col + 1])) {
                return true;
            }
        }
    }
    return false;
}

function canMoveUp(board) {
    for (var col = 0; col < 4; col++) {
        for (var row = 1; row < 4; row++) {
            if (board[row][col] != 0 && (board[row - 1][col] == 0 || board[row - 1][col] == board[row][col])) {
                return true;
            }
        }
    }
    return false;
}

function canMoveDown(board) {
    for (var col = 0; col < 4; col++) {
        for (var row = 2; row >= 0; row--) {
            if (board[row][col] != 0 && (board[row + 1][col] == 0 || board[row + 1][col] == board[row][col])) {
                return true;
            }
        }
    }
    return false;
}

function hasHorizontalSpace(row, startCol, endCol, board) {
    for (var colIndex = startCol + 1; colIndex < endCol; colIndex++) {
        if (board[row][colIndex] != 0) {
            return false;
        }
    }
    return true;
}

function hasVerticalSpace(col, startRow, endRow, board) {
    for (var rowIndex = startRow + 1; rowIndex < endRow; rowIndex++) {
        if (board[rowIndex][col] != 0) {
            return false;
        }
    }
    return true;
}

function canMove(board) {
    if (canMoveUp(board) || canMoveDown(board) || canMoveLeft(board) || canMoveRight(board)) {
        return true;
    }
    return false;
}

function updateHighestScore(score) {
    var highestScore = localStorage.highestScore;
    if (highestScore && highestScore < score) {
        localStorage.highestScore = score;
    }
    if (!highestScore) {
        localStorage.highestScore = score;
    }
}

function updateGameDate(steps, stepCount, successFlag) {
    localStorage.steps = JSON.stringify(steps);
    localStorage.successFlag = successFlag;
}

function getHighestScore() {
    var highestScore = localStorage.highestScore;
    if (highestScore) {
        return highestScore;
    }
    return null;
}

function previousStep() {
    if (stepCount > 0) {
        board = cloneBoard(steps[--stepCount].board);
        score = steps[stepCount].score;
        steps.pop();
        renderPreviousStepView();
        renderScore(score);
        updateGameDate(steps, stepCount, successFlag);
    }
}

function cloneBoard(board) {
    var target = [];
    for (var row = 0; row < 4; row++) {
        target[row] = [];
        for (var col = 0; col < 4; col++) {
            target[row][col] = board[row][col]
        }
    }
    return target;
}