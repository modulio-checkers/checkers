const socket = io();
let server_ready_registered = false;
let board_update_registered = false;
let update_metadata_registered = false;

function register_server_ready(callback) {
    /*
    Register a callback to be called when the server is ready to start the game.
    The callback will be called with no arguments.
     */
    socket.once("ready_server", callback);
    server_ready_registered = true;
}

function register_update_board(callback) {
    /*
    Register a callback to be called when the server sends an update to the board.
    The callback will be called with *one argument*, which is a dict containing the following keys:
    {
        turn: 1 or 2, indicating which player's turn it is
        board: a list with 64 numbers
    }
     */
    socket.on("update_board", callback);
    board_update_registered = true;
}

function register_update_metadata(callback) {
    /*
    Update the metadata of the game.
    Will be called when a second player joins, but is not ready yet.
    Callback will be called with no arguments.
     */
    socket.on("update_metadata", (data) => {
        player1 = data.player1;
        player2 = data.player2;
        callback();
    });
    update_metadata_registered = true;
}

function ready() {
    /*
    Tell the server that this client is ready to start the game.
    This must be called after registering callbacks.
    After both players have called ready(), the server will send ready_server and update the board.
     */
    if (!server_ready_registered || !board_update_registered || !update_metadata_registered) {
        throw new Error("Callbacks must be registered before calling ready()");
    }
    socket.emit("ready", {gameId: gameId});
}

function move(from, to) {
    /*
    Tell the server that this client wants to move a checker.
    from and to are integers between 0 and 63, inclusive.

    If the move is invalid, the update will contain the previous board state.
     */
    socket.emit("move", {gameId: gameId, from: from, to: to});
}



