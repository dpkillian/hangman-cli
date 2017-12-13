var prompt = require('prompt');
var letter = {
    properties: {
      letterGuess: {
        pattern: /[a-zA-Z]{1}/,
        message: "Name must be a single letter only!",
        required: true
      }
    }
  };
 
  // 
  // Start the prompt 
  // 
  prompt.start();
 
  // 
  // Get two properties from the user: email, password 
  // 
  prompt.get(letter, function (err, result) {
    // 
    // Log the results. 
    // 
    if (err) throw err;
    console.log("Command-line input received:");
    console.log("  Letter chosen: " + result.letterGuess.charAt(0));
  });