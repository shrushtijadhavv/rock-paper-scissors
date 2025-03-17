let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

// DOM elements
const resultElement = document.querySelector('.jsresult');
const choiceElement = document.querySelector('.jschoice');
const scoreElement = document.querySelector('.jsscore');
const moveButtons = document.querySelectorAll('.move-button');
const gameContainer = document.querySelector('.game-container');

function updateScoreele() {
    scoreElement.innerHTML = `Wins: ${score.wins} | Losses: ${score.losses} | Ties: ${score.ties}`;
    // Reset animations by removing classes
    resultElement.classList.remove('win-effect', 'lose-effect', 'tie-effect');
    moveButtons.forEach(button => {
        button.classList.remove('win-effect', 'lose-effect', 'tie-effect');
    });
}

// Initialize score display
updateScoreele();

function computerMove() {
    const randomNum = Math.random();
    let computerMove1;

    if (randomNum >= 0 && randomNum < 1/3) {
        computerMove1 = 'rock';
    } else if (randomNum >= 1/3 && randomNum < 2/3) {
        computerMove1 = 'paper';
    } else if (randomNum >= 2/3 && randomNum < 1) {
        computerMove1 = 'scissors';
    }
    return computerMove1;
}

function resetScore() {
    // Add animation to the reset button
    const resetButton = document.querySelector('.reset-score-button');
    resetButton.classList.add('move-animation');
    
    // Reset score
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    
    // Clear local storage
    localStorage.removeItem('score');
    
    // Update score display
    updateScoreele();
    
    // Clear result and choice displays
    resultElement.textContent = '';
    choiceElement.textContent = '';
    
    // Remove animation class after animation completes
    setTimeout(() => {
        resetButton.classList.remove('move-animation');
    }, 500);
}

function playgame(playerMove) {
    // Add animation to the clicked button
    const buttonId = `${playerMove}-button`;
    const clickedButton = document.getElementById(buttonId);
    clickedButton.classList.add('move-animation');
    
    // Get computer move
    const computerMove1 = computerMove();
    let result = '';
    
    // Determine the result
    if (playerMove === 'rock') {
        if (computerMove1 === 'rock') {
            result = 'TIE';
        } else if (computerMove1 === 'paper') {
            result = 'LOSE';
        } else if (computerMove1 === 'scissors') {
            result = 'WIN';
        }
    }

    if (playerMove === 'paper') {
        if (computerMove1 === 'rock') {
            result = 'WIN';
        } else if (computerMove1 === 'paper') {
            result = 'TIE';
        } else if (computerMove1 === 'scissors') {
            result = 'LOSE';
        }
    }

    if (playerMove === 'scissors') {
        if (computerMove1 === 'rock') {
            result = 'LOSE';
        } else if (computerMove1 === 'paper') {
            result = 'WIN';
        } else if (computerMove1 === 'scissors') {
            result = 'TIE';
        }
    }

    // Update score
    if (result === 'WIN') {
        score.wins++;
    } else if (result === 'LOSE') {
        score.losses++;
    } else if (result === 'TIE') {
        score.ties++;
    }

    // Apply appropriate effect class based on result
    setTimeout(() => {
        // Remove animation class
        clickedButton.classList.remove('move-animation');
        
        // Add result-specific effect
        if (result === 'WIN') {
            clickedButton.classList.add('win-effect');
            resultElement.classList.add('win-effect');
            gameContainer.style.backgroundColor = 'rgba(46, 213, 115, 0.1)';
        } else if (result === 'LOSE') {
            clickedButton.classList.add('lose-effect');
            resultElement.classList.add('lose-effect');
            gameContainer.style.backgroundColor = 'rgba(255, 71, 87, 0.1)';
        } else {
            clickedButton.classList.add('tie-effect');
            resultElement.classList.add('tie-effect');
            gameContainer.style.backgroundColor = 'rgba(254, 211, 48, 0.1)';
        }
        
        // Reset background color after a delay
        setTimeout(() => {
            gameContainer.style.backgroundColor = '';
        }, 1000);
    }, 500);

    // Update display elements with results
    resultElement.innerHTML = `You ${result}!`;
    choiceElement.innerHTML = `You chose <strong>${playerMove}</strong> | Computer chose <strong>${computerMove1}</strong>`;
    
    // Update score display
    updateScoreele();
    
    // Save score to local storage
    localStorage.setItem('score', JSON.stringify(score));
}