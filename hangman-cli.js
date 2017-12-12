// Load the NPM Package inquirer
var inquirer = require("inquirer");

// Create a "Prompt" with a series of questions.
inquirer
  .prompt([
    // Here we create a basic text prompt.
    {
      type: "input",
      message: "Please enter a guess (letters a thru z):",
      name: "guess"
    }

  ])
  .then(function(inquirerResponse) {
    
 	var guessedLetter = inquirerResponse.guess;

  console.log("This is the letter you guessed: " + guessedLetter);

  });