// APP FLOW CONTENTS:
// 0) SET UP
// 1) START SCREEN
// 2) GAME
//  A) WIN
//    I) RESTART => 2
//  B) LOSE
//    I) RESTART => 2

// APP FLOW
// 0) SET UP
function setUp() {
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
  };
}

setUp();

// 1) START SCREEN
// 2) GAME
//  A) WIN
//    I) RESTART => 2
//  B) LOSE
//    I) RESTART => 2

//listen for the start game button to be pressed
app.resetBtn.addEventListener("click", (e) => {
  // e.preventDefault();
  app.resetBtn.style.display = "none";
  app.overlay.style.display = "none";
});

//return a random phrase from an array
const getRandomPhraseAsArray = (arr) => {
  const randomIndex = Math.floor(Math.random() * app.phrases.length);
  const randomPhrase = arr[randomIndex];
  return randomPhrase;
};
const randomPhrase = getRandomPhraseAsArray(app.phrases);

//adds the letters of a string to the display
const phraseLetters = randomPhrase.split("");
const ul = document.querySelector("#phrase ul");

const addPhraseToDisplay = (arr) => {
  phraseLetters.forEach((letter) => {
    const newLi = document.createElement("li");
    newLi.textContent = letter;
    ul.appendChild(newLi);

    if (letter === " ") {
      newLi.classList.add("space");
    } else {
      newLi.classList.add("letter");
    }
  });
};

addPhraseToDisplay();

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
// const button = ??

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

function displayScore(buttonText) {
  alert(`The letter "${buttonText}" is incorrect, LOSE ONE HEART`);
  let hearts = document.getElementById("scoreboard");
  let ol = hearts.firstElementChild;
  let li = ol.lastElementChild;
  ol.removeChild(li);
  app.missed += 1;
}

//check if the game has been won or lost

const letter = document.querySelectorAll(".letter");

const checkWin = () => {
  let title = document.querySelector(".title");
  const lettersShown = document.querySelectorAll(".show");
  const soundtrack = document.getElementById("soundtrack");
  if (letter.length === lettersShown.length) {
    app.overlay.classList.add("win");
    app.overlay.style.display = "flex";
    title.innerHTML = `<h2 class="title">CONGRATULATIONS! You've won!</h2>`;
    soundtrack.innerHTML = `<audio autoplay><source src="audio/yay.mp3" type="audio/mpeg"></audio>`;
  }
  if (app.missed === 5) {
    app.overlay.classList.add("lose");
    app.overlay.style.display = "flex";
    title.innerHTML = `<h2 class="title">Sorry, you've lost.</h2>`;
    soundtrack.innerHTML = `<audio autoplay><source src="audio/fail.wav" type="audio/wav"></audio>`;
  }
};
