const crypto = require('crypto')
const Dictionary = require('./dictionary.js')
const JSONDb = require('./json-db.js')

class Game {
	constructor({word, hint, leftAttempts = 5, difficulty = 'easy', includePunctuation = 'false'} = {}) {
		this.word = word
		this.hint = hint
		this.leftAttempts = leftAttempts
		this.difficulty = difficulty
		this.includePunctuation = includePunctuation
	}

	static create({difficulty, includePunctuation, maxAttempts = 5} = {}) {
		return Dictionary.getWordParams({difficulty, includePunctuation})
			.then(word => {
				const newGame = new Game({
					word: word,
					hint: Game.createHint(word),
					leftAttempts: maxAttempts,
					difficulty: difficulty,
					includePunctuation: includePunctuation
				})
				newGame.id = crypto.randomBytes(12).toString('hex');
				return JSONDb.save(newGame)				
			})
			.then(savedGame => {
				delete savedGame.word
				return savedGame;
			})
	}

	static createHint(word) {
		// TODO replace duplicate characters too in hint
		const wordLength = word.length
		const index = Math.floor(Math.random() * wordLength);
		return Array.from(word).map((ch, i) => i === index ? ch : '_').join(' ')
	}

	static attempt(gameId, attempt) {
		return JSONDb.getGameById(gameId)
			.then(game => {
				if (game.word.includes(attempt.letter)) {
					// TODO udpate hint and save that
					return game;
				}
				if(game.leftAttempts > 0){
						game.leftAttempts--;
						game.isInvalid = true;
				} else {
					game.isGameOver = true;
				}
				return JSONDb.save(game);
			})
			.then(savedGame => {
				delete savedGame.word;
				return savedGame;
			})
			.catch()
	}
}

module.exports = Game

