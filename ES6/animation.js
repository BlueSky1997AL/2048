const showUpDuration = 100;
const motionDuration = 300;
const fadeDuration = 700;

function renderScore (score) {
    // Need to be improved by using animation
    updateHighestScore(score);
    $('#score').text(score);
}

function showNum (row, col, num) {
    $(`#num-cell-${row}-${col}`)
        .css({
            backgroundColor: getBackgroundColor(num),
            color: getFontColor(num),
            fontSize: getFontSize(num),
            lineHeight: `${cellSideLength}px`
        })
        .text(num)
        .animate({
            width: cellSideLength,
            height: cellSideLength,
            top: getPos(row),
            left: getPos(col)
        }, showUpDuration)
}

function motionAnimation (fromRow, fromCol, toRow, toCol) {
    $(`#num-cell-${fromRow}-${fromCol}`).animate({
        top: getPos(toRow),
        left: getPos(toCol)
    }, motionDuration)
}