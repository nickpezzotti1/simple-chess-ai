'use strict'

const State = require('./state-c4.js')
const Chess = require("../lib/chessboardjs/js/chess.js")
const ChessHeuristics = require("./chess-heuristics.js")
/** Class representing the game. */
class Game_C4 {

  /** Generate and return the initial game state. */
  start() {
    var chess = Chess.Chess()
    return new State([], chess, 1)
  }

  /** Return the current player's legal plays from given state. */
  legalPlays(state) {
    return state.board.moves()
  }

  /** Advance the given state and return it. */
  nextState(state, play) {
    let newHistory = state.playHistory.slice() // copy
    newHistory.push(play)

    // apply each move in play history to a fresh board
    var newBoard = Chess.Chess();
    for (var i = 0; i < newHistory.length; i++) {
      newBoard.move(newHistory[i])
    }

    // switch player turn
    let newPlayer = -state.player

    return new State(newHistory, newBoard, newPlayer)
  }

  /** Return the winner of the game. */
  winner(state) {
    // TODO filler
    const heur = ChessHeuristics.evaluateBoard(state.board.board());

    if (heur > 4) {
      return 1
    }
    else if (heur < -4){
      return -1;
    } else {
      return null;
    }

  }

}

module.exports = Game_C4
