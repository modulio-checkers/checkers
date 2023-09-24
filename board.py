import uuid
import random


class Move:
    def __init__(self, start: int, end: int):
        """
        :param start: The index of the piece to be moved
        :param end: The index of the space to move the piece to
        """
        self.start = start
        self.end = end


class Board:
    def __init__(self):
        """
        Initializes the board to the default configuration.
        """
        self.board = default_board_setup()
        self.id = str(uuid.uuid4())

        self.player1 = None
        self.player2 = None

        self.turn = 1  # 1 - player 1, 2 - player 2
        self.moves = []

    def configure(self, id: str, board: list, turn: int, player1: str, player2: str):
        """
        Initializes the board to the given configuration.
        :param board: The board configuration
        :param turn: The turn number
        :param player1: The id of player 1
        :param player2: The id of player 2
        :param id: The id of the board
        """
        self.board = board
        self.turn = turn
        self.player1 = player1
        self.player2 = player2
        self.id = id

    def set_first_player(self, player_id: str):
        """
        Sets the first player.
        :param player_id: The player's id
        :return:
        """
        if random.randint(0, 1) == 0:
            self.player1 = player_id
            return
        self.player2 = player_id

    def is_full(self):
        """
        Checks if the board is full.
        :return: True if the board is full, False otherwise
        """
        return self.player1 is not None and self.player2 is not None

    def set_last_player(self, player_id: str):
        """
        Sets the last player.
        :param player_id: The player's id
        :return:
        """
        if self.player1 is None:
            self.player1 = player_id
            return
        self.player2 = player_id

    def is_player(self, player_id: str):
        """
        Checks if the player is in the game.
        :param player_id: The player's id
        :return: True if the player is in the game, False otherwise
        """
        return self.player1 == player_id or self.player2 == player_id


def default_board_setup():
    """
    Sets up the default board configuration for checkers.
    1 - Player 1's piece, 2 - queen
    -1 - Player 2's piece, -2 - queen
    0 - empty space
    :return: 64 element list representing the board
    """
    return [1, 0, 1, 0, 1, 0, 1, 0,
            0, 1, 0, 1, 0, 1, 0, 1,
            1, 0, 1, 0, 1, 0, 1, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            -1, 0, -1, 0, -1, 0, -1, 0,
            0, -1, 0, -1, 0, -1, 0, -1,
            -1, 0, -1, 0, -1, 0, -1, 0]


def validate_move(old_board, move: Move):
    """
    Validates a move for a player.
    :param old_board: The board before the move
    :param move: The move to be validated
    :return:
    """
    pass
