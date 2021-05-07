// APP FLOW CONTENTS:
// 0) SET UP
// 1) START SCREEN
// 2) GAME
//  A) WIN
//    I) RESTART => 2
//  B) LOSE
//    I) RESTART => 2

// APP FLOW:
// 0) SET UP
function setUp() {
  console.log("setUp");
  //these are set up variables
  window.app = {
    overlay: document.getElementById("overlay"),
    resetBtn: document.getElementsByClassName("btn__reset")[0],
    phrase: document.getElementById("phrase"),
    phrases: [
      "A BLESSING IN DISGUISE",
      "BETTER LATE THAN NEVER",
      "YOUR GUESS IS AS GOOD AS MINE",
      "THE BEST OF BOTH WORLDS",
      "LIKE THE MOON I TOO HAVE MY PHASES",
      "BLACK LIVES MATTER",
    ],
    qwerty: document.getElementById("qwerty"),
    missed: 0,
    phraseOnDisplay: document.querySelector("#phrase ul"),
    hearts: document.querySelectorAll("#scoreboard ol li"),
  };
}
setUp();

// 1) START SCREEN
//listen for the start game button to be pressed
app.resetBtn.addEventListener("click", (e) => {
  app.resetBtn.style.display = "none";
  app.overlay.style.display = "none";
});

//return a random phrase from an array
const getRandomPhraseAsArray = (arr) => {
  const randomIndex = Math.floor(Math.random() * app.phrases.length);
  return arr[randomIndex];
};

// 2) GAME

//adds the letters of a string to the display

const addPhraseToDisplay = (arr) => {
  const randomPhrase = getRandomPhraseAsArray(app.phrases);
  const phraseLetters = randomPhrase.split("");

  phraseLetters.forEach((letter) => {
    const newLi = document.createElement("li");
    newLi.textContent = letter;
    app.phraseOnDisplay.appendChild(newLi);

    if (letter === " ") {
      newLi.classList.add("space");
    } else {
      newLi.classList.add("letter");
    }
  });
};
addPhraseToDisplay();

//clear displayed phrase so that new phrase can get displayed & remove classes from keyboard & hearts
const reset = () => {
  clearPhrase();
  addPhraseToDisplay();
  clearKeyboardClasses();
  clearHearts();
};

const clearPhrase = () => {
  app.phraseOnDisplay.innerHTML = "";
};

const clearKeyboardClasses = () => {
  const buttons = document.querySelectorAll("#qwerty .keyrow button");
  buttons.forEach((button) => (button.classList = ""));
};
const clearHearts = () => {
  app.hearts.forEach((heart) => (heart.style.display = "inline"));
};

//check if a letter is in the phrase
const checkLetter = (letterGuess) => {
  let match = false;
  let liArray = document.querySelectorAll(".letter");

  for (let i = 0; i < liArray.length; i++) {
    let hasMatch = liArray[i].textContent.toLowerCase() === letterGuess;
    if (hasMatch) {
      liArray[i].classList.add("show");
      match = letterGuess;
    }
  }
  return match;
};

//listen for the onscreen keyboard to be clicked

app.qwerty.addEventListener("click", (e) => {
  const button = e.target;
  const isValidButtonClick =
    button.className !== "chosen" && button.nodeName === "BUTTON";
  if (isValidButtonClick) {
    let buttonText = button.innerText;
    let match = checkLetter(buttonText);
    button.classList.add("chosen");
    checkWin();

    if (match) {
      button.classList.add("correctButton");
    } else {
      displayScore(buttonText);
    }
  }
});

//display hearts as lives left
function displayScore(buttonText) {
  alert(`The letter "${buttonText}" is incorrect, LOSE ONE HEART`);
  // app.hearts.style.display = "none"; //it's only hiding the last heart once.... not each time!
  app.missed += 1;
  //  ❤️ ❤️ ❤️ ❤️ ❤️
  //  0 1 2 3 4
  // missed = 0

  app.hearts.forEach((heart, index) => {
    if (index < app.missed) {
      heart.style.display = "none";
    }
  });
}

//check if the game has been won or lost
const checkWin = () => {
  const letter = document.querySelectorAll(".letter");
  let title = document.querySelector(".title");
  const lettersShown = document.querySelectorAll(".show");
  const soundtrack = document.getElementById("soundtrack");
  if (letter.length === lettersShown.length) {
    app.overlay.classList.add("win");
    app.overlay.style.display = "flex";
    title.innerHTML = `<h2 class="title">CONGRATULATIONS! You've won!</h2>`;
    soundtrack.innerHTML = `<audio autoplay><source src="audio/yay.mp3" type="audio/mpeg"></audio>`;
    app.resetBtn.style.display = "block";
    app.resetBtn.innerHTML = `Play Again?`;
  }
  if (app.missed === 5) {
    app.overlay.classList.add("lose");
    app.overlay.style.display = "flex";
    title.innerHTML = `<h2 class="title">Sorry, you've lost.</h2>`;
    soundtrack.innerHTML = `<audio autoplay><source src="audio/fail.wav" type="audio/wav"></audio>`;
    app.resetBtn.innerHTML = `Try Again?`;
    app.resetBtn.style.display = "block";
  }
  app.resetBtn.addEventListener("click", (e) => {
    setUp();

    addPhraseToDisplay();
  });
};
//  A) WIN
//    I) RESTART => 2

//  B) LOSE
//    I) RESTART => 2
