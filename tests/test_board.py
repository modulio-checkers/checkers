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
        self.assertEqual(self.board.move("player1", 9, 27), True,
                         "Should return True if capture is valid")
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
        self.assertEqual(self.board.board[9], -1, "Should be -1 after move")

    def test_double_capture(self):
        self.board.turn = 1
        self.board.board[9] = 1
        self.board.board[18] = -1
        self.board.board[34] = -1
        self.assertEqual(self.board.move("player1", 9, 41), True,
                         "Should return True if capture is valid")
        self.assertEqual(self.board.board[18], 0, "Should be 0 after capture")
        self.assertEqual(self.board.board[34], 0, "Should be 0 after capture")
        self.assertEqual(self.board.board[41], 1, "Should be 1 after capture")

    def test_correct_queen_move(self):
        self.board.turn = 1
        self.board.board[56] = 2
        self.assertEqual(self.board.move("player1", 56, 63), True,
                         "Should return True if queen movement is valid")
        self.assertEqual(self.board.board[63], 2, "Should be 2 after move")

    def test_multi_single_capture(self):
        self.board.turn = 1
        self.board.board[11] = 1
        self.board.board[18] = -1
        self.board.board[20] = -1
        self.assertEqual(self.board.move("player1", 11, 29), True,
                         "Should return True if capture is valid")
        self.assertEqual(self.board.board[18], -1, "Should be -1 after capture")
        self.assertEqual(self.board.board[20], 0, "Should be 0 after capture")
        self.assertEqual(self.board.board[29], 1, "Should be 1 after capture")

    def test_triple_capture(self):
        self.board.turn = 1
        self.board.board[0] = 1
        self.board.board[9] = -1
        self.board.board[27] = -1
        self.board.board[27 + 18] = -1
        self.assertEqual(self.board.move("player1", 0, 27 + 18 + 9), True,
                         "Should return True if capture is valid")
        self.assertEqual(self.board.board[0], 0, "Should be 0 after capture")
        self.assertEqual(self.board.board[27], 0, "Should be 0 after capture")
        self.assertEqual(self.board.board[27 + 18], 0, "Should be 0 after capture")
        self.assertEqual(self.board.board[27 + 18 + 9], 1, "Should be 1 after capture")

    def test_corner_capture(self):
        self.board.turn = 1
        self.board.board[0] = 1
        self.board.board[9] = -1
        self.assertEqual(self.board.move("player1", 0, 18), True,
                         "Should return True if capture is valid")
        self.assertEqual(self.board.board[0], 0, "Should be 0 after capture")
        self.assertEqual(self.board.board[9], 0, "Should be 0 after capture")
        self.assertEqual(self.board.board[18], 1, "Should be 1 after capture")

    def test_triple_capture_with_turns(self):
        self.board.turn = 1
        self.board.board[0] = 1
        self.board.board[9] = -1
        self.board.board[9 + 18] = -1
        self.board.board[9 + 18 + 9 + 7] = -1
        self.assertEqual(self.board.move("player1", 0, 9 + 18 + 9 + 7 + 7), True,
                         "Should return True if capture is valid")
        self.assertEqual(self.board.board[0], 0, "Should be 0 after capture")
        self.assertEqual(self.board.board[9], 0, "Should be 0 after capture")
        self.assertEqual(self.board.board[9 + 18], 0, "Should be 0 after capture")
        self.assertEqual(self.board.board[9 + 18 + 9 + 7], 0, "Should be 0 after capture")
        self.assertEqual(self.board.board[9 + 18 + 9 + 7 + 7], 1, "Should be 1 after capture")


if __name__ == '__main__':
    unittest.main()
