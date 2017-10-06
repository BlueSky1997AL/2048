const gridContainerWidth = 500;
const cellSideLength = 100;
const cellSpace = 20;

let board = [];
let conflict = [];
let score = 0;

$(function () {
    init();
})

function init () {
    for (let i = 0; i < 4; i++) {
        board[i] = [];
        conflict[i] = [];
        for (let j = 0; j < 4; j++) {
            board[i][j] = 0;
            conflict[i][j] = false;
            $('#grid-container').append(`<div class="grid-cell" id="grid-cell-${i}-${j}"></div>`);
            $(`#grid-cell-${i}-${j}`).css({
                top: getPos(i),
                left: getPos(j)
            })
        }
    }

    //#region Test Array
    board = [
        [0, 2, 4, 8],
        [16, 32, 64, 128],
        [256, 512, 1024, 2048],
        [4096, 8192, 0, 0]
    ];
    //#endregion

    renderBoardView();
}

function renderBoardView () {
    $('.num-cell').remove();
    board.forEach((value, index) => {
        value.forEach((v, i) => {
            $('#grid-container').append(`<div class="num-cell" id="num-cell-${index}-${i}"></div>`);
            const numCell = $(`#num-cell-${index}-${i}`);
            if (v == 0) {
                numCell.css({
                    height: '0px',
                    width: '0px',
                    top: getPos(index) + cellSideLength / 2,
                    left: getPos(i) + cellSideLength / 2
                })
            } else {
                const styleObj = getStyle(v);
                numCell.css({
                    height: cellSideLength,
                    width: cellSideLength,
                    top: getPos(index),
                    left: getPos(i),
                    backgroundColor: styleObj['backgroundColor'],
                    color: styleObj['color'],
                    fontSize: styleObj['fontSize'],
                    lineHeight: `${cellSideLength}px`
                });
                numCell.text(v);
            }
            conflict[index][i] = false;
        })
    })
}