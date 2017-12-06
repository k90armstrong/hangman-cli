// this constructor will create an object that will be used
// to hold the state of a letter in a Word obj.  It has a method
// to change what is displayed in the terminal 
function Letter(letter) {
    var self = this;
    if (isNaN(letter) === true) {
        self.letter = letter.toLowerCase();
    } else {
        self.letter = letter;
    }
    self.isShown = false;
    self.displayed = '_'
    self.showLetter = function () {
        self.displayed = self.letter;
        self.isShown = true;
    }
}

// export the constructor
module.exports = Letter;