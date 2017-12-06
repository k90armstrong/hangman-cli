// require the modules
var Word = require('./word');
var inquirer = require('inquirer');

// set up some variables
var words = ["halloween", "christmas", "thanksgiving"];
var currentWordIndex = -1;
var wins = 0;

// create the game constructor
function Game () {
    // properties
    var self = this;

    // functions
    self.makeGuess = function(guess) {
        var isCorrect = self.word.checkGuess(guess);
        if (!isCorrect) {
            // wrong guess
            self.wrongGuesses += 1;
            self.guessesRemaining -= 1;
            if (self.guessesRemaining === 0){
                self.gameOver = true;
                self.win = false;
            } else {
                console.log('\n');            
                console.log('INCORRECT!');
                console.log('You have ' + self.guessesRemaining + ' guesses left!');
                self.word.showLetters();
            }
        } else {
            if (self.word.allIsGuessed()) {
                self.gameOver = true;
                self.win = true;
            } else {
                console.log('\n');            
                console.log('Correct');       
                self.word.showLetters();
            }
            
        }
    }

    self.startGame = function() {
        currentWordIndex += 1;
        // check if index in larger than length of words
        if (currentWordIndex > words.length - 1) {
            // there are no more words
            // end the game
            console.log('No more words left! Thanks for playing!');
        } else {
            self.wrongGuesses = 0;
            self.guessesRemaining = 10;
            self.word = new Word(words[currentWordIndex]);
            self.win = false;
            self.gameOver = false;
            console.log('Here is the word:');
            self.word.showLetters();
            self.askForGuess();
        }
    }

    self.askForGuess = function() {
        console.log('\n');
        inquirer
        .prompt({
          name: "guess",
          type: "input",
          message: "Make a guess: "
        })
        .then(function(answer) {
            self.makeGuess(answer.guess);
            if (self.gameOver) {
                if (self.win) {
                    console.log('You Win!');
                    console.log('The Word is: ');
                    console.log(self.word.word);
                    self.startGame();
                } else {                  
                    console.log('You Lose!');
                    console.log('The Word is: ');
                    console.log(self.word.word);
                    self.startGame();
                }
            } else {
                self.askForGuess();
            }
        });
    }
}

module.exports = Game;