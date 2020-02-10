/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, rollCounter, dice, savedDice, winningScore;
winningScore = 20;
savedDice = 0;

init();

document.querySelector('#winning-score').addEventListener('input', function() {
    winningScore = document.querySelector('#winning-score').value;
    console.log("winningScore " + winningScore);
});

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        // 1. Random number
        // dice - hold random number for 1 to 6.
        dice = Math.floor(Math.random() * 6) + 1;

        //dice = 6;
        console.log('\nInit dice = ' + dice);
        console.log('Init savedDice = ' + savedDice);

        //2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        // 3. Update the round score IF the rolled number was NOT a 1
        if (dice > 1)
        {
            if ( dice === 6) {
                // player lose points, change a player, resed savedDice
                if (savedDice === dice) {
                    // second time roll 6
                    // reset savedDice and rollCounter
                    dice = 0;
                    savedDice = 0;
                    console.log("\n Second 6 roll:: Reset savedDice:" + savedDice);
                    console.log('After dice = ' + dice);
                    console.log('After savedDice = ' + savedDice);
                    // lose point and update score for current player
                    scores[activePlayer] = 0;
                    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
                    // change player
                    nextPlayer();
                }    
                // save dice because it is 6, we need to count it
                else {
                    // first time roll 6
                    savedDice = dice;
                    console.log("\n First 6 roll:: Save savedDice:" + savedDice);
                    console.log('After dice = ' + dice);
                    console.log('After savedDice = ' + savedDice);
                    // Add score
                    roundScore += dice;
                    document.querySelector('#current-' + activePlayer).textContent = roundScore;
                } 
            } 
            else {
                // reset saved dice, when first time hit 6 but second time not.
                if (savedDice === 6){
                    savedDice = 0;
                    console.log("\n No 6 on second roll:: Reset savedDice:" + savedDice);
                    console.log('After dice = ' + dice);
                    console.log('After savedDice = ' + savedDice);
                }
                // Add score
                roundScore += dice;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            }

            // // Add score
            // roundScore += dice;
            // document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
        else
        {   
            // Next player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', () => {
    savedDice = 0;
    console.log('Hold After dice = ' + dice);
    console.log('Hold After savedDice = ' + savedDice);

    if (gamePlaying) 
    {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;
        console.log('scores[0] = ' + scores[0]);
        console.log('scores[1] = ' + scores[1]);    

        // Update the UI
        // change active player score nmber
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];    
        
        // Check if player won the game.
        if (scores[activePlayer] > winningScore - 1) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            // remove dice
            document.querySelector('.dice').style.display = 'none';
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
    activePlayer = activePlayer === 0 ? 1 : 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';        
    

    // classList.toggle. If class name exist then remove it. if isnt then add it
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // remove , add class name from html element
    // document.querySelector('.player-0-panel').classList.remove('active');
    // document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.dice').style.display = 'none';
}

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0; // 0 is a FirstPlayer, 1 is a SecondPlayer
    gamePlaying = true;

    // set winning score
    document.querySelector('#winning-score').value = winningScore;
    console.log("winningScore is " + winningScore);

    // use . if referece to css class name
    document.querySelector('.dice').style.display = 'none';

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