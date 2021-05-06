//try to keep variables in order that they appear in html
const overlay = document.getElementById("overlay");
const resetBtn = document.getElementsByClassName("btn__reset")[0];
const phrase = document.getElementById("phrase");
const phrases = [
  "A blessing in disguise",
  "Better late than never",
  "Your guess is as good as mine",
  "The best of both worlds",
  "Like the moon I too have my phases",
];
const qwerty = document.getElementById("qwerty");
let missed = 0;

//listen for the start game button to be pressed
resetBtn.addEventListener("click", (e) => {
  // e.preventDefault();
  resetBtn.style.display = "none";
  overlay.style.display = "none";
});

//return a random phrase from an array
const getRandomPhraseAsArray = (arr) => {
  const randomIndex = Math.floor(Math.random() * phrases.length);
  const randomPhrase = arr[randomIndex];
  return randomPhrase;
};
const randomPhrase = getRandomPhraseAsArray(phrases);

//adds the letters of a string to the display
const phraseLetters = randomPhrase.split("");
const ul = document.querySelector("#phrase ul");

const addPhraseToDisplay = (arr) => {
  phraseLetters.forEach((letter) => {
    // console.log(letter);
    const newLi = document.createElement("li"); //how come I can't take newLi and make it a global var?
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

qwerty.addEventListener("click", (e) => {
  const button = e.target; //make sure that it's just the button not everywhere on the div .. type?
  let buttonText = button.innerText;

  if (button.className !== "chosen") {
    button.classList.add("chosen");
    let match = checkLetter(buttonText);

    if (match === false) {
      alert("FALSE WRONG LETTER");
      let hearts = document.getElementById("scoreboard");
      let ol = hearts.firstElementChild;
      let li = ol.lastElementChild;
      ol.removeChild(li);
      missed += 1;
    }
  }
});

function displayScore(numberOfHeartsLeft) {
  // get hearts
  // hide all hearts
  // display numberOfHeartsLeft in loop
}

//check if the game has been won or lost
const checkWin = () => {};
