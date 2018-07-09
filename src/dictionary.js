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
			let words = [];
			if(includePunctuation == 'false')
			{
				if(difficulty == 'super-easy')
					words = totalWords.filter(word => {
						return ((word.match(/[áéíóúÁÉÍÚÓ]/ig) || []).length == 0) && word.length <= 5
					});
				if(difficulty == 'easy')
					words = totalWords.filter(word => {
						return ((word.match(/[áéíóúÁÉÍÚÓ]/ig) || []).length == 0) && word.length > 5 && word.length <= 8
					});
				if(difficulty == 'hard')
					words = totalWords.filter(word => {
						return ((word.match(/[áéíóúÁÉÍÚÓ]/ig) || []).length == 0) && word.length > 8
					});
			}
			else{
				if(difficulty == 'super-easy')
					words = totalWords.filter(word => {
						return word.length <= 5
					});
				if(difficulty == 'easy')
					words = totalWords.filter(word => {
						return word.length > 5 && word.length <= 8
					});
				if(difficulty == 'hard')
					words = totalWords.filter(word => {
						return word.length > 8
					});	
			}
			const index =  Math.floor(Math.random() * (words.length + 1));	
			return words[index];				
			})
	}
}

module.exports = Dictionary;