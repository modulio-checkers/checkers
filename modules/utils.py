from modules.board import Board
from json import loads


def board_model_to_board(board_domain) -> Board:
    if board_domain is None:
        return None
    b = Board()
    b.configure(board_domain.id, loads(board_domain.board), board_domain.turn, board_domain.player1,
                board_domain.player2)

    return b
