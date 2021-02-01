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

//function to generate the computers guess. Although named randomGuess, I can predict the computers guess.
function randomGuess(min, max) {
  let range = max - min;
  let smartGuess = Math.floor(range / 2 + min);
  return smartGuess;
}

start();

//Start Game with async function
async function start() {

  console.log(
    "Let's play a game where you (human) make up a number and I (computer) try to guess it."
  );


  let min = 1;//initializing global variable


  //Letting the user choose the range of numbers
  let maxNum = await ask("Please select the maximum range 100 or less...");
  maxNum = +maxNum;


  //Making sure the value chosen is acceptable
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


  //Check number within given range for accuracy
  while (secretNumber > maxNum || secretNumber < min) {
    secretNumber = await ask("Noooooo!, That's impossible! Try again");
  }

  //shows number chosen by user
  console.log("You entered: " + secretNumber);


  //Computer guesses random number using the randomGuess function
  let firstGuess = randomGuess(min, maxNum);


  //initial loop while firstGuess is not correct
  while (firstGuess !== secretNumber) {

    //yesNo declared to answer if computer guess is correct yes or no
    let yesNo = await ask("Is your number" + firstGuess + "?");



    //if guess is correct answer yes and exit loop
    if (yesNo === "yes" || yesNo === "y") {
      yesNo = yesNo.toLowerCase();//sanitize input
      break;
    }

  //else if guess is incorrect answer no and continue
     else if (yesNo === "no" || yesNo === "n") {
      yesNo = yesNo.toLowerCase();//sanitize input
    }
  
    //higherLower is declared to answer if number is higher or lower than previous guess
    let higherLower = await ask("Is your number higher(h), or lower(l)");



    //if answer is higher modify function min value for new guess range
    if (higherLower === "higher" || higherLower === "h") {
      higherLower = higherLower.toLowerCase();//sanitize input
      min = firstGuess;


      //else if answer is lower modify function maxNum value for new guess range
    } else if (higherLower === "lower" || higherLower === "l") {
      higherLower = higherLower.toLowerCase();//sanitize input
      maxNum = firstGuess;
    }
  
    //declare firstGuess to accept new guess range min or max
    firstGuess = randomGuess(min, maxNum);
  }
  //End of loop iterations until computer guess is correct


  //Congratulate computer and ask to play again
  let reStart = await ask(
    'Yay!! you guessed it!\nWould you like to play again, "yes" or "no"?'
  );

  //If answer yes start over
  if (reStart == "yes" || reStart === "y") {
    reStart = reStart.toLowerCase();
    start();

  //else quit
  } else return process.exit();
}
