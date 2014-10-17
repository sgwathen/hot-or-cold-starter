$(document).ready(function(){
	/* variables */
	var randomNum;
	var guessFlag;
	var totalCount;
	var guess;
	var correct = false;
	/*creates new game*/
	newGame();
	/*functions*/
	function newGame() {
		guessFlag = true;
		totalCount = 0;
		correct = false;
		$("ul#guessList li").remove();
		setFeedback("Make your Guess!");
		setCount(totalCount);
		randomNum = generateNum();
		emptyText();
	}
	/* sets feedback header to determine how close/far away guess is to number */
	function setFeedback(feedback) {
		$("h2#feedback").text(feedback);	
	}
	/*sets guess number count to number of counts entered*/
	function setCount(count) {
		$("#count").text(totalCount);	
	}
	/*to empty user guess field*/
	function emptyText() {
		$("#userGuess").val('');	
	}
	/* to get random number in memory*/
	function generateNum() {
		var weirdNum = Math.floor((Math.random() * 100) + 1);
		console.log("Generated Randome Number = "+ weirdNum);
		return weirdNum;	
	}
	/* return user guess to memory */
	function returnGuess() {
		var guess = prompt("Guess the Number","Your Guess");
		console.log("User Choice = "+ guess);
		return guess;	
	}
	/* Be sure user plays correctly */
	function checkGuess(guess) {
		if (isNaN(guess)) {
			setFeedback("Be sure to only enter a number!");
			return true;
		} else if (guess % 1 != 0) {
			setFeedback("Enter a whole number, please!");
			return true;
		} else if (guess < 1 || guess > 100) {
			setFeedback("Please enter a number between 1 and 100!");
			return true;
		} else if ($.trim(guess) == "") {
			setFeedback("Please enter your guess!");
			return true;
		} else {
			return false;
		};
	}
	function guessDistance(distance) {
		if (distance == 0) {
			setFeedback("Woohoo! You guessed it!");
			correct=true;
			return false;
		} else if (distance <= 3) {
			setFeedback("Your guess is on fire!");
			return true;
		} else if (distance <= 5) {
			setFeedback("Your guess is hot!");
			return true;
		} else if (distance >= 5 && distance <= 15) {
			setFeedback("Your guess is warmer!");
			return true;
		} else if (distance >= 15 && distance <= 30) {
			setFeedback("Your guess is getting cold!");
			return true;
		} else if (distance <= 30 && distance <= 40) {
			setFeedback("Your guess is ice!");
			return true;
		} else {
			setFeedback("Your guess is freezing cold!");
			return true;
		};
	}
	/* on submit */
	$("form").submit(function(event){
		event.preventDefault();
		/*when user enters incorrect guess*/
		if (!correct) {
			guess = $('#userGuess').val();
			console.log("User Choice = "+ guess);
			emptyText();
			guessFlag = checkGuess(guess);
			if (!guessFlag) {
				totalCount++;
				setCount(totalCount);
				$('ul#guessList').append("<li>" + guess + "</li>");
				guessFlag = guessDistance(Math.abs(randomNum - guess));
			};
		} 
		/*when user enters correct guess, will not allow more guesses*/
		else {
			setFeedback("You've found the correct answer! Now start a new game.");
		}
	});
	/* creates new game*/
	$(".new").click(function(event){
		event.preventDefault();
		newGame();
	});
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);
  	});
  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});
});
