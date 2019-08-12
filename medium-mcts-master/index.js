'use strict'

const util = require('util')
const Game_C4 = require('./game-c4.js')
const MonteCarlo = require('./monte-carlo.js')

// Setup

let game = new Game_C4()
let mcts = new MonteCarlo(game)

let state = game.start()
let winner = game.winner(state)

while (winner === null) {
	// From initial state, play games until end
	mcts.runSearch(state, 1)
	let play = mcts.bestPlay(state, "robust")
	state = game.nextState(state, play)
	console.log("The best play found is " + play)
	console.log(state.board.ascii())
	winner = game.winner(state)
}

console.log(winner)
