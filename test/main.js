const gridContainerWidth = 500;
const cellSideLength = 100;
const cellSpace = 20;

let board = [];
let conflict = [];
let score = 0;

$(function () {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            $('#grid-container').append(`<div class="grid-cell" id="grid-cell-${i}-${j}"></div>`);
        }
    }
    newGame();
})

function newGame () {
    init();
    generateANum();
    generateANum();
}

function init () {
    for (let i = 0; i < 4; i++) {
        board[i] = [];
        conflict[i] = [];
        for (let j = 0; j < 4; j++) {
            board[i][j] = 0;
            conflict[i][j] = false;
            $(`#grid-cell-${i}-${j}`).css({
                top: getPos(i),
                left: getPos(j)
            })
        }
    }

    //#region Test Array
    // board = [
    //     [0, 2, 4, 8],
    //     [16, 32, 64, 128],
    //     [256, 512, 1024, 2048],
    //     [4096, 8192, 16384, 32768]
    // ];
    //#endregion

    renderBoardView();
    score = 0;
    renderScore(score);
}

function renderBoardView () {
    $('.num-cell').remove();
    board.forEach((rows, row) => {
        rows.forEach((num, col) => {
            $('#grid-container').append(`<div class="num-cell" id="num-cell-${row}-${col}"></div>`);
            const numCell = $(`#num-cell-${row}-${col}`);
            if (num == 0) {
                numCell.css({
                    height: '0px',
                    width: '0px',
                    top: getPos(row) + cellSideLength / 2,
                    left: getPos(col) + cellSideLength / 2
                })
            } else {
                numCell
                    .css({
                        height: cellSideLength,
                        width: cellSideLength,
                        top: getPos(row),
                        left: getPos(col),
                        backgroundColor: getBackgroundColor(num),
                        color: getFontColor(num),
                        fontSize: getFontSize(num),
                        lineHeight: `${cellSideLength}px`
                    })
                    .text(num);
            }
            conflict[row][col] = false;
        })
    })
}

function generateANum () {
    if (isNoSpace(board)) {
        return false;
    }
    let row, col;
    let count = 50;
    do {
        row = Math.floor(Math.random() * 4);
        col = Math.floor(Math.random() * 4);
        count--;
    } while (board[row][col] && count)
    if (count == 0 && board[row][col]) {
        board.some((rows, rowIndex) => {
            rows.some((num, colIndex) => {
                if (num == 0) {
                    row = rowIndex;
                    col = colIndex;
                    return true;
                }
            })
        })
    }
    const randNum = Math.random() < 0.5 ? 2 : 4;
    board[row][col] = randNum;
    showNum(row, col, randNum);
    return true;
}

$(document).keydown(function (event) {
    switch (event.keyCode) {
        //left
        case 37: case 65:
            event.preventDefault();
            
            break;
        // up
        case 38: case 87:
            event.preventDefault();
            break;
        // right
        case 39: case 68:
            event.preventDefault();
            break;
        // down
        case 40: case 83:
            event.preventDefault();
            break;
        default:
            break;
    }
})

function moveLeft () {
    if (!canMoveLeft(board)) {
        return false;
    }
    for (let row = 0; row < 4; row++) {
        for (let col = 1; col <4; col++) {
            if (board[row][col] != 0) {
                for (let colIndex = 0; colIndex < col; colIndex++) {
                    if (board[row][colIndex] == 0 && hasHorizontalSpace(row, colIndex, col, board)) {
                        motionAnimation(row, col, row, colIndex);
                        board[row][colIndex] = board[row][col];
                        board[row][col] = 0;
                        break;
                    } else if (board[row][colIndex] == board[row][col] && hasHorizontalSpace(row, colIndex, col, board) && !conflict[row][colIndex]) {
                        motionAnimation(row, col, row, colIndex);
                        board[row][colIndex] += board[row][col];
                        board[row][col] = 0;
                        score += board[row][colIndex];
                        renderScore(score);
                        conflict[row][colIndex] = true;
                        break;
                    }
                }
            }
        }
    }
    setTimeout(function() {
        renderBoardView();
    }, 200);
    return true;
}