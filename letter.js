
var lettersToDisplay = function(word, correctGuesses){
	this.gameWord = word;
	this.goodLetters = correctGuesses;
	this.displayText = "";
	this.winner = false;
	// parseDisplay function displays dashes or letters on screen by
	// examining the contents of the correct guesses array.
	this.parseDisplay = function(){
		var shown = "";

		// if there are no correct guesses, "_" will be displayed
		// for each letter
		if(this.goodLetters === undefined){
			for(var i = 0; i < this.gameWord.length; i++){
				shown += " _ ";
			}
		// otherwise, 2 (recursive) loops increment thru each letter in the chosen word
		// and search for a match (letterWasFound.  If there is a match
		// the letter is displayed, otherwise a "_" is displayed
		} else {

			for(var i = 0; i < this.gameWord.length; i++){
				var letterWasFound = false;
				for(var j = 0; j < this.goodLetters.length; j++){
					if(this.gameWord[i] === this.goodLetters[j]){
						shown += this.goodLetters[j];
						letterWasFound = true;
					}
				}

				if(!letterWasFound){
					shown += " _ ";
				}
			}

		}

		// removes the space at the beginning and end of the text
		this.displayText = shown.trim();
		console.log(this.displayText);

		// this conditional tests for a word match (to see if all of the combined
		// guesses match the chosen word), if so, the user wins!
		if(this.displayText === this.gameWord){
			this.winner = true;
		}
	}
};

module.exports = lettersToDisplay;