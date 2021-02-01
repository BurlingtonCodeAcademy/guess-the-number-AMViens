/*This Program asks the user to play a game with the computer.
The computer thinks of a number between a range provided by the user
and the user has to guess the number. The object is to guess the correct
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


start();

//start game with async function
async function start() {
  console.log(
    "Let's play a game where I (computer) make up a number and you (human) try to guess it."
  );
  let min = 1;//initializing global variable


  //Letting the user choose the range of numbers
  let maxNum = await ask("Please select the maximum range 100 or less...");
  maxNum = +maxNum;


  //Making sure the value given is acceptable
  while (isNaN(maxNum) || maxNum < min || maxNum > 100) {
    maxNum = await ask("Unacceptable Value, Please do try again");
  }


  //Computer chooses a random number between the given range
  let secretNumber = randomInt(min, maxNum);
  console.log("I will think of a number between " +
      min +
      " and " +
      maxNum +
      " and you try to guess it...");

  //shows computers randomGuess for testing purposes
  //console.log  +secretNumber ;


  //declare newGuess and user chooses a number
    let newGuess = await ask("What's your guess?");


    //loop starts and continues by letting user know every time number is higher than users guess
    while (newGuess !== secretNumber && newGuess < secretNumber){
        newGuess = await ask("The number is higher, what's your guess?")
            
    }

    //loop continues letting user know if number is lower
    while (newGuess !== secretNumber && newGuess > secretNumber){
        newGuess = await ask("The number is lower, what's your guess?")
            
    }

    //users guesses correct and game ends
    while (newGuess === +secretNumber){
        console.log("Yay!! You guessed it! Nice job.");
        return process.exit();
    }
  }

  //function to generate random integer for computers initial number
  function randomInt(min, max) {
    let range = max - min + 1
    let randInt = Math.floor(Math.random() * range) + min
    return randInt
}