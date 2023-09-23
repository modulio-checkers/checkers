import flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from board import *
from utils import *
import json


class Base(DeclarativeBase):
    pass


db = SQLAlchemy(model_class=Base)


class BoardModel(db.Model):
    id = db.Column(db.String(36), primary_key=True)
    board = db.Column(db.String(128))
    turn = db.Column(db.Integer)
    player1 = db.Column(db.String(36))
    player2 = db.Column(db.String(36))


app = flask.Flask(__name__)
app.secret_key = 'SECRETKEYDONOTUSEINPRODUCTION'

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db.init_app(app)

with app.app_context():
    db.create_all()


@app.before_request
def add_ident_session():
    """
    Adds a unique identifier to the session. This is used to identify the player.
    :return:
    """
    if 'id' not in flask.session:
        flask.session['id'] = str(uuid.uuid4())


@app.route('/')
def index():
    """
    Redirects to the new game page.
    :return:
    """
    return flask.redirect(flask.url_for('new'))


@app.route('/new')
def new():
    board = Board()
    board.set_first_player(flask.session['id'])

    db.session.add(
        BoardModel(id=board.id, board=json.dumps(board.board), turn=board.turn, player1=board.player1,
                   player2=board.player2))
    db.session.flush()
    db.session.commit()

    return flask.redirect(flask.url_for('game', board=board.id))


@app.route('/game/<string:board>')
def game(board):
    q = db.session.query(BoardModel).filter_by(id=board).first()
    print(q)
    board = board_model_to_board(q)
    print(board)

    if board:
        if not board.is_full() and not board.is_player(flask.session['id']):
            board.set_last_player(flask.session['id'])
            # todo
        return flask.render_template('index.html', board=board)

    return "Error"


if __name__ == '__main__':
    app.run(debug=True)