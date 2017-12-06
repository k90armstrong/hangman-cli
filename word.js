var Letter = require('./letter');

// create the word constructor that will be exported
// this constructor will be create an object that will
// contain all of the logic for the word in the hangman game
// it will contain Letter objects.
function Word(word) {
    // properties
    var self = this;
    self.word = word;
    self.letters = [];

    // functions
    self.createLetters = function () {
        for (var i = 0; i < word.length; i++) {
            var letter = new Letter(word[i]);
            self.letters.push(letter);
        }
    }

    self.showLetters = function () {
        var toShow = '';
        for (var i = 0; i < self.letters.length; i ++) {
            toShow += self.letters[i].displayed;
            toShow += ' ';
        }
        console.log(toShow);
    }

    self.checkGuess = function (guess) {
        var isCorrect = false;
        for (var i = 0; i < self.letters.length; i ++) {
            if (guess === self.letters[i].letter) {
                self.letters[i].showLetter();
                isCorrect = true;
            }
        }
        return isCorrect;
    }

    self.allIsGuessed = function () {
        var output = true;
        for (var i = 0; i < self.letters.length; i ++) {
            if (!self.letters[i].isShown) {
                output = false;
            }
        }
        return output;
    }

    // initialize the letters
    self.createLetters();

}

module.exports = Word;