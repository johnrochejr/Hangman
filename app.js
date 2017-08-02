const express = require('express');
const fs = require('fs');
const mustacheExpress = require('mustache-express');
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');

const app = express();

app.use (
  session ({
    secret: 'tame impala',
    resave: false,
    saveUninitialized: true
  })
);

app.engine('mst', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mst');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const randomWord = (Math.floor(Math.random() * words.length));
const wordForGame = () => {
  return words[randomWord];
};

app.post('/guess', (req, res) => {
  gameData = req.session;
  gameData.guess = req.body.guess;
  for (var i = 0; i < gameData.underScores.length; i++) {
    if (gameData.actualWord[i] === gameData.guess) {
      gameData.underScores[i] = gameData.guess
    }
  }
  console.log(gameData.guess);
  res.render('home', gameData);
});

app.get('/', (req, res) => {
  gameData = req.session
  gameData.actualWord = wordForGame()
  console.log(gameData.actualWord)
  gameData.underScores = gameData.actualWord.split("").map(letter => {
    return letter = "_"
  })
  res.render('home', gameData);
});

app.listen(3000, () => {
  console.log('Port 3000 we are go for launch!');
});


// console.log(wordForGame);
// console.log(Math.floor(Math.random() * words.length));
// console.log(wordForGame);

// make an array that creates _s for as many letters that
// our random word is

// test forLoop
// console.log(underScores);
// console.log(wordForGame);

// let gameData =
//
// {
//   wordforGame: wordForGame,
//   underScores: underScores,
//   guess: guess
// };

// How do I accept input (guess) as a variable from form,
// and store 'guess' in session?
