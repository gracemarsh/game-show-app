[Techdegree Project 6 - Game Show App](https://gracemarsh.github.io/game-show-app/)

# Game Show app

This is a browser version of “Wheel of Success”, a word guessing game where players will click letters from an onscreen keyboard to try to guess a random phrase.

Made with Javascript, there is an array of phrases that functions randomly choose a phrase from. JS then splits the into letters, and puts those letters onto the game board.

Each time the player guesses a letter, it is compared with the random phrase. If the letter is in the phrase, the game board updates with the chosen letters.

A player can keep choosing letters until they make five incorrect guesses. If the letter they chose isn’t in the phrase, the player loses 1 of their 5 guesses.

If the player completes the phrase before they run out of guesses, a winning screen will display. If the player guesses incorrectly 5 times, a losing screen will display.

A player can guess a letter only once. After they’ve guessed a letter, the program disables that letter.
