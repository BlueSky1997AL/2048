function getPos(p) {
    return p * (cellSideLength + cellSpace) + cellSpace;
}

function getStyle(num) {
    const largeNum = cellSideLength * 0.6;
    const mediumNum = cellSideLength * 0.5;
    const smallNum = cellSideLength * 0.4;
    switch (num) {
        case 2: return { backgroundColor: '#eee4da', fontSize: largeNum, color: '#776e65' }; break;
        case 4: return { backgroundColor: '#ede0c8', fontSize: largeNum, color: '#776e65' }; break;
        case 8: return { backgroundColor: '#f2b179', fontSize: largeNum, color: 'white' }; break;
        case 16: return { backgroundColor: '#f59563', fontSize: largeNum, color: 'white' }; break;
        case 32: return { backgroundColor: '#f67c5f', fontSize: largeNum, color: 'white' }; break;
        case 64: return { backgroundColor: '#f65e3b', fontSize: largeNum, color: 'white' }; break;
        case 128: return { backgroundColor: '#edcf72', fontSize: mediumNum, color: 'white' }; break;
        case 256: return { backgroundColor: '#edcc61', fontSize: mediumNum, color: 'white' }; break;
        case 512: return { backgroundColor: '#9c0', fontSize: mediumNum, color: 'white' }; break;
        case 1024: return { backgroundColor: '#33b5e5', fontSize: smallNum, color: 'white' }; break;
        case 2048: return { backgroundColor: '#09c', fontSize: smallNum, color: 'white' }; break;
        case 4096: return { backgroundColor: '#a6c', fontSize: smallNum, color: 'white' }; break;
        case 8192: return { backgroundColor: '#93c', fontSize: smallNum, color: 'white' }; break;
        default: return { backgroundColor: 'black', fontSize: smallNum, color: 'white' }; break;
    }
}
