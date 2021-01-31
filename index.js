/*This Program asks the user to play a game with the computer.
The user has the option to either let the computer guess a number,
or the user guesses a number. The object is to guess the correct
number with the least amount of tries possible.*/

/*JavaScript library readline
load readline package, name it readline
create readline interface using standard in and standard out*/
const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

//ask function uses Promise API to ask and wait for user input
function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}
function randomGuess(min, max) {
  let range = max - min;
  let smartGuess = Math.floor(range / 2 + min);
  return smartGuess;
}

start();

async function start() {
  //Start Game
  console.log(
    "Let's play a game where you (human) make up a number and I (computer) try to guess it."
  );
  let min = 1;

  //Letting the user choose the range of numbers
  let maxNum = await ask("Please select the maximum range 100 or less...");
  maxNum = +maxNum;
  //Making sure the value given is acceptable
  while (isNaN(maxNum) || maxNum < min || maxNum > 100) {
    maxNum = await ask("Unacceptable Value, Please do try again");
  }
  //User chooses a number between the given range
  let secretNumber = await ask(
    "Think of a number between " +
      min +
      " and " +
      maxNum +
      " and I will try to guess it..."
  );
  //Check for number within given range
  while (secretNumber > maxNum || secretNumber < min) {
    secretNumber = await ask("Noooooo!, That's impossible! Try again");
  }
  console.log("You entered: " + secretNumber);

  //Computer guesses random number

  let firstGuess = randomGuess(min, maxNum);

  while (firstGuess !== secretNumber) {
    let yesNo = await ask("Is your number" + firstGuess + "?");

    if (yesNo === "yes" || yesNo === "y") {
      break;
    } else if (yesNo === "no" || yesNo === "n") {
      yesNo = yesNo.toLowerCase();
    }
    let higherLower = await ask("Is your number higher(h), or lower(l)");

    if (higherLower === "higher" || higherLower === "h") {
      higherLower = higherLower.toLowerCase();

      min = firstGuess;
    } else if (higherLower === "lower" || higherLower === "l") {
      higherLower = higherLower.toLowerCase();

      maxNum = firstGuess;
    }
    firstGuess = randomGuess(min, maxNum);
  }

  //stuck trying to figure out how to compare higher and lower to run random guessing function again

  let reStart = await ask(
    'Yay!! you guessed it!\nWould you like to play again, "yes" or "no"?'
  );
  if (reStart == "yes" || reStart === "y") {
    reStart = reStart.toLowerCase();
    start();
  } else return process.exit();
}
