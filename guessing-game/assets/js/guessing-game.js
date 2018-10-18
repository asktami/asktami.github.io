// QUESTIONS: how to reset without reloading?, why can't I get the invalid guess to display if I use throw?,how to disable allowing more guesses once hit 5?

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
		// *** QUESTION - cant use throw and see in feedback!
		return 'That is an invalid guess.';
	} else {
		this.playersGuess = num;
		return this.checkGuess();
	}
};

//The last spec specifies that playersGuessSubmission should call checkGuess
//playersGuessSubmission should also return that call, so that the return value of playersGuessSubmissions is the return value of checkGuess.
Game.prototype.checkGuess = function() {
	let feedback = '';
	let color = 'cold';

	if (this.difference() < 100) {
		feedback = "You're ice cold!";
	}

	if (this.difference() < 50) {
		feedback = "You're a bit chilly.";
	}

	if (this.difference() < 25) {
		feedback = "You're lukewarm.";
		color = 'warm';
	}

	if (this.difference() < 10) {
		feedback = "You're burning up!";
		color = 'warm';
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
		feedback = 'You Lose. The winning number was ' + this.winningNumber + '.';
	}

	// disable more input if have 5 guesses or have won
	if (this.pastGuesses.length === 5 || feedback.includes('won')) {
		// disable
		document.getElementById('player-input').classList.add('disable');
	}

	// *****************
	// dispay feedback in the DOM
	// *****************'
	document.querySelector('#header').innerHTML =
		"<h1 class='display-4'>" + feedback + '</h1>';

	document.querySelector(
		`#guess-list li:nth-child(${this.pastGuesses.length})`
	).textContent = this.playersGuess;

	// change guess li border/background color with warm/cold
	document
		.querySelector(`#guess-list li:nth-child(${this.pastGuesses.length})`)
		.classList.remove('default');

	document
		.querySelector(`#guess-list li:nth-child(${this.pastGuesses.length})`)
		.classList.add(color);

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

// *********************************
// play game
// *********************************
function playGame() {
	const game = newGame();

	// Listen for user input - number guess
	// - make sure its a number
	// - run the function `checkGuess`, and give it the player's guess, the winning number, and the empty array of guesses!

	// processNumber - after entered in input field, the exited via tab or return or clicking on submit button
	function processNumber() {
		// get guessed number out of player-input
		let playerInput = document.getElementById('player-input');

		const playersGuess = +playerInput.value;

		document.getElementById('header').innerHTML =
			"<h1 class='display-4'>" +
			game.playersGuessSubmission(playersGuess) +
			'</h1>';

		playerInput.value = '';
		document.getElementById('player-input').focus();
	}

	// *********************************
	// Event Listeners

	// when exit input field via tab OR click submit button, check for valid number & process
	const playerInput = document.getElementById('player-input');
	playerInput.addEventListener('blur', function() {
		console.log('blur');
		checkNumber();
		processNumber();
	});
	// when exit input field via keyboard return
	playerInput.addEventListener('keydown', function(event) {
		if (event.keyCode === 13) {
			checkNumber();
			processNumber();
		}
	});

	// check that only numbers are entered
	function checkNumber() {
		let testStr = document.getElementById('player-input').value;

		if (isNaN(Number(testStr))) {
			document.getElementById('player-input').value = '';
			document.getElementById('player-input').select();

			// *** QUESTION - cant use throw and see in feedback!
			return (
				testStr +
				' is not a number. Please enter a valid number between 1 and 100.'
			);
		}
	}

	// when click reset
	const btnReset = document.getElementById('btn-reset');
	// btnReset.onClick = newGame();
	btnReset.addEventListener('click', function() {
		// ***********************************************
		// QUESTION
		// select player-input field
		// new game
		// ***********************************************
		/*
		document.getElementById('hint').textContent = '';
		document.getElementById('player-input').textContent = '';
		document.getElementById('player-input').focus();
*/
		location.reload();
		return newGame();
	});

	// when click get hint
	const btnHint = document.getElementById('btn-hint');
	btnHint.addEventListener('click', function() {
		document.getElementById(
			'hint'
		).textContent = `The winning number is one of: ${game.provideHint()}`;
	});

	// if win/lose remove ability to submit another number
}

// start up the game!
playGame();
