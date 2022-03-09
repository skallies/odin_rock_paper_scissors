
function playRound( playerSelection, computerSelection) {
   playerSelection = playerSelection[0].toUpperCase() + playerSelection.slice(1).toLowerCase();
   
   if (playerSelection === computerSelection){
      return 0;
      // return `It's a Tie! You both threw ${playerSelection}`;
   }
   let playerWins = (playerSelection === "Rock"     && computerSelection === "Scissors") ||
                    (playerSelection === "Paper"    && computerSelection === "Rock") ||
                    (playerSelection === "Scissors" && computerSelection === "Paper");
   return ( playerWins ? 1 : -1 );
}

// function test_playRound() {
//    console.log(playRound( "ROCK", "Rock" ));
//    console.log(playRound( "Rock", "Paper" ));
//    console.log(playRound( "Rock", "Scissors" ));
//    console.log(playRound( "PaPEr", "Rock" ));
//    console.log(playRound( "Paper", "Paper" ));
//    console.log(playRound( "PaPer", "Scissors" ));
//    console.log(playRound( "scissors", "Rock" ));
//    console.log(playRound( "Scissors", "Paper" ));
//    console.log(playRound( "Scissors", "Scissors" ));
// }

// Write a NEW function called game(). Call the playRound function 
// inside of this one to play a 5 round game that keeps score and 
// reports a winner or loser at the end. 
function game() {
   let playerWins = 0;
   let computerWins = 0;
   let computerResult = "undeclared";
   let playerResult = "undeclared";
   let gameResult = "undeclared";

   for (let i = 1; i <= 5; i++ ){
      playerResult = "undeclared";
      computerResult = computerPlay();

      while (["rock", "paper", "scissors"].includes(playerResult.toLowerCase()) == false) {
         playerResult = prompt(`Round ${i}... Go!! (Rock Paper Scissors)`);
      }   
      
      gameResult = playRound( playerResult, computerResult );

      switch (gameResult) {
         case 1 :
            playerWins++;
            console.log( `You win round ${i}. ${playerResult} beats ${computerResult}` );
            break;
         case -1 :     
            computerWins++;
            console.log( `You lose round ${i}. ${computerResult} beats ${playerResult}`);    
            break;
         default :
            console.log( `You tied round ${i}. You both threw ${playerResult}` );
      }
   }
   gameOver( playerWins, computerWins );
   
}

function gameOver( playerWins, computerWins ){
   if (playerWins > computerWins) {
      console.log( `You win the game ${playerWins} to ${computerWins}` );  
   } else if (playerWins < computerWins) {
      console.log( `You lose the game ${computerWins} to ${playerWins}` );  
   } else {
      console.log( `It ends in a tie. ${playerWins} each.` );
   }
}


function computerPlay() {
   let randomFloat = Math.random() * 3;
   let play;
   switch (Math.floor(randomFloat)) {
      case 0: 
         play ="Rock";
         break;
      case 1:
         play ="Paper";
         break;
      default:
         play = "Scissors";
         break;    
   }
   return play;
}


game();