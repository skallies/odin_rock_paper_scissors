function getRoundResult( playerSelection, computerSelection) {
   let outcome = {
      result: '',
      text: ''
   }
   if (playerSelection === computerSelection){
      outcome.result = 'draw';
      outcome.text = `${playerSelection} cancels ${computerSelection}`;
      return outcome;
   }


   const playerWins = (playerSelection === "rock"     && computerSelection === "scissors") ||
                       (playerSelection === "paper"    && computerSelection === "rock") ||
                       (playerSelection === "scissors" && computerSelection === "paper");
   
   let winningChoice, losingChoice;
   let verb;

   if (playerWins) {
      outcome.result = 'win';
      winningChoice = playerSelection.toUpperCase();
      losingChoice = computerSelection.toUpperCase();
   } else {
      outcome.result = 'lose';
      winningChoice = computerSelection.toUpperCase();
      losingChoice = playerSelection.toUpperCase();
   }
   switch (winningChoice) {
      case "ROCK": 
         verb = 'breaks';
         break;
      case 'PAPER':
         verb = 'covers';
         break;
      case 'SCISSORS':
         verb = 'cuts';
         break;      
   }     
   outcome.text = `${winningChoice.toUpperCase()} ${verb} ${losingChoice.toUpperCase()}`;
   return outcome;
}

function showScore(playerScore, computerWins){
   playerBoard = document.querySelector('#player .score');
   playerBoard.textContent = playerScore;

   computerBoard = document.querySelector('#computer .score');
   computerBoard.textContent = computerWins;
}

function gameOver(playerScore, computerWins ){
   if (playerScore > computerWins) {
      displayResult( `You win the game ${playerScore} to ${computerWins}` );  
   } else if (playerScore < computerWins) {
      displayResult( `You lose the game ${computerWins} to ${playerScore}` );  
   } else {
      displayResult( `It ends in a tie. ${playerScore} each.` );
   }
}

function computerPlay() {
   let randomFloat = Math.random() * 3;
   let selection = "undeclared";
   switch (Math.floor(randomFloat)) {
      case 0: 
         selection = "rock";
         break;
      case 1:
         selection = "paper";
         break;
      default:
         selection = "scissors";
         break;    
   }
   return selection;
}

function logText(e) {
   console.log(this.id);
}

function updateScoreboard(roundResult) {
   switch (roundResult) {
      case 'win': scoreboard.player++;
            if (scoreboard.player === 5) scoreboard.gameover = true;
            break;
      case 'lose': scoreboard.computer++;
            if (scoreboard.computer === 5) scoreboard.gameover = true;
            break;
      default: break;      
   }
   scoreboard.round++;
}

function updateBattleBoard(playerChoice, computerChoice, roundResult) {
   const playerBoard = document.querySelector('#battleBoard .player');
   playerBoard.textContent = `${playerChoice.toUpperCase()}`;

   const computerBoard = document.querySelector('#battleBoard .computer');
   computerBoard.textContent = `${computerChoice.toUpperCase()}`;

   const resultBoard = document.querySelector('#outcome');
   resultBoard.textContent = `${roundResult.result.toUpperCase()}`;

   const resultMessage = document.querySelector('#message');
   resultMessage.textContent = `${roundResult.text}`;
}

// function clearBattleBoard
function clearBattleBoard() {
   const battleBoardSpans = document.querySelectorAll('#battleBoard > span');
   battleBoardSpans.forEach( function(span) {
      span.textContent = "";
   });
}

function resetBattleBoard() {
   const emptyResult = {
      result: '',
      text: ''
   }
   updateBattleBoard("Player", "Computer", emptyResult);
   const versus = document.querySelector('#versus');
   versus.textContent = 'versus';
}

function endGame(gameResult) {
   clearBattleBoard();
   const gameOverMessage = {
      result: gameResult,
      text: "Play again?"
   }
   updateBattleBoard( "", "", gameOverMessage );
}

function playRound(e) {
   if (scoreboard.gameover) return;
   const playerChoice = this.id;
   const computerChoice = computerPlay();
   
   const roundResult = getRoundResult(playerChoice, computerChoice);
   updateBattleBoard(playerChoice, computerChoice, roundResult);
   updateScoreboard(roundResult.result);
   updateDisplay();
   if (scoreboard.gameover) {
      const gameResult = (scoreboard.player === 5) ? "WIN" : "LOSE";
      endGame(`You ${gameResult}`);
   }
}

function resetGame() {
   resetBattleBoard();
   scoreboard.player = 0;
   scoreboard.computer = 0;
   scoreboard.round = 1;
   scoreboard.gameover = false;
   updateDisplay();
}

function updateDisplay() {
   
   const playerScoreboard = document.querySelector('#playerscore');
   playerScoreboard.textContent = `${scoreboard.player}`;

   const computerScoreboard = document.querySelector('#computerscore');
   computerScoreboard.textContent = `${scoreboard.computer}`;

   const currentRound = document.querySelector('#roundnumber');
   currentRound.textContent = `${scoreboard.round}`
}


let scoreboard = {
   player: 0,
   computer: 0,
   round: 0,
   gameover: false
}

const buttons = document.querySelectorAll('#buttons>button');
buttons.forEach(button => button.addEventListener('click', playRound));

const reset = document.querySelector('button#reset');
reset.addEventListener('click', resetGame);

resetGame();