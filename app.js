const express = require('express');
const fs = require('fs');
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");

const app = express();

// Step 1: Below, we took the 'words' variable (array) which constitutes the dictionary
// ranomWord is a variable that is comprised of a random selection of
// ... words.length (a random [index] will be pulled)
// We then place the random [index] into our 'words' array to pull a random
// [index] which will emerge in the form of a random word
const randomWord = (Math.floor(Math.random() * words.length));
const wordForGame = words[randomWord];
// console.log(wordForGame);
// console.log(Math.floor(Math.random() * words.length));
// console.log(wordForGame);

// make an array that creates _s for as many letters that
// our random word is
let underScores = [];

for (let i = 0; i < wordForGame.length; i++) {
  underScores.push('_');
}

console.log(underScores);
console.log(wordForGame);


app.get('/', (req, res) => {
  // console.log(words);
  res.send('Hi home whats up??');
});

app.listen(3000, () => {
  console.log('Port 3000 we are go for launch!');
});
