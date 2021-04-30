//try to keep variables in order that they appear in html
const overlay = document.getElementById("overlay");
const resetBtn = document.getElementsByClassName("btn__reset")[0];
const phrase = document.getElementById("phrase");
const phrases = [
  "A blessing in disguise",
  "Better late than never	",
  "Your guess is as good as mine",
  "The best of both worlds",
  "Like the moon I too have my phases",
];
const qwerty = document.getElementById("qwerty");
let missed = 0;

// reset game
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

const addPhraseToDisplay = (arr) => {
  let phraseLetters = randomPhrase.split("");
  let ul = document.querySelector("#phrase ul");
  phraseLetters.forEach((letter) => {
    console.log(letter);
    let newLi = document.createElement("li");
    newLi.textContent = letter;
    ul.appendChild(newLi);

    if (letter === " ") {
      newLi.classList.add("space");
    } else {
      newLi.classList.add("letter");
    }
  });
};
ƒ;
addPhraseToDisplay();

/*






// check if a letter is in the phrase
const checkLetter = (button) => {};

//listen for the start game button to be pressed
startButton.addEventListener("click", () => {});

//listen for the onscreen ekyboard to be clicked
qwerty.addEventListener("click", (e) => {});
*/
