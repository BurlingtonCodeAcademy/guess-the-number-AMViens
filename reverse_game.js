const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

//ask function uses Promise API to ask and wait for user input
function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}
const min = 1;

start();

async function start() { //Start Game
  console.log(
    "Let's play a game where I (computer) make up a number and you (human) try to guess it."
  );

  //Letting the user choose the range of numbers
  let maxNum = await ask("Please select the maximum range 100 or less...");
  maxNum = +maxNum;
  //Making sure the value given is acceptable
  while (isNaN(maxNum) || maxNum < min || maxNum > 100) {
    maxNum = await ask("Unacceptable Value, Please do try again");
  }
  //User chooses a number between the given range
  let secretNumber = randomInt(min, maxNum);
  console.log("I will think of a number between " +
      min +
      " and " +
      maxNum +
      " and you try to guess it...");
  console.log(+secretNumber);
    let newGuess = await ask("What's your guess?");
    while (newGuess !== secretNumber && newGuess < secretNumber){
        newGuess = await ask("The number is higher, what's your guess?")
            
    }
    while (newGuess !== secretNumber && newGuess > secretNumber){
        newGuess = await ask("The number is lower, what's your guess?")
            
    }
    while (newGuess === +secretNumber){
        console.log("Yay!! You guessed it! Nice job.");
        return process.exit();
    }
  }
  function randomInt(min, max) {
    let range = max - min + 1
    let randInt = Math.floor(Math.random() * range) + min
    return randInt
}