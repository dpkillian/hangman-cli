// Link to the npm inquirer package
var inquirer 			= require("inquirer");

// Link to local Contructor resources
var wordList 			= require("./game.js");
var lettersToDisplay 	= require("./letter.js");
var checkLetter			= require("./word.js");

//  Global arrays for keeping track of guessed letters and corrent letters; and to check against the alphabet
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
		// parsedisplay is a method within letterstodisplay that determines which letters to show or hide
		displayHangman.parseDisplay();
		console.log("Guesses Remaining: " + game.guessesRemaining);
		// function call to request input from the user
		promptUser();
	}
};


// promptuser first checks to see if there are any remaining guesses left;
// then it calls inquirer to prompt the user for a letter...finally it does
// the conditional checks to see of the user input (inputLetter) is in alphabet, 
// or if it was already guessed...if neither is true, it will push that
// value to the lettersGuess array.
// One final check to see if the letter exists in the word, if so it will
// create a new instance of the display word (displayHangman), with the
// newly guessed letter display via "parseDisplay" method in lettersToDisplay
// contructor. 
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

		// in case shift or keylock is pressed, this takes input and converts to lower case
		var inputLetter = userInput.letter.toLowerCase();

		// test to see if input is a valid letter
		if(alphabet.indexOf(inputLetter) === -1){
			console.log(inputLetter + " is not a letter.  Try again...");
			console.log("Guesses remaining: " + game.guessesRemaining);
			console.log("Letters guessed: " + lettersGuessed);
			console.log("\n--------------------------------------");
			promptUser();
		// otherwise, test to see is input is in the alphabet and is in letters already guessed
		// if both true, then user needs to guess again
		} else if(alphabet.indexOf(inputLetter) != -1 && lettersGuessed.indexOf(inputLetter) != -1){
			console.log("You already guessed " + inputLetter + ". Try again...");
			console.log("Guesses remaining: " + game.guessesRemaining);
			console.log("Letters guessed: " + lettersGuessed);
			console.log("\n--------------------------------------");
			promptUser();	
		// this is the final condition; if input is valid and not already-guess; this
		// path pushes the input/guess to the "lettersGuessed" and if the letter is in the
		// word, it will push to the "lettersCorrect" array, and then calls
		// parseDisplay method to display the new hangman object/word to the screen
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
					console.log("\n--------------------------------------");
					promptUser();			
				}

		// if the letter wsn't guessed, but incorrect, it subtracts a guess from
		// guesses remaining and asks the user for another input
		} else {
			game.guessesRemaining--;

			displayHangman.parseDisplay();
			console.log("Guesses remaining: " + game.guessesRemaining);
			console.log("Letters guessed: " + lettersGuessed);
			console.log("\n--------------------------------------");
			promptUser();						
			}
		}	
	
	});

// if guessesremaing reaches 0, then the game over message appears along with the 
// current word, so the user can see which word was chosen.
} else {

	console.log("Sorry!  You ran out of guesses...");
	console.log("The word you were trying to uncover was: " + game.currentWord + ".");
	console.log("\n--------------------------------------");
}

}

game.startGame();