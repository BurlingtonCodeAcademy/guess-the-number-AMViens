/*This Program asks the user to play a game with the computer.
The user selects a range and picks a number and the computer 
tries to guess the number.The object is to guess the correct
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

//function to generate the computers guess. Although named randomGuess, I can predict the computers guess...ha ha ha!
function randomGuess(min, max) {
  let range = max - min;
  let smartGuess = Math.floor(range / 2 + min);
  return smartGuess;
}

start();

//Start Game with async function
async function start() {

    let chooseGame = await ask("Would you like to guess a number chosen by the computer, or would you like the computer to guess a number chosen by you? Please enter accordingly, either 1 or 2, thankyou. ");

    if (chooseGame == 1){


      start();

      async function start(){

  console.log(
    "Let's play a game where you (human) make up a number and I (computer) try to guess it."
  );

  //initializing variables
  let guess = 0;
  let min = 1;


  //Letting the user choose the range of numbers
  let maxNum = await ask("Please select the maximum range 100 or less...");
  maxNum = +maxNum;


  //Guard clause making sure the value chosen is acceptable
  while (isNaN(maxNum) || maxNum < min || maxNum > 100) {
    maxNum = await ask("Unacceptable Value, Please do try again");
    maxNum = +maxNum;
  }


  //User chooses a number between the given range
  let secretNumber = await ask(
    "Think of a number between " +
      min +
      " and " +
      maxNum +
      " and I will try to guess it..."
  );


  //Guard clause to check number within given range for accuracy
  while (secretNumber > maxNum || secretNumber < min) {
    secretNumber = await ask("Noooooo!, That's impossible! Try again");
  }

  //shows number chosen by user
  console.log("You entered: " + secretNumber);


  //Computer guesses random number using the randomGuess function
  let compGuess = randomGuess(min, maxNum);


  //initial loop while firstGuess is not correct
  while (compGuess !== secretNumber) {

    guess++;//adds guess each iteration

    //yesNo declared to answer if computer guess is correct yes or no
    let yesNo = await ask("Is your number" + compGuess + "?");



    //if guess is correct answer yes and exit loop
    if (yesNo === "yes" || yesNo === "y") {
      yesNo = yesNo.toLowerCase();//sanitize input
      break;
    }

  //else if guess is incorrect answer no and continue
    if (yesNo === "no" || yesNo === "n") {
      yesNo = yesNo.toLowerCase();//sanitize input
    }
    
  
    //higherLower is declared to answer if number is higher or lower than previous guess
    let higherLower = await ask("Is your number higher(h), or lower(l)");



    //if answer is higher modify function min value for new guess range
    if (higherLower === "higher" || higherLower === "h") {
      higherLower = higherLower.toLowerCase();//sanitize input
      min = compGuess;


      //else if answer is lower modify function maxNum value for new guess range
    } else if (higherLower === "lower" || higherLower === "l") {
      higherLower = higherLower.toLowerCase();//sanitize input
      maxNum = compGuess;
    }

    
  
    //declare firstGuess to accept new guess range min or max
    compGuess = randomGuess(min, maxNum);
  }
  //End of loop iterations until computer guess is correct


  //Congratulate computer and ask to play again
  let reStart = await ask(
    "Yay!! you guessed it in " + guess + " guesses.\nWould you like to play again, 'yes' or 'no'?"
  );

  //yes start over
  if (reStart == "yes" || reStart === "y") {
    reStart = reStart.toLowerCase();
    start();

  //else quit
  } else return process.exit();
}
  

  } else if (chooseGame == 2) {
    function randomInt(min, max) {
      let range = max - min + 1
      let randInt = Math.floor(Math.random() * range) + min
      return randInt
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
    
    
      //Guard clause making sure the value given is acceptable
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
    
      let guess = 0;//initializing guess variable
    
      //declare newGuess and user chooses a number
        let newGuess = await ask("What's your guess?");
    
        //start looping while user guess is not equal to computer number
        while(newGuess !== secretNumber){
        guess++;//adds a guess each iteration
    
    
        //else continues by letting user know number is higher
        if (newGuess !== secretNumber && newGuess < secretNumber){
            newGuess = await ask("The number is higher, what's your guess?")
        }      
        
    
        //loop continues letting user know if number is lower
        else if (newGuess !== secretNumber && newGuess > secretNumber){
            newGuess = await ask("The number is lower, what's your guess?")
                
        }
    
        //users guesses correct and learns how many guesses it took, game ends
        if (newGuess == secretNumber){
          guess = guess + 1;
            console.log("Yay!! You guessed it in " + guess + " guesses! Nice job.");
            break;
        }
      }
    
      //Ask user to play again
      let reStart = await ask(
        'Would you like to play again, "yes" or "no"?'
      );
    
      //If answer yes start over
      if (reStart == "yes" || reStart === "y") {
    
        reStart = reStart.toLowerCase();//sanitize input
        start();
    
      //else quit
      } else return process.exit();
    }

  }
    







}