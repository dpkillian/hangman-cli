
// This is a simple check to see if a letter exists in the word
// that is passed to the function
function checkLetter(letter, word){
	if(word.indexOf(letter) != -1){
		return true;
	} else {

		return false;
	}
}

module.exports = checkLetter;