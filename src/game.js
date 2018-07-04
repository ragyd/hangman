const fs = require('fs');
let gameMap = new Map();
class Game {
	constructor(data){
		this.id = data.id;
		this.hint = data.hint;
		this.leftAttempts = data.leftAttempts;
		this.image = data.image;
	}
	static create() {
		return new Promise((resolve, reject) => {
		let idGenerated = Math.floor(Math.random() * 10000);
		let newGame = new Game({
			id: idGenerated,
			hint: '_ _ _ _ O',
			leftAttempts: 3
		});
		/*let newGame = {
			id: idGenerated,
			hint: '_ _ _ _ O',
			leftAttempts: 3
		};*/
		gameMap.set(idGenerated, newGame);
		console.log(gameMap);
		//console.log(JSON.stringify(map_to_object(gameMap)));
		fs.appendFile("./assets/saved-games.json", ',\n' + JSON.stringify(newGame, null, 2),
		//fs.writeFile("./assets/saved-games.json", ',\n' + mapToObject(gameMap),
		function (err) {
			if (err) {
				return console.log(err);
			}
			console.log("The game was saved!");
		});		
		newGame.printInformation()		
			return resolve(newGame)
		})
	}
	map_to_object(map) {
		const out = Object.create(null)
		map.forEach((value, key) => {
		  if (value instanceof Map) {
			out[key] = map_to_object(value)
		  }
		  else {
			out[key] = value
		  }
		})
		return out
	}
	printInformation(){			
		console.log('ID: ' + this.id	
					+ '\nHint: ' + this.hint 
					+ '\nLeft Attempts: ' + this.leftAttempts 
					+ '\nImage:\n' + this.image);
	}	
}

module.exports = Game