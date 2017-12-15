// Link to the npm inquirer package
var inquirer 			= require("inquirer");

// Link to local Contructor resources
var wordList 			= require("./game.js");
var lettersToDisplay 	= require("./letter.js");
var checkLetter			= require("./word.js");

//  Global variables
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x"
, "y", "z"];
var lettersGuessed = [];
var lettersCorrect = [];
var displayHangman;

// Game object containing values from wordList in game.js file, total guesses allowed and a value for the current word
var game = {

	wordArray: wordList,
	guessesRemaining: 6,
	currentWord: null,

	// startgame function sets guesses, picks a random word from the wordlist and console logs a start message
	startGame: function(){
		this.guessesRemaining = 6;
   		var j = Math.floor(Math.random() * this.wordArray.length);
    	this.currentWord = this.wordArray[j];
		console.log("\n--------------------------------------");
		console.log("Welcome to HangSpider, the CLI version.");
		console.log("Take a guess at the Halloween inspired word...pick a letter (a thru z):");

		// pass current word from game object to lettersToDisplay function
		displayHangman = new lettersToDisplay(this.currentWord);
		displayHangman.parseDisplay();
		console.log("Guesses Remaining: " + game.guessesRemaining);

		promptUser();
	}
};



function promptUser(){
	console.log("");

	if(game.guessesRemaining > 0){
		inquirer.prompt([
		{
			type: "value",
			name: "letter",
			message: "Pick a letter: "
		}
	]).then(function(userInput){

		var inputLetter = userInput.letter.toLowerCase();

		if(alphabet.indexOf(inputLetter) === -1){
			console.log(inputLetter + " is not a letter.  Try again...");
			console.log("Guesses remaining: " + game.guessesRemaining);
			console.log("Letters guessed: " + lettersGuessed);
			promptUser();
		} else if(alphabet.indexOf(inputLetter) != -1 && lettersGuessed.indexOf(inputLetter) != -1){
			console.log("You already guessed " + inputLetter + ". Try again...");
			console.log("Guesses remaining: " + game.guessesRemaining);
			console.log("Letters guessed: " + lettersGuessed);
			promptUser();				
		} else {
			lettersGuessed.push(inputLetter);
			var letterInWord = checkLetter(inputLetter, game.currentWord);

			if(letterInWord){
				lettersCorrect.push(inputLetter);

				displayHangman = new lettersToDisplay(game.currentWord, lettersCorrect);
				displayHangman.parseDisplay();

				if(displayHangman.winner){
					console.log("You won!!!  Nice work!!");
					return;
				} else {
					console.log("Guesses remaining: " + game.guessesRemaining);
					console.log("Letters guessed: " + lettersGuessed);
					promptUser();			
				}


		} else {
			game.guessesRemaining--;

			displayHangman.parseDisplay();
			console.log("Guesses remaining: " + game.guessesRemaining);
			console.log("Letters guessed: " + lettersGuessed);
			promptUser();						
			}
		}	
	
	});

} else {

	console.log("Sorry!  You ran out of guesses...");
	console.log("The word you were trying to uncover was " + game.currentWord + ".");
}

}

game.startGame();