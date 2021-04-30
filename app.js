console.log("hi there");

const qwerty = document.getElementById("qwerty");
const resetBtn = document.getElementById("btn__reset");
let missed = 0;

const phrase = document.getElementById("phrase");
let phrases = [
  "Some of the best words of art come from the most bruised and battered of hearts",
  "Nostalgia is a liar that insists things were better than they seemed",
  "I pour my heart out onto paper where it is safe",
  "If love is a disease then I am very sick but incredibly happy",
  "I am the moon I too have my phases",
];

// reset game
resetBtn.addEventListener("click", (e) => {
  e.preventDefault();
});

//return a random phrase form an array
const getRandomPhraseAsArray = (arr) => {};

//adds the letters of a string to the display
const addPhraseToDisplay = (arr) => {};

// check if a letter is in the phrase
const checkLetter = (button) => {};

//listen for the start game button to be pressed
startButton.addEventListener("click", () => {});

//listen for the onscreen ekyboard to be clicked
qwerty.addEventListener("click", (e) => {});
