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
      "BITE THE BULLET",
      "NO PAIN NO GAIN",
      "SUNS OUT GUNS OUT",
      "IT TAKES TWO TO TANGO",
      "COUCH POTATO",
      "BUN IN THE OVEN",
      "LEFT ON READ",
      "COOL AS A CUCUMBER",
      "CHEW THE FAT",
      "THICK AS THIEVES",
      "SHAKE IT OFF",
      "COVID KILOS",
      "BETTER TOGETHER",
      "ELEPHANT IN THE ROOM",
      "A PIECE OF CAKE",
      "HOLD YOUR HORSES",
      "WINNER WINNER CHICKEN DINNER",
      "MORE HOLES THAN A SWISS CHEESE",
      "BEST THING SINCE SLICED BREAD",
      "SUMMER BODIES ARE MADE IN WINTER",
    ],
    qwerty: document.getElementById("qwerty"),
    missed: 0,
    phraseOnDisplay: document.querySelector("#phrase ul"),
    hearts: document.querySelectorAll("#scoreboard ol li"),
    soundtrack: document.getElementById("soundtrack"),
  };
}
setUp();

// 1) START SCREEN
//listen for the start game button to be pressed
app.resetBtn.addEventListener("click", () => {
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
const addPhraseToDisplay = () => {
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
  app.overlay.classList = "";
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

    if (match) {
      button.classList.add("correctButton");
    } else {
      app.missed += 1;
      yikesAudio();
      displayScore(buttonText);
    }
    checkWin();
  }
});

//display hearts as lives left
function displayScore(buttonText) {
  window.setTimeout(() => {
    alert(`The letter "${buttonText}" is incorrect, LOSE ONE HEART`);
  }, 170);

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
  if (letter.length === lettersShown.length) {
    app.overlay.classList.add("win");
    app.overlay.style.display = "flex";
    title.innerHTML = `<h2 class="title">CONGRATULATIONS! You've won!</h2>`;
    yayAudio();
    app.resetBtn.style.display = "block";
    app.resetBtn.innerHTML = `Play Again`;
  }
  if (app.missed === 5) {
    app.overlay.classList.add("lose");
    app.overlay.style.display = "flex";
    title.innerHTML = `<h2 class="title">Sorry, you've lost.</h2>`;
    failAudio();
    app.resetBtn.innerHTML = `Try Again?`;
    app.resetBtn.style.display = "block";
  }
  app.resetBtn.addEventListener("click", () => {
    setUp();
    reset();
  });
};

//add audio to different parts of the gameshow
const addAudio = (source, type) => {
  app.soundtrack.innerHTML = `<audio autoplay><source src="audio/${source}" type="audio/${type}"></audio>`;
};

const yikesAudio = () => addAudio("yikes.wav", "wav");
const yayAudio = () => addAudio("yay.mp3", "mpeg");
const failAudio = () => addAudio("fail.wav", "wav");
