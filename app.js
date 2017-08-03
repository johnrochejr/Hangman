const express = require('express');
const fs = require('fs');
const mustacheExpress = require('mustache-express');
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');

const app = express();

app.use(express.static('public'));

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

// Detrack amount of guesses from 8

app.post('/guess', (req, res) => {
  gameData = req.session;
  gameData.guess = req.body.guess;
  for (var i = 0; i < gameData.underScores.length; i++) {
    if (gameData.actualWord[i] === gameData.guess) {
      gameData.underScores[i] = gameData.guess;
    }
  };
  gameData.history.push(gameData.guess)
  gameData.remaining = 8 - gameData.history.filter((guess) => !gameData.actualWord.includes(guess)).length;
  res.render('home', gameData);
});

app.get('/', (req, res) => {
  gameData = req.session;
  gameData.history = [];
  gameData.remaining = 8;
  gameData.actualWord = wordForGame();
    console.log(gameData.actualWord);
  gameData.underScores = gameData.actualWord.split("").map(letter => {
    return letter = "_";
  })
  res.render('home', gameData);
});

app.listen(3000, () => {
  console.log('Port 3000 we are go for launch!');
});
