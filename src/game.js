const fs = require('fs');
let listGame = [];
let idLast = 1;
class Game {
	constructor(data){
		this.id = data.id;
		this.hint = data.hint;
		this.leftAttempts = data.leftAttempts;
		this.image = data.image;
	}
	static create() {
		return new Promise((resolve, reject) => {
		const objectGame = Object.create(null)
		//let idGenerated = Math.floor(Math.random() * 10000);
		let idGenerated = idLast;
		idLast++;
		let newGame = {
			id: idGenerated,
			hint: '_ _ _ _ A',
			leftAttempts: 5
		};
		objectGame[idGenerated.toString()] = newGame;
		listGame.push(objectGame);
		console.log(listGame);
		fs.writeFile("./assets/saved-games.json", JSON.stringify(listGame, null, 2),
		function (err) {
			if (err) {
				return console.log(err);
			}
			console.log("The game was saved!");
		});
			return resolve(newGame)
		})
	}	
}

module.exports = Game