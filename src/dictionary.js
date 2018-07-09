const readWords = require('./word-reader.js')

class Dictionary {
	static getWord() {
		return readWords({path:'./assets/es-ES.dic'})
			.then(totalWords => {
			  const index =  Math.floor(Math.random() * (totalWords.length + 1));
			  return totalWords[index];
			})
	}
	static getWordParams({difficulty = 'easy', includePunctuation = 'false'}) {
		return readWords({path:'./assets/es-ES.dic'})
			.then(totalWords => {
			  const index =  Math.floor(Math.random() * (totalWords.length + 1));	
				const word = totalWords[index];
			if(includePunctuation == 'false')
				if(word.match(/[áéíóúÁÉÍÚÓ]/gi).length > 0)
				{
					console.log(word)
					this.getWordParams({difficulty, includePunctuation})
				}
				else
					return word;
			return word;
				//return this.getWordDifficulty(difficulty, includePunctuation,  totalWords[index])
			})
	}
	static getWordDifficulty(difficulty, includePunctuation, word) {
		if(includePunctuation)
		{
			if(this.getPunctuation(word) > 0) 
				this.getWordParams(difficulty, includePunctuation)
			else return word;
		}
/*			if(difficulty === 'super-easy')
			{
				if(word.length < 5) return word; 
				else this.getWordParams({difficulty, includePunctuation})
			}		
			else if(difficulty === 'easy')
			{
					if(word.length > 4 && word.length < 8) return word; 
					else this.getWordParams({difficulty, includePunctuation})
			}	
			else
			if(word.length > 7)
			{
				  console.log('*******************' + word.length)
				  return word;
			}	*/	
	}
}

module.exports = Dictionary;