# ultimate-checkers

## Description

My project is a simple game of checkers. It is ultimatly a version of checkers that is mainly ment to be enjoyed
between two players playing on a single phone or tablet sitting across from each other.

preview: https://deeerab.github.io/ultimate-checkers/

### future plans:

- add a computer player
- add a multiplayer option
- add perks to the game

## variables

- `board` = creates an array of the checkers board. This array numbers the occupied
  spaces and the lables the empty ones as `null`.

- `cells` = defines `cells` as the `id` `board-square`.

- `redsPieces` = defines `redsPieces` as the `id` `red`.

- `blacksPieces` = defines `blackPieces` as the `id` `black`.

- `redTurnText` = defines `redTurnText` as the `class` `.red-turn-text`.

- `blackTurnText` = defines `blackTurnText` as the `class` `.black-turn-text`.

- `turn` = bool(true).

- `redScore` = **0**, starts at **0** then increase as pieces are taken.

- `blackScore` = **0**, starts at **0** then increase as pieces are taken.

- `playerPieces` = **any**, used later to define players piece count.

- `selectedPiece` = A **object** that is applyed to every piece that is selected
  as their inital state.

## functions

- `findPiece(pieceId)` = passed the `pieceId` (-1). This is then parsed from a string
  to a integer then returned as the pieces place on the board.

- `applyEvents()` = itterates through the length of of the array "redPieces" or
  "blackPieces" and adds a click event so these pieces can be moved, also triggers getPlayerCount.

- `getPlayerCount()` = gets the count on the `redPieces` or the `blackPieces` that have
  been taken.

- `removeCellOnClick()` = removes "onclick" from the pices that have been removed
  from the board.

- `resetBorders()` = resets the boarder if you select a different piece, or after you make your move.
  Also triggers `resetSelectedPieceProperties()` and `getSelectedPiece()`.

- `resetSelectedPieceProperties()` = resets the inital state of a piece once it is move
  or once it is deselected.

- `getSelectedPiece()` = takes the inital piece state gives the the pieceId, finds it
  on the board then checks to see if the piece is a king.

- `isPieceKing()` = checks for class name `king`. Then sets a boolean of if the piece
  is a king or not.

- `getAvailableSpaces()` = gets the available spaces for the piece to move to that has been
  selected.

- `checkAvaialbleJumpSpaces()` = checks to see if the piece can jump over another piece.
  if it can it will return the available spaces.

- `checkPieceConditions()` = Checks to see if the selected piece is a king. If it is not a `king`
  then it will restrict the possible moves to the available spaces.

- `givePieceBorder()` = gives the selected piece a border.

- `giveCellsClick()` = gives the cells a `onClick` event.

- `makeMove()` = moves the piece to the selected space.

- `changeData()` = changes the data on the board. Changes score counter, adds to the progress bar,
  moves a players piece to the apponents side of the screen if a piece has been taken, then changes
  the turn text.

- `removeEventListeners()` = removes the event listeners from the pieces.

- `checkForWin()` = checks to see if the player has won.

- `changePlayer()` = changes the player turn.

### media queries

```
@media screen and (min-width: 768px) {
  main {
    flex-direction: row;
  }
}
```

```
@media screen and (max-width: 768px) {
  .red-wrapper {
    transform: rotate(180deg) scaleX(1);
  }
}
```

## Three main features of the game:

### CSS features

- `:nth-child` = Used to color the board.

```
.game-board tr:nth-child(odd) td:nth-child(odd) {
  background: gray;
}

.game-board tr:nth-child(even) td:nth-child(even) {
  background: gray;
}
```

### JS features

- Declare 3 or more variables.

```
let turn = true;
let redScore = 0;
let blackScore = 0;
```

- Allow the user to rearrage or move items by clicking on and dragging and element.

```
const getSelectedPiece = () => {
  selectedPiece.pieceId = parseInt(event.target.id);
  selectedPiece.indexOfBoardPiece = findPiece(selectedPiece.pieceId);
  isPieceKing();
};
```

```
const makeMove = (number) => {
  document.getElementById(selectedPiece.pieceId).remove();
  cells[selectedPiece.indexOfBoardPiece].innerHTML = "";
  if (turn) {
    if (selectedPiece.isKing) {
      cells[
        selectedPiece.indexOfBoardPiece + number
      ].innerHTML = `<div class="red king" id="${selectedPiece.pieceId}"></div>`;
      redsPieces = document.querySelectorAll(".red");
    } else {
      cells[
        selectedPiece.indexOfBoardPiece + number
      ].innerHTML = `<div class="red" id="${selectedPiece.pieceId}"></div>`;
      redsPieces = document.querySelectorAll(".red");
    }
  } else {
    if (selectedPiece.isKing) {
      cells[
        selectedPiece.indexOfBoardPiece + number
      ].innerHTML = `<div class="black king" id="${selectedPiece.pieceId}"></div>`;
      blacksPieces = document.querySelectorAll(".black");
    } else {
      cells[
        selectedPiece.indexOfBoardPiece + number
      ].innerHTML = `<div class="black" id="${selectedPiece.pieceId}"></div>`;
      blacksPieces = document.querySelectorAll(".black");
    }
  }

  let indexOfPiece = selectedPiece.indexOfBoardPiece;
  if (number === 14 || number === -14 || number === 18 || number === -18) {
    changeData(indexOfPiece, indexOfPiece + number, indexOfPiece + number / 2);
  } else {
    changeData(indexOfPiece, indexOfPiece + number);
  }
};
```
