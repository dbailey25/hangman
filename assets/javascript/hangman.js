var words = ["bear", "monkey", "snake", "tiger", "zebra"]
var random = Math.floor(Math.random() * 5);
var word = words[random];
var wordIndex = words.indexOf(word);
var nextWordIndex;
var nextWord;
var winLoss = document.getElementById("win-loss");
var correctGuess = [];
var incorrectGuess = [];
var totalGuesses;
var guessesRemaining;
var incorrectLetter = document.getElementById("wrong-letters")
var winNum = 0;
var audioPlaying = "bear";

// function to generate the next word
function wordNext() {
  if (wordIndex >= 0 && wordIndex < 4) {
    nextWordIndex = wordIndex+1;
  }
  else {
    nextWordIndex  = 0;
  }
  nextWord = words[nextWordIndex]
}
wordNext()
// funaction to display a word
function displayWord() {
  var wordDiv = document.getElementById("current-word");
  wordDiv.innerHTML = "";
  for (var i = 0; i < word.length; i++) {
    var correctLetterDiv = document.createElement("div");
    correctLetterDiv.innerHTML = "_";
    wordDiv.appendChild(correctLetterDiv);
    correctLetterDiv.setAttribute("class", "letterDiv");
    correctLetterDiv.setAttribute("id", word + "Letter" + i);
  }
// display initial guesses remaining
  var initialGuesses = word.length+8;
  var guessRemain = document.getElementById("remaining-guesses");
  guessRemain.innerHTML = initialGuesses;
  guessesRemaining = initialGuesses;
  // guessesRemaining.push(initialGuesses);
}
displayWord()

function pauseAudio() {
    var audio = document.getElementById(audioPlaying);
  audio.pause();
}
// play game
// capture user guess
document.onkeyup = function(event) {
var userInput = String.fromCharCode(event.keyCode);
var input = userInput.toLowerCase();
// verify that the keystroke is a letter
if (/[a-z]/.test(input)) {
// verify that the letter has not been previously guessed
if (correctGuess.indexOf(input) && incorrectGuess.indexOf(input) == -1){
  winLoss.innerHTML = "";
// /////////////////// temp var for testing ///////////////////////////
//       isNewGuess = "true";
//       console.log("isNewGuess_"+isNewGuess);
// /////////////////////////////////////////////////////////////////////
// if user guess is correct
if (word.indexOf(input) > -1) {
  var correctLetter = document.getElementById(word+"Letter"+word.indexOf(input));
  correctLetter.innerHTML = input;
  correctGuess.push(input);
}
// if user guess is incorrect
else {
  incorrectGuess.push(input);
  incorrectLetter.innerHTML = incorrectGuess;
}

// track number of guesses
function guessCount() {
  var totGuesses = correctGuess.length + incorrectGuess.length
  totalGuesses = totGuesses;
}
guessCount()

// decrement Guesses remaining display
var guessesLeft = guessesRemaining - totalGuesses;
var guessRemain = document.getElementById("remaining-guesses");
function remainingGuesses() {
  guessRemain.innerHTML = guessesLeft;
}
remainingGuesses()


// functions for win-loss actions
// function to clear previous guess values
function reset() {
correctGuess.length = 0;
incorrectGuess.length = 0;
totalGuesses.length = 0;
incorrectLetter.innerHTML = "";
word = nextWord;
wordIndex = words.indexOf(word);
wordNext();
}

// function to determine if the user lost
function determineLoss() {
if (guessesLeft === 0 && correctGuess.length < word.length) {
  var loss = document.getElementById("win-loss");
  loss.innerHTML = "Sorry, try again";
  // pauseAudio();
  reset();
  displayWord();
}
}
determineLoss()

// functions to play and pause audio_
function playAudio() {
var pauseDiv = document.getElementById("pause");
var pauseBtn = document.createElement("button");
var child = document.getElementById("pauseButton");
var audio = document.getElementById(word);
pauseDiv.removeChild(child);
audio.play();
audioPlaying = word;
// add pause button for audio
pauseBtn.setAttribute("onclick", "pauseAudio()");
pauseBtn.setAttribute("type", "button");
pauseBtn.setAttribute("class", "pauseBtn");
pauseBtn.setAttribute("id", "pauseButton");
pauseBtn.innerHTML="Pause";
pauseDiv.appendChild(pauseBtn);
}

// functions if the user wins
// count Wins
function countWins() {
  winCount = winNum+1;
  winNum = winCount;
  var countWin = document.getElementById("win-count");
  countWin.innerHTML = winCount;
}
function determineWin() {
  if (correctGuess.length === word.length && guessesRemaining >= 0) {
    win = document.getElementById("win-loss");
    win.innerHTML = "Great job! Let's try another.";
    var replaceImage = document.getElementById("game-image");
    var newImage = "assets/images/"+word+".jpg";
    replaceImage.setAttribute("src",newImage);
    countWins();
    pauseAudio();
    playAudio();
    reset();
    displayWord();
  }
}
determineWin()
  }
}
}
