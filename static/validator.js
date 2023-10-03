/*
Important! This is all written in ES5 and should be written in ES5 due to js2py limitations.
ES6 transpilation doesn't really work on this, so it has to be ES5.
 */
function sign(n) {
    return n === 0 ? 0 : n > 0 ? 1 : -1;
}

function calculate_possible_moves(board, player) {
    /*
    Calculate all possible moves for a checker.
    board is a list of 64 numbers.
    player is 1 or 2
    from is an integer between 0 and 63, inclusive.
    Returns a list of integers between 0 and 63, inclusive.
    1 - player 1's checker, 2 player 1's queen
    -1 - player 2's checker, -2 player 2's queen
     */
    const possible_moves = {};
    let is_capture = false;
    for (let i = 0; i < 64; i++) {
        if (board[i] > 0 && player === 1) {
            possible_moves[i] = get_possible_moves(board, i);
        } else if (board[i] < 0 && player === 2) {
            possible_moves[i] = get_possible_moves(board, i);
        }
        for (let j = 0; j < possible_moves[i].moves.length; j++) {
            if (possible_moves[i].moves[j].captured.length > 0) {
                is_capture = true;
            }
        }
        if (is_capture) {
            for (let j = 0; j < possible_moves[i].moves.length; j++) {
                if (possible_moves[i].moves[j].captured.length === 0) {
                    delete possible_moves[i].moves[j];
                }
            }
        }
    }



    return possible_moves;
}

function get_possible_moves(board, from) {
    /*
   Get all possible moves for a checker.
   board is a list of 64 numbers.
   from is an integer between 0 and 63, inclusive.
   Returns a dict with the following keys:
   {
       moves: a list of objects containing the following keys:
       {
           to: where to move, between 0 and 63, inclusive.
           captured: an array of integers between 0 and 63, inclusive, indicating which checkers are captured.
       }
       isCapture: true if there is a capture, otherwise false.
   }
   1 - player 1's checker, 2 player 1's queen
   -1 - player 2's checker, -2 player 2's queen
   Player1 starts from index 0.
    */
    let checked = new Array(64);
    for (let i = 0; i < 64; i++) {
        checked[i] = false;
    }
    let result = {
        moves: [],
        isCapture: false
    };

    search(board.map(function(x) { return x }), from);

    function search(brd, pos, captured) {
        checked[pos] = true;
        let directions;
        let player = brd[pos];
        let queen = Math.abs(player) === 2;
        captured = captured || [];

        if (player > 0) {
            directions = queen ? [-9, -7, 7, 9] : [7, 9];
        } else {
            directions = queen ? [-9, -7, 7, 9] : [-7, -9];
        }

        let captures = [];

        for (let i = 0; i < directions.length; i++) {
            let dir = directions[i];
            let next = pos + dir;
            if (next < 0 || next > 63 || Math.abs(Math.floor(next / 8) - Math.floor(pos / 8)) > 1) {
                continue;
            }

            if (board[next] === 0 && !result.isCapture) {
                result.moves.push({
                    to: next,
                    captured: []
                });
            } else if (sign(board[next]) !== sign(player) && board[next] !== 0) {
                let next2 = next + dir;
                if (next2 < 0 || next2 > 63 ||
                    Math.abs(Math.floor(next2 / 8) - Math.floor(next / 8)) > 1 ||
                    board[next2] !== 0) {
                    continue;
                }

                let capturedCopy = captured.concat([next]);
                captures.push({
                    pos: next2,
                    captured: capturedCopy
                });
            }
        }

        if (captures.length > 0) {
            result.isCapture = true;
            result.moves = [];

            for (let j = 0; j < captures.length; j++) {
                let capture = captures[j];
                if (checked[capture.pos]) continue;
                result.moves.push({
                    to: capture.pos,
                    captured: capture.captured
                });
                // Modify brd
                brd[capture.pos] = brd[pos];
                brd[pos] = 0;
                for (let k = 0; k < capture.captured.length; k++) {
                    brd[capture.captured[k]] = 0;
                }
                search(brd, capture.pos, capture.captured);
            }
        }
    }

    console.log(from, result);
    // If there is at least one capture, remove all non-captures
    if (result.isCapture) {
        let moves = result.moves;
        result.moves = [];
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].captured.length > 0) {
                result.moves.push(moves[i]);
            }
        }
    }
    return result;
}


function validate_move(board, from, to) {
    /*
    Validate a move.
    from and to are integers between 0 and 63, inclusive.
    Returns true if move is valid, otherwise returns false.
     */

    return raw_validate_move(board, from, to) !== board;
}

function raw_validate_move(board, player, from, to) {
    // First, get the possible moves from the start position
    let possibleMoves = get_possible_moves(board, from);

    // Validate player
    console.log(board[from], player);
    if (board[from] < 0 && player !== 2) {
        return board;
    } else if (board[from] > 0 && player !== 1) {
        return board;
    }


    // Find if the requested move is in the possible moves
    let match = null;
    for (let i = 0; i < possibleMoves.moves.length; i++) {
        let m = possibleMoves.moves[i];
        if (m.to === to) {
            match = m;
            break; // Exit the loop once a match is found
        }
    }
    console.log(match);

    // If the move is valid
    if (match != null) {
        // Clone the board state
        let newBoard = board.slice();

        // Do the move
        newBoard[to] = newBoard[from];
        newBoard[from] = 0;

        // If there were any captured pieces, remove them from the board
        if (possibleMoves.isCapture) {
            match.captured.forEach(function (i) {
                newBoard[i] = 0;
            });
        }

        // Check if the piece should be promoted to a queen
        if (Math.abs(newBoard[to]) === 1 &&
            ((newBoard[to] > 0 && to >= 56 && to <= 63) || (newBoard[to] < 0 && to >= 0 && to <= 7))) {
            newBoard[to] *= 2;
        }

        return newBoard;
    }

    // If the move is invalid, return the unchanged board
    return board;
}