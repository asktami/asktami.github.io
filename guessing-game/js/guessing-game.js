/*

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/

// Getting a random integer between two values
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

// returns a random number between 1 and 100
// note: generateWinningNumber is a function in the global scope
function generateWinningNumber() {
	return getRandomInt(1, 101);
}

//Use the fisher-yates Shuffle algorithm
// https://bost.ocks.org/mike/shuffle/
// takes an array as an argument, and returns an array
// shuffles an array using Math.random to place elements
function shuffle(array) {
	var m = array.length,
		t,
		i;

	// While there remain elements to shuffle…
	while (m) {
		// Pick a remaining element…
		i = Math.floor(Math.random() * m--);

		// And swap it with the current element.
		t = array[m];
		array[m] = array[i];
		array[i] = t;
	}

	return array;
}

// Game class
// 'should have a playersGuess property, and a pastGuesses property
//playersGuess property is what will hold the player's number guess
//pastGuesses will be an array, and holds all of the player's past guesses
class Game {
	constructor() {
		this.playersGuess = null;
		this.pastGuesses = [];
		this.winningNumber = generateWinningNumber();
	}
}

Game.prototype.difference = function() {
	return Math.abs(this.playersGuess - this.winningNumber);
};

Game.prototype.isLower = function() {
	return this.playersGuess < this.winningNumber;
};

Game.prototype.playersGuessSubmission = function(num) {
	if (typeof num !== 'number' || num < 1 || num > 100) {
		throw 'That is an invalid guess.';
	} else {
		this.playersGuess = num;
		return this.checkGuess();
	}
};

//The last spec specifies that playersGuessSubmission should call checkGuess
//playersGuessSubmission should also return that call, so that the return value of playersGuessSubmissions is the return value of checkGuess.
Game.prototype.checkGuess = function() {
	let feedback = '';

	if (this.difference() < 100) {
		feedback = "You're ice cold!";
	}

	if (this.difference() < 50) {
		feedback = "You're a bit chilly.";
	}

	if (this.difference() < 25) {
		feedback = "You're lukewarm.";
	}

	if (this.difference() < 10) {
		feedback = "You're burning up!";
	}

	if (this.pastGuesses.includes(this.playersGuess)) {
		feedback = 'You have already guessed that number.';
	}

	// if playersGuess isn't the winningNumber or a duplicate, add it to pastGuesses
	if (!feedback.includes('already')) {
		this.pastGuesses.push(this.playersGuess);
	}

	if (this.playersGuess === this.winningNumber) {
		feedback = 'You Win!';
	} else if (this.pastGuesses.length === 5) {
		feedback = 'You Lose.';
	}

	return feedback;
};

// generates an array with a length of 3
// includes the winningNumber
// calls generateWinningNumber to fill the rest of the hint array with random numbers
// calls the shuffle function
Game.prototype.provideHint = function() {
	let arr = [
		this.winningNumber,
		generateWinningNumber(),
		generateWinningNumber()
	];

	return shuffle(arr);
};

// returns an empty, new game instance
function newGame() {
	return new Game();
}
