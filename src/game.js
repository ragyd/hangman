class Game {
	constructor(data){
		this.id = data.id;
		this.hint = data.hint;
		this.leftAttempts = data.leftAttempts;
		this.image = data.image;
	}
	static create() {
		return new Promise((resolve, reject) => {
		let newGame = new Game({
        id: 2,
        hint: '_ _ _ _ O',
        leftAttempts: 3,
        image: `
 |_____________
 |            | 
 |           ( )
 |            |
 |           /|\\
 |          / | \\
 |            |
 |           / \\
 |          /   \\
 |         /     \\
 |
`
    });
	newGame.printInformation()
		return resolve(newGame)
	})
	}
	printInformation(){			
		console.log('ID: ' + this.id	
					+ '\nHint: ' + this.hint 
					+ '\nLeft Attempts: ' + this.leftAttempts 
					+ '\nImage:\n' + this.image);
	}	
}

module.exports = Game