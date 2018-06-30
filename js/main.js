var startScreen = document.getElementById('start');
var boardScreen = document.getElementById('board');
var finishScreen = document.getElementById('finish');
var player1 = document.getElementById('player1');
var player2 = document.getElementById('player2');

// *START SCREEN* //

// Hide the board and finish screen, showing start screen
// Add event listener to button which shows board screen upon click
// Initialise player 1 as active
boardScreen.style.display = 'none';
finishScreen.style.display = 'none';
var playerName = prompt("Please enter your name");
document.querySelector('.button').addEventListener('click', (e) => {
  startScreen.style.display = 'none';
  boardScreen.style.display = 'block';
});
player1.classList.add('active');

// *BOARD SCREEN* //

var boxes = document.getElementsByClassName('box');
var nameDisplay = document.getElementById('name');
nameDisplay.innerHTML = playerName + "'s turn";

// For all boxes that are empty
  // Add hover on event listener
    // If player 1 active and box is empty
      // Show player 1's symbol (greyed)
  // Add hover off event listener
  // Add click event listener
    // If player 1 active and box is empty
      // Show player 1's symbol (colored)
      // Remove active class
      // Check if player 1 is winner
for (let i = 0; i < boxes.length; i++) {
  boxes[i].addEventListener('mouseover', function() {
    if (player1.classList.contains('active') && boxIsEmpty(boxes[i])) {
      boxes[i].style.backgroundImage = "url('img/o.svg')";
    }
  }, false);
  boxes[i].addEventListener('mouseout', function() {
    boxes[i].style.backgroundImage = "";
  }, false);
  boxes[i].addEventListener('click', (e) => {
    if (player1.classList.contains('active') && boxIsEmpty(boxes[i])) {
      boxes[i].classList.add('box-filled-1');
      player1.classList.remove('active');
      checkForWin('player1');
    }
  });
}

// If player 1
  // Make player 2 inactive
  // Make player 1 active
  // Show player 1's name
// If player 2
  // Make player 1 inactive
  // Make player 2 active
  // Show player 2's name
  // Make player 2 choose a square after 2 seconds
function switchTurn(player) {
  if (player == 'player1') {
    player2.classList.remove('active');
    player1.classList.add('active');
    nameDisplay.innerHTML = playerName + "'s turn";
  } else if (player == "player2") {
    player1.classList.remove('active');
    player2.classList.add('active');
    nameDisplay.innerHTML = "Computer's turn";
    setTimeout(() => computerTurn(), 2000);
  }
}

// If player 2 has a potential winning choice
  // Choose square that wins for player 2
// Else if player 1 has a potential winning choice
  // Choose square that prevents win for player 1
// Else
  // Choose a random empty square
// Check if player 2 has won
function computerTurn() {
  var chosenSquare;
  if (findWinningChoice('box-filled-2') != false) {
    chosenSquare = findWinningChoice('box-filled-2');
    chosenSquare.classList.add('box-filled-2');
  } else if (findWinningChoice('box-filled-1') != false) {
    chosenSquare = findWinningChoice('box-filled-1');
    chosenSquare.classList.add('box-filled-2');
  } else {
    var emptySquares = getEmptyBoxes();
    chosenSquare = emptySquares[Math.floor(Math.random() * emptySquares.length)];
    chosenSquare.classList.add('box-filled-2');
  }
  checkForWin('player2');
}

// If player 1 has 2 squares in the same row
  // Place a square in that row where empty
// Else if player 1 has 2 squares in the same column
  // Place a square in that column where empty
// Else if player 1 has 2 squares in one of the corner squares and/or the
// middle square
  // Place a square in a corner/middle square where empty
function findWinningChoice(symbol) {
  if (checkHorizontal(symbol, 2) != false) {
    return checkHorizontal(symbol, 2);
  } else if (checkVertical(symbol, 2) != false) {
    return checkVertical(symbol, 2);
  } else if (checkDiagonal(symbol, 2) != false) {
    return checkDiagonal(symbol, 2);
  } else {
    return false;
  }
}

// Checks whether the box does not have player 1's symbol nor
// player 2's symbol
function boxIsEmpty(box) {
  if ((box.classList.contains('box-filled-1') == false) &&
  (box.classList.contains('box-filled-2') == false)) {
    return true;
  }
}

// Return all empty boxes
function getEmptyBoxes() {
  var emptyBoxes = []
  for (let i = 0; i < boxes.length; i++) {
    if (boxIsEmpty(boxes[i])) {
      emptyBoxes.push(boxes[i]);
    }
  }
  return emptyBoxes;
}

// Check all directions of board for 3-in-a-row matches of player's symbol
  // If there are any matches
    // Remove class of active from player and switch to the win/lose screen
  // Else
    // Check for draw
function checkForWin(player) {
  if (player == 'player1') {
    if (checkHorizontal('box-filled-1', 3) || checkVertical('box-filled-1', 3)
    || checkDiagonal('box-filled-1',  3)) {
      player1.classList.remove('active');
      finishScreen.classList.add('screen-win-one');
      finishScreen.style.display = 'block';
      document.querySelector('.message').append(playerName + ", you win!");
    } else {
      checkForDraw('player2');
    }
  } else if (player == 'player2') {
    if (checkHorizontal('box-filled-2', 3) || checkVertical('box-filled-2', 3)
    || checkDiagonal('box-filled-2', 3)) {
      finishScreen.classList.add('screen-win-two');
      player2.classList.remove('active');
      finishScreen.style.display = 'block';
      document.querySelector('.message').append("You lose!");
    } else {
      checkForDraw('player1');
    }
  }
}

// Checks whole board to see whether every square is filled
  // If so
    // Go to finish screen
  // Else
    // Switch turn to next player
function checkForDraw(nextPlayer) {
  var nonEmptyCount = 0;
  for (let i = 0; i < boxes.length; i++) {
    if (boxIsEmpty(boxes[i])) {
      break;
    } else {
      nonEmptyCount++;
    }
  }
  if (nonEmptyCount == 9) {
    finishScreen.classList.add('screen-win-tie');
    finishScreen.style.display = 'block';
    document.querySelector('.message').append("It's a tie!");
  } else {
    switchTurn(nextPlayer)
  }
}

// If num of squares searched for is 2
  // Loop through each row
    // If there is a row with 2 squares in it, return the empty one
// Else if num of squares searched for is 3
  // Loop through each row
    // If there's 3 same symbols in row, return true
function checkHorizontal(symbol, noSquares) {
  if (noSquares == 2) {
    var row = [];
    var emptySquare = null;
    for (let i = 0; i <= 6; i += 3) {
      row = [];
      emptySquare = null;
      for (let j = i; j <= i + 2; j += 1) {
        if (boxes[j].classList.contains(symbol)) {
          row.push(boxes[j]);
        } else if (boxIsEmpty(boxes[j])) {
          emptySquare = boxes[j];
        }
      }
      if (row.length == 2 && emptySquare != null) {
        return emptySquare;
      }
    }
    return false;
  } else if (noSquares == 3) {
    for (let i = 0; i <= 6; i += 3) {
      if (boxes[i].classList.contains(symbol) && boxes[i+1].classList.contains(symbol) &&
      boxes[i+2].classList.contains(symbol)) {
        return true;
      }
    }
  }
}

// If num of squares searched for is 2
  // Loop through each column
    // If there is a column with 2 squares in it, return the empty one
// Else if num of squares searched for is 3
  // Loop through each column
    // If there's 3 same symbols in column, return true
function checkVertical(symbol, noSquares) {
  if (noSquares == 2) {
    var col = [];
    var emptySquare = null;
    for (let i = 0; i <= 2; i += 1) {
      col = [];
      emptySquare = null;
      for (let j = i; j <= i + 6; j += 3) {
        if (boxes[j].classList.contains(symbol)) {
          col.push(boxes[j]);
        } else if (boxIsEmpty(boxes[j])) {
          emptySquare = boxes[j];
        }
      }
      if (col.length == 2 && emptySquare != null) {
        return emptySquare;
      }
    }
    return false;
  } else if (noSquares == 3) {
    for (let i = 0; i <= 2; i += 1) {
      if (boxes[i].classList.contains(symbol) && boxes[i+3].classList.contains(symbol) &&
      boxes[i+6].classList.contains(symbol)) {
        return true;
      }
    }
  }
}

// If num of squares searched for is 2
  // Loop through all squares
    // If it is a corner square or the middle square and is empty
      // If the two diagonally adjacent squares contain symbol
        // Return the square
// If num of squares searched for is 3
  // Check if middle square and the pairing of either top left + bottom right squares
  // or top right + bottom left squares contain same symbol
function checkDiagonal(symbol, noSquares) {
  if (noSquares == 2) {
    for (let i = 0; i < boxes.length; i++) {
      if (boxIsEmpty(boxes[i])) {
        if (i == 0) {
          if (boxes[i+4].classList.contains(symbol) &&
          boxes[i+8].classList.contains(symbol)) {
            return boxes[i];
          }
        } else if (i == 2) {
          if (boxes[i+2].classList.contains(symbol) &&
          boxes[i+4].classList.contains(symbol)) {
            return boxes[i];
          }
        } else if (i == 6) {
          if (boxes[i-2].classList.contains(symbol) &&
          boxes[i-4].classList.contains(symbol)) {
            return boxes[i];
          }
        } else if (i == 8) {
          if (boxes[i-4].classList.contains(symbol) &&
          boxes[i-8].classList.contains(symbol)) {
            return boxes[i];
          }
        } else if (i == 4) {
          if ((boxes[i-4].classList.contains(symbol) &&
          boxes[i+4].classList.contains(symbol)) ||
          (boxes[i-2].classList.contains(symbol) &&
          boxes[i+2].classList.contains(symbol))) {
            return boxes[i];
          }
        }
      }
    }
    return false;
  } else if (noSquares == 3) {
    if (boxes[4].classList.contains(symbol) && ((boxes[0].classList.contains(symbol)
    && boxes[8].classList.contains(symbol)) || (boxes[2].classList.contains(symbol)
    && boxes[6].classList.contains(symbol)))) {
      return true;
    }
  }
}

// *FINISH SCREEN* //

// Hide finish screen
// Show board screen reset with empty squares
// Make player 1 active
// Show player 1's name
finishScreen.firstElementChild.children[2].addEventListener('click', (e) => {
  finishScreen.style.display = 'none';
  boardScreen.style.display = 'block';
  document.querySelector('.message').innerHTML = '';
  if (finishScreen.classList.contains('screen-win-one')) {
    finishScreen.classList.remove('screen-win-one');
  } else if (finishScreen.classList.contains('screen-win-two')) {
    finishScreen.classList.remove('screen-win-two');
  }
  for (let i = 0; i < boxes.length; i++) {
    if (boxes[i].classList.contains('box-filled-1')) {
      boxes[i].classList.remove('box-filled-1');
    } else if (boxes[i].classList.contains('box-filled-2')) {
      boxes[i].classList.remove('box-filled-2');
    }
  }
  player1.classList.add('active');
  nameDisplay.innerHTML = playerName + "'s turn";
});
