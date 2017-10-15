var showUpDuration = 100;
var motionDuration = 300;
var fadeDuration = 700;

function renderScore(score) {
    // Need to be improved by using animation
    updateHighestScore(score);
    $('#score').text(score);
}

function showNum(row, col, num) {
    $('#num-cell-' + row + '-' + col).css({
        backgroundColor: getBackgroundColor(num),
        color: getFontColor(num),
        fontSize: getFontSize(num),
        lineHeight: cellSideLength + 'px'
    }).text(num).animate({
        width: cellSideLength,
        height: cellSideLength,
        top: getPos(row),
        left: getPos(col)
    }, showUpDuration);
}

function motionAnimation(fromRow, fromCol, toRow, toCol) {
    $('#num-cell-' + fromRow + '-' + fromCol).animate({
        top: getPos(toRow),
        left: getPos(toCol)
    }, motionDuration);
}