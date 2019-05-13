'use strict';

const myQuestions = [
	{
		question: 'What is the HTML tag under which one can write JavaScript code?',
		answers: {
			a: '&lt;javascript&gt;',
			b: '&lt;scripted&gt;',
			c: '&lt;script&gt;',
			d: '&lt;js&gt;'
		},
		correctAnswer: 'c',
		explanation: "Use the 'script' tag to write a JavaScript code."
	},
	{
		question:
			"Which of the following is the correct syntax to display 'GeeksforGeeks' in an alert box using JavaScript?",
		answers: {
			a: "alertbox('GeeksforGeeks');",
			b: "msg('GeeksforGeeks');",
			c: "msgbox('GeeksforGeeks');",
			d: "alert('GeeksforGeeks');"
		},
		correctAnswer: 'd',
		explanation:
			"To display any text in the alert box, you need to write it as alert('GeeksforGeeks');"
	},
	{
		question:
			"What is the correct syntax for referring to an external script called 'geek.js'?",
		answers: {
			a: "&lt;script src='geek.js'&gt;",
			b: "&lt;script href='geek.js'&gt;",
			c: "&lt;script ref='geek.js'&gt;",
			d: "&lt;script name='geek.js'&gt;"
		},
		correctAnswer: 'a',
		explanation: "The 'src' term is used to refer to any JavaScript file."
	},
	{
		question:
			'What is the syntax for creating a function in JavaScript named as Geekfunc?',
		answers: {
			a: 'function = Geekfunc()',
			b: 'function Geekfunc()',
			c: 'function := Geekfunc()',
			d: 'function : Geekfunc()'
		},
		correctAnswer: 'b',
		explanation: "In JavaScript, function is defined as 'function x()'"
	},
	{
		question: 'How is a function called in JavaScript?',
		answers: {
			a: 'call Geekfunc();',
			b: 'call function GeekFunc();',
			c: 'Geekfunc();',
			d: 'function Geekfunc();'
		},
		correctAnswer: 'c',
		explanation: 'In JavaScript, functions are called directly like x().'
	},
	{
		question:
			"How to write an 'if' statement for executing some code. If 'i' is NOT equal to 5?",
		answers: {
			a: 'if(i&lt;&gt;5)',
			b: 'if i&lt;&gt;5',
			c: 'if(i!=5)',
			d: 'if i!=5'
		},
		correctAnswer: 'c',
		explanation: 'JavaScript does not accept &lt;&gt; operator as not equal to.'
	},
	{
		question:
			'What is the correct syntax for adding single line comments in JavaScript?',
		answers: {
			a: '&lt; !-This is a comment- &gt;',
			b: '//This is a comment',
			c: '-This is a comment',
			d: '**This is a comment**'
		},
		correctAnswer: 'b',
		explanation:
			' Correct Syntax for single line comments in JavaScript is //comment. '
	},
	{
		question: 'What is the JavaScript syntax for printing values in Console?',
		answers: {
			a: 'print(5)',
			b: 'console.log(5);',
			c: 'console.print(5);',
			d: 'print.console(5);'
		},
		correctAnswer: 'b',
		explanation:
			'The action built into the console object is the .log() method. Whenever we write console.log() in JavaScript code, what we put inside the parentheses will get printed, or logged, to the console.'
	},
	{
		question: 'How to initialize an array in JavaScript?',
		answers: {
			a: "let Geeks= 'Geek1', 'Geek2', 'Geek3'",
			b: 'let Geeks=(1:Geek1, 2:Geek2, 3:Geek3)',
			c: 'let Geeks=(1=Geek1, 2=Geek2, 3=Geek3)',
			d: "let Geeks=['Geek1', 'Geek2', 'Geek3']"
		},
		correctAnswer: 'd',
		explanation: ' In JavaScript, arrays are initialized like [].'
	},
	{
		question: 'Which of these is NOT a valid Javascript Data Type',
		answers: {
			a: 'decimal',
			b: 'string',
			c: 'object',
			d: 'boolean'
		},
		correctAnswer: 'a',
		explanation:
			'Decimal is NOT a valid Javascript Data Type. All numbers, including decimals and negative numbers are of the Number Data Type.'
	}
];

/*
// Pseudocode
1 - DEFAULT: see the FIRST PAGE message & the START button

2 - user clicks START button = render the quiz question to the screen & score & page X of Y and SHOW the SUBMIT button

3 - user clicks the SUBMIT button = render the quiz question to the screen WITH user answer & correct answer & score & page X of Y, and SHOW the CONTINUE BUTTON

4 - user clicks the CONTINUE button = render the NEXT quiz question to the screen & score & page X of Y and SHOW the SUBMIT button

5 - user clicks CONTINUE button on LAST page, see LAST PAGE message with RESTART button & & score and SHOW the RESTART button

6 - user clicks RESTART button =  see DEFAULT (#1)

NEED TO HANDLE START, SUBMIT (user answer), CONTINUE (after see results), and RESTART events
ADDED REVIEW - button to see all questions with user answer and correct answer at end of quiz
*/

// keep track of questionIndex
let questionIndex = 0;

// keep track of all correct answers
let numCorrect = 0;

// ALTERNATIVE for restart
// save the DOM original state for restart
// let originalDOM = document.body.innerHTML;


function showDefaultMessage(){
	$('.js-message').html(`
      <h2>Welcome<br>to the<br>Javascript Quiz</h2>
      <button type="button" class="start">Start Quiz</button>`);
}

function hideMessage(){
	$('.js-message').hide();
}

function startQuiz() {
	$('.js-container').on('click', '.start', function(event) {
		$('.js-message').hide();

		$('.js-quiz-container').show();
		renderQuestion('submit');
	});

	// console.log('`startQuiz` ran');
}

function restartQuiz() {
// user clicks restart
// reset questionIndex & correct answer counter
// show the default message

	$('.js-container').on('click', '.restart', function(event) {
	
	// reset questionIndex
		questionIndex = 0;
		// reset correct answers
		numCorrect = 0;
		
		// show initial message
		showDefaultMessage();
		
		
	// hide the last question & review button (from the final page)
	$('.js-quiz-container').hide();
	$('.js-review').hide();

		// ALTERNATIVE
		// restore to DOM original state
		// document.body.innerHTML = originalDOM;
		
	   // Another ALTERNATIVE:
	   // window.location.reload();
	
		// console.log('`restartQuiz` ran');
	});
}

function reviewResults() {
// loop thru myQuestions array of objects
// for each object, print question and answers
// flag userAnswer and correctAnswer

	$('.js-container').on('click', '.review', function(event) {
	
		// store the HTML output
		let reviewOutput = [];
		
		for (let i = 0; i < myQuestions.length; i++) {
		// generateQuestionHTML(btn, userAnswer, qIndex)
		let q = generateQuestionHTML('review', myQuestions[i].userAnswer, i);
		
		reviewOutput.push(q);
		}
		
		// insert the final HTML into the DOM
		 $('.js-quiz-container').show().html(reviewOutput.join(''));
		 
		// hide the review results button
		$('.js-review').hide();
		
	// console.log('`reviewResults` ran');
	});
}

function renderLastPage() {

	$('.js-message').show().html(`
      <h2>You finished the quiz!</h2>
      <h3>Final Score:<br>${numCorrect} out of ${myQuestions.length}<br>
      ${(numCorrect/myQuestions.length) * 100}%</h3>
	  <button type="button" class="restart">Restart Quiz</button>`);
	  
	
	// hide the last question when show the final page
	$('.js-quiz-container').hide();
	
	// show the review results button
	$('.js-review').show().html(`<button type="button" class="review">Review Your Answers</button>`);


	// load the restartQuiz function - which is triggered by the restart button created above
	restartQuiz();
	
	// load the reviewResults function
	reviewResults();

	// console.log('`renderLastPage` ran');
}


function renderNextQuestion() {
// user clicks continue from the results screen which submits that form
// increment questionIndex
// render next question

	$('.js-quiz-container').on('submit', '#continue-form', function(event) {
		// stop the default form submission behavior
		event.preventDefault();

		if (questionIndex === myQuestions.length - 1) {
			// show last page text & restart button & review button
			renderLastPage();
		} else {
			// show next page with submit button
			questionIndex += 1;
			renderQuestion('submit');
		}

		// console.log('`renderNextQuestion` ran');
	});
}

function renderResults() {
	// show results
	// show question & answers again with results (correct-answer & user-answer)
	// disable input radio buttons

	$('.js-quiz-container').on('submit', '#submit-form', function(event) {
		// stop the default form submission behavior
		event.preventDefault();

		// find submitted answer
		let userAnswer = $("input[name='answer']:checked").val();

		// save answer submitted as new property on currentQuestion
		let currentQuestionObj = myQuestions[questionIndex];
		currentQuestionObj.userAnswer = userAnswer;
		
		// update numCorrect/js-score
		if (currentQuestionObj.correctAnswer === userAnswer) {
			numCorrect += 1;
		}

		// console.log('`renderResults` ran');

		// render results with continue button
		renderQuestion('continue', userAnswer);
	});
}

function generateQuestionHTML(btn, userAnswer, qIndex) {
		// store the HTML output
		let output = [];

		// for this question store the list of answer options
		let currentQuestion = myQuestions[qIndex];

		const answerOptions = [];
		let correctAnswerClass = '';
		let userAnswerClass = '';
		let disabled = (btn === 'continue' || btn === 'review') ? 'disabled' : '';

		let checked = '';

		let explanation = userAnswer !== '' ? currentQuestion.explanation : '';

		// for each of the possible answers add an HTML radio button
		// use required on inputs so user can not submit form without selecting an answerOption
		// add correct-answer class to answerOptions
		// add user-answer class to answerOptions
		for (let option in currentQuestion.answers) {
			// only when showing results
			if (btn === 'continue' || btn === 'review') {
				if (option === currentQuestion.correctAnswer) {
					correctAnswerClass = 'correct-answer';
				} else {
					correctAnswerClass = '';
				}
				if (option === userAnswer) {
					userAnswerClass = 'user-answer';

					// add checked to the checked radio button
					checked = 'checked';
				} else {
					userAnswerClass = '';
					checked = '';
				}
			}

			answerOptions.push(
				`<label for="answer_${option}">
      <input type="radio" name="answer" id="answer_${option}" value="${option}" ${disabled} ${checked} required>${option}:&nbsp;&nbsp;${
					currentQuestion.answers[option]
				}<span class="warning ${userAnswerClass}"></span><span class="warning ${correctAnswerClass}"></span></label>`
			);
		}
		
		let banner = (btn === 'submit' || btn === 'continue') ? `
		<div class="banner">
			<span class="js-questionsAnswered">Question: ${qIndex + 1} out of ${
			myQuestions.length
		}</span>
			<span class="js-score">Score: ${numCorrect} out of ${myQuestions.length}</span>
		</div>` : '';
		
		
		let form = (btn === 'submit' || btn === 'continue') ? `<form id="${btn}-form" name="quiz-form" action="index.html" method="post">` : '';
		
		
		let button = (btn === 'submit' || btn === 'continue') ? `<button class="${btn}" type="submit">${btn}</button>` : '' ;
		
		
		// add this question and its answers to the output
		output.push(
			`${banner}

			 ${form}

			<fieldset>
			<legend>
			  <h3><span>${qIndex + 1}.</span> ${currentQuestion.question}</h3>
			</legend>

			<ul class="answers">
			<li data-question-id="${qIndex}">
				${answerOptions.join('')}
			</li>
			</ul>

			<div class="explanation">${explanation}</div>
			${button}
			
		</fieldset>
		</form>`
		);
		
		return output; 
		
	// console.log(`generateQuestionHTML(${btn}, ${userAnswer, ${qIndex}) ran`);s
}

function renderQuestion(btn = 'start', userAnswer = '', qIndex = questionIndex ) {
	// only show question and answerOptions if NOT on START page
	// if answer was submitted, show which was answer was submitted
	// if answer was submitted, disable changing answer/selecting another radio button

	if (btn === 'start') {
		showDefaultMessage();
	} else {
		// insert the final question HTML into the DOM
		$('.js-quiz-container').html(generateQuestionHTML(btn, userAnswer, qIndex));
	}

	// console.log(`renderQuestion(${btn}) ran`);
}

function processQuiz() {
// this function is our callback when the page loads. it's responsible for initially rendering the quiz, and activating the individual functions that handle  clicks on the "start", "submit", "continue", "restart" and "review" buttons.

	startQuiz();
	renderQuestion();
	renderResults();
	renderNextQuestion();
}

// when the page loads, call `processQuiz`
$(processQuiz);
