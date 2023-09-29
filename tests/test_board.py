import unittest

from modules.board import Board


class TestBoard(unittest.TestCase):

    def setUp(self):
        self.board = Board()
        self.board.configure(
            id="testID",
            board=[0] * 64,
            turn=1,
            player1="player1",
            player2="player2"
        )

    def test_incorrect_move(self):
        self.board.turn = 1
        self.assertEqual(self.board.move("player1", 0, 9), False,
                         "Should return False if move is invalid")

    def test_correct_move(self):
        self.board.turn = 1
        self.board.board[9] = 1
        self.assertEqual(self.board.move("player1", 9, 18), True,
                         "Should return True if move is valid")

    def test_incorrect_capture(self):
        self.board.turn = 1
        a = self.board.board.copy()
        self.board.move("player1", 8, 26)
        self.assertEqual(a, self.board.board, "Should not make move")

    def test_correct_capture(self):
        self.board.board[9] = 1
        self.board.board[18] = -1
        self.board.turn = 1
        print(self.board.board)
        self.assertEqual(self.board.move("player1", 9, 27), True,
                         "Should return True if capture is valid")
        print(self.board.board)
        self.assertEqual(self.board.board[18], 0, "Should be 0 after capture")

    def test_incorrect_queen_movement(self):
        self.board.turn = 1
        self.board.board[56] = 2
        self.assertEqual(self.board.move("player1", 56, 0), False,
                         "Should return False if queen movement is invalid")

    def test_pawn_promotion(self):
        self.board.turn = 1
        self.board.board[54] = 1
        self.board.move("player1", 54, 63)
        self.assertEqual(self.board.board[63], 2,
                         "Should be 2 (queen) after pawn reaches other end.")

    def test_player_2(self):
        self.board.turn = 2
        self.board.board[18] = -1
        self.assertEqual(self.board.move("player2", 18, 9), True,
                         "Should return True if move is valid")

    def test_multi_capture(self):
        self.board.turn = 1
        self.board.board[9] = 1
        self.board.board[18] = -1
        self.board.board[34] = -1
        self.assertEqual(self.board.move("player1", 9, 41), True,
                         "Should return True if capture is valid")


if __name__ == '__main__':
    unittest.main()
