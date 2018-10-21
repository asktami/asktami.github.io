/*
// QUESTION: Why can't I get the invalid guess to display if I use throw?  ---- invalid guess
*/

// to get a random integer between two values
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

// return a random number between 1 and 100
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
// should have a playersGuess property, and a pastGuesses property
// playersGuess property is what will hold the player's number guess
// pastGuesses will be an array, and holds all of the player's past guesses
class Game {
	constructor() {
		this.playersGuess = null;
		this.pastGuesses = [];
		this.winningNumber = generateWinningNumber();
	}

	difference() {
		return Math.abs(this.playersGuess - this.winningNumber);
	}

	isLower() {
		return this.playersGuess < this.winningNumber;
	}

	playersGuessSubmission(num) {
		if (isNaN(Number(num)) || num < 1 || num > 100) {
			document.getElementById('subhead').innerHTML = '';
			document.getElementById('instructions').innerHTML = '';
			return 'That is an invalid guess.';
		} else {
			this.playersGuess = num;
			return this.checkGuess();
		}
	}

	// The last spec specifies that playersGuessSubmission should call checkGuess
	// playersGuessSubmission should also return that call, so that the return value of playersGuessSubmissions is the return value of checkGuess.
	checkGuess() {
		let feedback;
		let color = 'cold';

		if (this.pastGuesses.includes(this.playersGuess)) {
			feedback = 'You have already guessed that number.';
		} else {
			this.pastGuesses.push(this.playersGuess);
			if (this.playersGuess === this.winningNumber) {
				feedback = 'You Won!';
				color = 'won';
			} else {
				let diff = this.difference();
				if (diff < 10) {
					feedback = "You're burning up!";
					color = 'warm';
				} else if (diff < 25) {
					feedback = "You're lukewarm.";
					color = 'warm';
				} else if (diff < 50) {
					feedback = "You're a bit chilly.";
				} else {
					feedback = "You're ice cold!";
				}
			}

			// moved Lose here so can display color on last entry
			if (this.pastGuesses.length === 5 && feedback !== 'You Won!') {
				feedback =
					'You Lose.<br>The winning number was ' + this.winningNumber + '.';
			}
		}

		// disable more input if have 5 guesses or have won
		if (this.pastGuesses.length === 5 || feedback === 'You Won!') {
			// disable player-input & submit btns
			document.getElementById('player-input').disabled = true;
			document.getElementById('btn-submit').disabled = true;
			document.getElementById('btn-hint').disabled = true;
		}

		// *****************
		// dispay feedback in the DOM
		// *****************'
		document.querySelector('#header').innerHTML =
			"<h1 class='display-4'>" + feedback + '</h1>';
		document.getElementById('subhead').innerHTML = '';
		document.getElementById('instructions').innerHTML = '';

		document.querySelector(
			`#guess-list li:nth-child(${this.pastGuesses.length})`
		).textContent = this.playersGuess;

		// change guess li border/background color to warm/cold
		document
			.querySelector(`#guess-list li:nth-child(${this.pastGuesses.length})`)
			.classList.remove('default');

		document
			.querySelector(`#guess-list li:nth-child(${this.pastGuesses.length})`)
			.classList.add(color);

		return feedback;
	}

	// generate an array with a length of 3
	// includes the winningNumber
	// call generateWinningNumber to fill the rest of the hint array with random numbers
	// call the shuffle function
	provideHint() {
		let arr = [
			this.winningNumber,
			generateWinningNumber(),
			generateWinningNumber()
		];

		return shuffle(arr);
	}
}

// returns a new game instance
function newGame() {
	return new Game();
}

// *********************************
// play game
// *********************************

let game = newGame();
let hintCount = 0;

// *********************************
// Event Listeners
// *********************************

// Listen for user input
// - make sure its a number
// - run the function `checkGuess`, and give it the player's guess, the winning number, and the empty array of guesses!

// processNumber - after value is entered in input field, then exited via enter on keyboard or clicking on submit button
function processNumber() {
	// get guessed number out of player-input
	let playerInput = document.getElementById('player-input');

	let playersGuess = +playerInput.value;

	let inputResult = game.playersGuessSubmission(playersGuess);

	document.getElementById('header').innerHTML =
		"<h1 class='display-4'>" + inputResult + '</h1>';

	playerInput.value = '';

	document.getElementById('player-input').focus();
}

// when exit input field via enter on keyboard OR click submit button check for valid number & process
const btnSubmit = document.getElementById('btn-submit');
btnSubmit.addEventListener('click', function() {
	processNumber();
});

// when exit input field via enter on keyboard
const playerInput = document.getElementById('player-input');
playerInput.addEventListener('keydown', function(event) {
	if (event.keyCode === 13) {
		processNumber();
	}
});

const btnHint = document.getElementById('btn-hint');
const hint = document.getElementById('hint');
btnHint.addEventListener('click', function() {
	// when click get hint, only show 1x
	hintCount++;

	if (hintCount === 1) {
		hint.textContent = `The winning number is: ${game
			.provideHint()
			.join(' or ')}`;
		hint.style.display = 'block';
		btnHint.disabled = true;
	}
});

// when click reset
const btnReset = document.getElementById('btn-reset');
btnReset.addEventListener('click', function() {
	game = newGame();

	let header = "<h1 class='display-4'>Guessing Game</h1>\r\n";
	let subhead = "<h2 class='display-5'>Can you guess the secret number?</h2>";
	let instructions = "<p class='lead'>Enter a number between 1 and 100!</p>";
	document.getElementById('header').innerHTML = header;
	document.getElementById('subhead').innerHTML = subhead;
	document.getElementById('instructions').innerHTML = instructions;

	const guesses = document.querySelectorAll('#guess-list li');
	for (let i = 0; i < guesses.length; i++) {
		guesses[i].textContent = '-';
		guesses[i].className = 'guess default';
	}

	document.getElementById('player-input').disabled = false;
	document.getElementById('btn-submit').disabled = false;
	document.getElementById('btn-hint').disabled = false;

	document.getElementById('hint').style.display = 'none';

	hintCount = 0;
});
