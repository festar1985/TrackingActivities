const Hangman = function (word, failAttempts) {
  this.word = word;
  this.failedAttempts = failAttempts;
};

const game1 = new Hangman("planet", 3);
const game2 = new Hangman("illigal", 5);

console.log(game1);
console.log(game2);
