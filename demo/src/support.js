document_width = window.screen.availWidth;
grid_container_width = 0.92 * document_width;
cell_side_length = 0.18 * document_width;
cell_space = 0.04 * document_width;

function get_pos_top(i, j) {
	return cell_space + i * (cell_space + cell_side_length);
}

function get_pos_left(i, j) {
	return cell_space + j * (cell_space + cell_side_length);
}

function get_number_background_color(number) {
	switch (number) {
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
	}
	return 'black';
}

function get_number_color(number) {
	if (number <= 4)
		return '#776e65';
	return 'white';
}

function nospace(board) {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (board[i][j] == 0) {
				return false;
			}
		}
	}
	return true;
}

function can_move_left(board) {
	for (var i = 0; i < 4; i++) {
		for (var j = 1; j < 4; j++) {
			if (board[i][j] != 0) {
				if (board[i][j - 1] == 0 || board[i][j] == board[i][j - 1]) {
					return true;
				}
			}
		}
	}
	return false;
}

function can_move_right(board) {
	for (var i = 0; i < 4; i++) {
		for (var j = 2; j >= 0; j--) {
			if (board[i][j] != 0) {
				if (board[i][j + 1] == 0 || board[i][j] == board[i][j + 1]) {
					return true;
				}
			}
		}
	}
	return false;
}

function can_move_up(board) {
	for (var j = 0; j < 4; j++) {
		for (var i = 1; i < 4; i++) {
			if (board[i][j] != 0) {
				if (board[i - 1][j] == 0 || board[i - 1][j] == board[i][j]) {
					return true;
				}
			}
		}
	}
	return false;
}

function can_move_down(board) {
	for (var j = 0; j < 4; j++) {
		for (var i = 2; i >= 0; i--) {
			if (board[i][j] != 0) {
				if (board[i + 1][j] == 0 || board[i + 1][j] == board[i][j]) {
					return true;
				}
			}
		}
	}
	return false;
}

function no_block_horizontal(row, col1, col2, board) {
	for (var i = col1 + 1; i < col2; i++) {
		if (board[row][i] != 0) {
			return false;
		}
	}
	return true;
}

function no_block_vertical(col, row1, row2, board) {
	for (var i = row1 + 1; i < row2; i++) {
		if (board[i][col] != 0) {
			return false;
		}
	}
	return true;
}

function nomove(board) {
	if (can_move_down(board) || can_move_up(board) || can_move_right(board) || can_move_left(board)) {
		return false;
	}
	return true;
}