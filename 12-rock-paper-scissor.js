const scores = JSON.parse(localStorage.getItem('scores')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

let isAutoPlaying = false;
let intervalId;

function AutoPlay(){
  
    if(!isAutoPlaying){
      intervalId = setInterval(function(){
        const playerMove = pickComputerMove();
        playGame(playerMove);
      }, 1000);
      isAutoPlaying = true;
    }else{
      clearInterval(intervalId);
      isAutoPlaying = false;
    }
    
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('Rock');
})
document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('Paper');
})
document.querySelector('.js-scissor-button').addEventListener('click', () => {
  playGame('Scissor');
})

document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r'){
    playGame('Rock')
  }else if(event.key === 'p'){
    playGame('Paper')
  }else if(event.key === 's'){
    playGame('Scissor')
  }
})



function playGame(playerMove){
    const computerMove = pickComputerMove();
    let result = '';

    if(playerMove === 'Rock'){
        if(computerMove === 'Rock'){
          result = 'Tie';
        }
        else if(computerMove === 'Paper'){
          result = 'You Lose!'
        }
        else if(computerMove === 'Scissor'){
          result = 'You Win!'
        }
      }
    else if(playerMove === 'Paper'){
        if(computerMove === 'Paper'){
          result = 'Tie';
        }
        else if(computerMove === 'Scissor'){
          result = 'You Lose!'
        }
        else if(computerMove === 'Rock'){
          result = 'You Win!'
        }
      }
    else if(playerMove === 'Scissor'){
        if(computerMove === 'Scissor'){
          result = 'Tie';
        }
        else if(computerMove === 'Rock'){
          result = 'You Lose!'
        }
        else if(computerMove === 'Paper'){
          result = 'You Win!'
        }  
      }

      if(result === 'You Win!'){
        scores.wins += 1;
      }else if(result === 'You Lose!'){
        scores.losses += 1;
      }else if(result === 'Tie'){
        scores.ties += 1;
      }

      localStorage.setItem('scores', JSON.stringify(scores));

      updateScoreElement();

      document.querySelector('.js-result')
      .innerHTML = result;

      document.querySelector('.js-moves')
      .innerHTML = `You 
        <img src="rock-paper-scissor image/${playerMove}-emoji.png"
        class="move-icon">
        <img src="rock-paper-scissor image/${computerMove}-emoji.png" class="move-icon">
        Computer`;

   }

function updateScoreElement(){
  document.querySelector('.js-scores')
  .innerHTML = `Wins: ${scores.wins}, Losses: ${scores.losses}, Ties: ${scores.ties}`;
}   

function pickComputerMove(){
  const randomNumber = Math.random();

  let computerMove = '';

  if(randomNumber >=0 && randomNumber <= 1/3){
    computerMove = 'Rock';
  }
  else if(randomNumber >= 1/3 && randomNumber <= 2/3){
    computerMove = 'Paper';
  }
  else if(randomNumber >=2/3 && randomNumber <= 1){
    computerMove = 'Scissor'
  }

console.log(computerMove);
return computerMove;
}