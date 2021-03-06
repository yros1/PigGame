/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

init();

var lastDice;

// document.querySelector('#winning-score').addEventListener('input', function() {
//     winningScore = document.querySelector('#winning-score').value;
//     console.log("winningScore " + winningScore);
// });

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        // 1. Random number
        // dice - hold random number for 1 to 6.
        dice1 = Math.floor(Math.random() * 6) + 1;
        dice2 = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        document.getElementById('dice-1').style.display = 'block'; // we can see it
        document.getElementById('dice-2').style.display = 'block'; // we can see it
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        // 3. Update the round score IF the rolled number was NOT a 1
        if ( dice1 !== 1 && dice2 !== 1) {
            // Add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } 
        else {
            // Next player
            nextPlayer();
        }
        // if (dice === lastDice === 6) {
        //     // Player loses score
        //     scores[activePlayer] = 0;
        //     // Updaye UI
        //     document.querySelector('#score-' + activePlayer).textContent = '0';
        //     // Next player turn
        //     nextPlayer();

        // } else if ( dice !== 1) {
        //     // Add score
        //     roundScore += dice;
        //     document.querySelector('#current-' + activePlayer).textContent = roundScore;
        // } 
        // else {
        //     // Next player
        //     nextPlayer();
        // }

        // // store dice number to use it when another dice number gets generated
        // lastDice = dice;
    }
});

document.querySelector('.btn-hold').addEventListener('click', () => {
    console.log('Hold After dice = ' + dice1);
    console.log('Hold After dice = ' + dice2);    
    console.log('Hold After gamePlaying = ' + gamePlaying);

    if (gamePlaying) 
    {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;
        console.log('scores[0] = ' + scores[0]);
        console.log('scores[1] = ' + scores[1]);    

        // Update the UI
        // change active player score nmber
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];    
        
        var input = document.querySelector('.final-score').value;
        var winningScore;

        // Undefined, 0, null or "" are COERCED to false
        // Anything else is COERSED to true
        if (input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        // Check if player won the game.
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            // remove dice
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            // remove active style from current player        
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            // player wins a game, game is finished
            gamePlaying = false;
        }
        else
        {
            // Next player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
    // activePlayer = activePlayer === 0 ? 1 : 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';        
    

    // classList.toggle. If class name exist then remove it. if isnt then add it
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // remove , add class name from html element
    // document.querySelector('.player-0-panel').classList.remove('active');
    // document.querySelector('.player-1-panel').classList.add('active');

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0; // 0 is a FirstPlayer, 1 is a SecondPlayer
    gamePlaying = true;

    // use . if referece to css class name
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    // For getting html elements by theirs id we can use getElementById instead querySelector.
    // In that case we dont need to add # for id name.
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');    
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}





// set value to htlm element. Use # if referece to css id name
//document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

// get value from htlm element. Use # if referece to css id name
//var x = document.querySelector('#score-0').textContent;