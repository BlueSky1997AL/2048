var deviceWidth = window.screen.availWidth;
var gridContainerWidth = 0.92 * deviceWidth;
var cellSideLength = 0.18 * deviceWidth;
var cellSpace = 0.04 * deviceWidth;

var board = [];
var conflict = [];
var score = 0;
var steps = [];
var stepCount = -1;
var successFlag = false;
var initflag = 1;

$(function () {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $('#grid-container').append('<div class="grid-cell" id="grid-cell-' + i + '-' + j + '"></div>');
        }
    }
    mobileCompatible();
    if (localStorage.steps && localStorage.highestScore && localStorage.successFlag) {
        init();
        steps = JSON.parse(localStorage.steps);
        stepCount = steps.length - 1;
        switch (localStorage.successFlag) {
            case 'true':
                successFlag = true; break;
            case 'false':
                successFlag = false; break;
            default:
                successFlag = false; break;
        }
        board = cloneBoard(steps[stepCount].board);
        score = steps[stepCount].score;
        renderBoardView();
        renderScore(score);
    } else {
        newGame();
    }
});

function newGame() {
    removeSuccessBox();
    removeFailureBox();
    init();
    generateANum();
    generateANum();
}

function init() {
    for (var i = 0; i < 4; i++) {
        board[i] = [];
        conflict[i] = [];
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
            conflict[i][j] = false;
            $('#grid-cell-' + i + '-' + j).css({
                top: getPos(i),
                left: getPos(j)
            });
        }
    }

    //#region Test Board Array
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
    successFlag = false;
    steps = [];
    stepCount = -1;
    initflag = 1;
}

function renderBoardView() {
    $('.num-cell').remove();
    for (var row = 0; row < 4; row++) {
        for (var col = 0; col < 4; col++) {
            $('#grid-container').append('<div class="num-cell" id="num-cell-' + row + '-' + col + '"></div>');
            var numCell = $('#num-cell-' + row + '-' + col);
            if (board[row][col] == 0) {
                numCell.css({
                    height: '0px',
                    width: '0px',
                    top: getPos(row) + cellSideLength / 2,
                    left: getPos(col) + cellSideLength / 2
                });
            } else {
                numCell.css({
                    height: cellSideLength,
                    width: cellSideLength,
                    top: getPos(row),
                    left: getPos(col),
                    backgroundColor: getBackgroundColor(board[row][col]),
                    color: getFontColor(board[row][col]),
                    fontSize: getFontSize(board[row][col]),
                    lineHeight: cellSideLength + 'px'
                }).text(board[row][col]);
            }
            conflict[row][col] = false;
        }
    }
}

function renderPreviousStepView() {
    $('.num-cell').fadeOut(showUpDuration, function () {
        $(this).remove();
    });
    setTimeout(function () {
        for (var row = 0; row < 4; row++) {
            for (var col = 0; col < 4; col++) {
                $('#grid-container').append('<div class="num-cell" id="num-cell-' + row + '-' + col + '"></div>');
                var numCell = $('#num-cell-' + row + '-' + col);
                if (board[row][col] == 0) {
                    numCell.css({
                        height: '0px',
                        width: '0px',
                        top: getPos(row) + cellSideLength / 2,
                        left: getPos(col) + cellSideLength / 2
                    });
                } else {
                    numCell.css({
                        display: 'none',
                        height: cellSideLength,
                        width: cellSideLength,
                        top: getPos(row),
                        left: getPos(col),
                        backgroundColor: getBackgroundColor(board[row][col]),
                        color: getFontColor(board[row][col]),
                        fontSize: getFontSize(board[row][col]),
                        lineHeight: cellSideLength + 'px'
                    }).text(board[row][col]).fadeIn(showUpDuration);
                }
                conflict[row][col] = false;
            }
        }
    }, showUpDuration + 100);
}

function generateANum() {
    if (isNoSpace(board)) {
        return false;
    }
    var row = void 0,
        col = void 0;
    var count = 50;
    do {
        row = Math.floor(Math.random() * 4);
        col = Math.floor(Math.random() * 4);
        count--;
    } while (board[row][col] && count);
    if (count == 0 && board[row][col]) {
        for (var rowIndex = 0; rowIndex < 4; rowIndex++) {
            for (var colIndex = 0; colIndex < 4; colIndex++) {
                if (board[rowIndex][colIndex] == 0) {
                    row = rowIndex;
                    col = colIndex;
                    return true;
                }
            }
        }
    }
    var randNum = Math.random() < 0.8 ? 2 : 4;
    board[row][col] = randNum;
    if (!initflag) {
        steps[++stepCount] = { board: cloneBoard(board), score: score };
        updateGameDate(steps, stepCount, successFlag);
    }
    if (initflag) {
        initflag--;
    }
    showNum(row, col, randNum);
    return true;
}

function setTimer() {
    setTimeout(function () {
        generateANum();
    }, motionDuration + 10);
    setTimeout(function () {
        isGameOver(board);
    }, motionDuration + showUpDuration + 10);
}

$(document).keydown(function (event) {
    switch (event.keyCode) {
        //left
        case 37: case 65:
            event.preventDefault();
            removeSuccessBox();
            if (moveLeft()) {
                setTimer();
            }
            break;
        // up
        case 38: case 87:
            event.preventDefault();
            removeSuccessBox();
            if (moveUp()) {
                setTimer();
            }
            break;
        // right
        case 39: case 68:
            event.preventDefault();
            removeSuccessBox();
            if (moveRight()) {
                setTimer();
            }
            break;
        // down
        case 40: case 83:
            event.preventDefault();
            removeSuccessBox();
            if (moveDown()) {
                setTimer();
            }
            break;
        default:
            break;
    }
});

function moveLeft() {
    if (!canMoveLeft(board)) {
        return false;
    }
    for (var row = 0; row < 4; row++) {
        for (var col = 1; col < 4; col++) {
            if (board[row][col] != 0) {
                for (var colIndex = 0; colIndex < col; colIndex++) {
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
    setTimeout(function () {
        renderBoardView();
    }, motionDuration);
    return true;
}

function moveRight() {
    if (!canMoveRight(board)) {
        return false;
    }
    for (var row = 0; row < 4; row++) {
        for (var col = 2; col >= 0; col--) {
            if (board[row][col] != 0) {
                for (var colIndex = 3; colIndex > col; colIndex--) {
                    if (board[row][colIndex] == 0 && hasHorizontalSpace(row, col, colIndex, board)) {
                        motionAnimation(row, col, row, colIndex);
                        board[row][colIndex] = board[row][col];
                        board[row][col] = 0;
                        break;
                    } else if (board[row][colIndex] == board[row][col] && hasHorizontalSpace(row, col, colIndex, board) && !conflict[row][colIndex]) {
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
    setTimeout(function () {
        renderBoardView();
    }, motionDuration);
    return true;
}

function moveUp() {
    if (!canMoveUp(board)) {
        return false;
    }
    for (var col = 0; col < 4; col++) {
        for (var row = 1; row < 4; row++) {
            if (board[row][col] != 0) {
                for (var rowIndex = 0; rowIndex < row; rowIndex++) {
                    if (board[rowIndex][col] == 0 && hasVerticalSpace(col, rowIndex, row, board)) {
                        motionAnimation(row, col, rowIndex, col);
                        board[rowIndex][col] = board[row][col];
                        board[row][col] = 0;
                        break;
                    } else if (board[rowIndex][col] == board[row][col] && hasVerticalSpace(col, rowIndex, row, board) && !conflict[rowIndex][col]) {
                        motionAnimation(row, col, rowIndex, col);
                        board[rowIndex][col] += board[row][col];
                        board[row][col] = 0;
                        score += board[rowIndex][col];
                        renderScore(score);
                        conflict[rowIndex][col] = true;
                        break;
                    }
                }
            }
        }
    }
    setTimeout(function () {
        renderBoardView();
    }, motionDuration);
    return true;
}

function moveDown() {
    if (!canMoveDown(board)) {
        return false;
    }
    for (var col = 0; col < 4; col++) {
        for (var row = 2; row >= 0; row--) {
            if (board[row][col] != 0) {
                for (var rowIndex = 3; rowIndex > row; rowIndex--) {
                    if (board[rowIndex][col] == 0 && hasVerticalSpace(col, row, rowIndex, board)) {
                        motionAnimation(row, col, rowIndex, col);
                        board[rowIndex][col] = board[row][col];
                        board[row][col] = 0;
                        break;
                    } else if (board[rowIndex][col] == board[row][col] && hasVerticalSpace(col, row, rowIndex, board) && !conflict[rowIndex][col]) {
                        motionAnimation(row, col, rowIndex, col);
                        board[rowIndex][col] += board[row][col];
                        board[row][col] = 0;
                        score += board[rowIndex][col];
                        renderScore(score);
                        conflict[rowIndex][col] = true;
                        break;
                    }
                }
            }
        }
    }
    setTimeout(function () {
        renderBoardView();
    }, motionDuration);
    return true;
}

function isGameOver(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] == 2048) {
                if (!successFlag) {
                    renderSuccessBox();
                    successFlag = true;
                }
            } else if (isNoSpace(board) && !canMove(board)) {
                renderFailureBox();
            }
        }
    }
}

function mobileCompatible() {
    if (deviceWidth > 500) {
        gridContainerWidth = 500;
        cellSideLength = 100;
        cellSpace = 20;
    }
    $('#grid-container').css({
        width: gridContainerWidth - 2 * cellSpace,
        height: gridContainerWidth - 2 * cellSpace,
        padding: cellSpace,
        borderRadius: 0.02 * gridContainerWidth
    });
    $('.grid-cell').css({
        width: cellSideLength,
        height: cellSideLength,
        borderRadius: 0.02 * gridContainerWidth
    });
    $('.message-box').css({
        width: gridContainerWidth - 2 * cellSpace,
        height: gridContainerWidth - 2 * cellSpace,
        padding: cellSpace,
        borderRadius: 0.02 * gridContainerWidth
    });
    $('.message-box > p').css({
        margin: cellSpace * 0.25 + 'px 0'
    });
}

document.addEventListener('touchstart', function (event) {
    startX = event.touches[0].pageX;
    startY = event.touches[0].pageY;
});

document.addEventListener('touchmove', function (event) {
    event.preventDefault();
});

document.addEventListener('touchend', function (event) {
    endX = event.changedTouches[0].pageX;
    endY = event.changedTouches[0].pageY;
    var triangleX = endX - startX;
    var triangleY = endY - startY;
    if (Math.abs(triangleX) < 0.1 * deviceWidth && Math.abs(triangleY) < 0.1 * deviceWidth) {
        return;
    }
    if (Math.abs(triangleX) >= Math.abs(triangleY)) {
        if (triangleX > 0) {
            if (moveRight()) {
                setTimer();
            }
        } else {
            if (moveLeft()) {
                setTimer();
            }
        }
    } else {
        if (triangleY > 0) {
            if (moveDown()) {
                setTimer();
            }
        } else {
            if (moveUp()) {
                setTimer();
            }
        }
    }
});

function renderSuccessBox() {
    var successMsgBox = $('#success-msg-box');
    if (successMsgBox.css('display') == 'none') {
        $('#success-msg-box #score').text(score);
        if (getHighestScore()) {
            $('#success-msg-box #highest-score').text(getHighestScore());
        } else {
            $('#success-msg-box #highest-score').text(score);
        }
        successMsgBox.fadeIn(fadeDuration);
    }
}

function continueGame() {
    var successMsgBox = $('#success-msg-box');
    if (successMsgBox.css('display') == 'block') {
        successMsgBox.fadeOut(fadeDuration);
    }
}

function renderFailureBox() {
    var failureMsgBox = $('#failure-msg-box');
    if (failureMsgBox.css('display') == 'none') {
        $('#failure-msg-box #score').text(score);
        if (getHighestScore()) {
            $('#failure-msg-box #highest-score').text(getHighestScore());
        } else {
            $('#failure-msg-box #highest-score').text(score);
        }
        failureMsgBox.fadeIn(fadeDuration);
    }
}

function removeSuccessBox() {
    var successMsgBox = $('#success-msg-box');
    if (successMsgBox.css('display') == 'block') {
        successMsgBox.fadeOut(fadeDuration);
    }
}

function removeFailureBox() {
    var failureMsgBox = $('#failure-msg-box');
    if (failureMsgBox.css('display') == 'block') {
        failureMsgBox.fadeOut(fadeDuration);
    }
}