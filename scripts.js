// Game state data
const board = [
  null,
  0,
  null,
  1,
  null,
  2,
  null,
  3,
  4,
  null,
  5,
  null,
  6,
  null,
  7,
  null,
  null,
  8,
  null,
  9,
  null,
  10,
  null,
  11,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  12,
  null,
  13,
  null,
  14,
  null,
  15,
  null,
  null,
  16,
  null,
  17,
  null,
  18,
  null,
  19,
  20,
  null,
  21,
  null,
  22,
  null,
  23,
  null,
];

// DOM referenes
const cells = document.querySelectorAll("#board-square");
let redsPieces = document.querySelectorAll(".red");
let blacksPieces = document.querySelectorAll(".black");
const redTurnText = document.querySelectorAll(".red-turn-text");
const blackTurnText = document.querySelectorAll(".black-turn-text");

// start of drag and drop
const emptys = document.querySelectorAll(".none");

//fill listiners

const dragStart = () => {
  redsPieces.className += "hold";
  setTimeout(() => ((redsPieces.className = "invisible"), 0));
  console.log("start");
};

const dragEnd = () => {
  console.log("end");
};

// player properties
let turn = true;
let redScore = 0;
let blackScore = 0;
let playerPieces;

// selected piece properties
let selectedPiece = {
  pieceId: -1,
  indexOfBoardPiece: -1,
  isKing: false,
  seventhSpace: false,
  ninthSpace: false,
  fourteenthSpace: false,
  eighteenthSpace: false,
  minusSeventhSpace: false,
  minusNinthSpace: false,
  minusFourteenthSpace: false,
  minusEighteenthSpace: false,
};

// parses pieceId's and returns the index of that piece's place on the board
const findPiece = (pieceId) => {
  let parsed = parseInt(pieceId);
  return board.indexOf(parsed);
};

// itterates through "p" and "span" tags to add click events
const applyEvents = () => {
  if (turn) {
    for (let i = 0; i < redsPieces.length; i++) {
      redsPieces[i].addEventListener("click", getPlayerCount);
      redsPieces[i].addEventListener("dragstart", dragStart);
      redsPieces[i].addEventListener("dragend", dragEnd);
    }
  } else {
    for (let i = 0; i < blacksPieces.length; i++) {
      blacksPieces[i].addEventListener("click", getPlayerCount);
      blacksPieces[i].addEventListener("dragstart", dragStart);
      blacksPieces[i].addEventListener("dragend", dragEnd);
    }
  }
};

// holds the length of the players piece count
const getPlayerCount = () => {
  if (turn) {
    playerPieces = redsPieces;
  } else {
    playerPieces = blacksPieces;
  }
  removeCellOnClick();
  resetBorders();
};

// removes possible moves from old selected piece (* this is needed because the user might re-select a piece *)
const removeCellOnClick = () => {
  for (let i = 0; i < cells.length; i++) {
    cells[i].removeAttribute("onclick");
  }
};

// resets borders to default
const resetBorders = () => {
  for (let i = 0; i < playerPieces.length; i++) {
    playerPieces[i].style.border = "1px solid white";
  }
  resetSelectedPieceProperties();
  getSelectedPiece();
};

// resets selected piece properties
const resetSelectedPieceProperties = () => {
  selectedPiece.pieceId = -1;
  selectedPiece.pieceId = -1;
  selectedPiece.isKing = false;
  selectedPiece.seventhSpace = false;
  selectedPiece.ninthSpace = false;
  selectedPiece.fourteenthSpace = false;
  selectedPiece.eighteenthSpace = false;
  selectedPiece.minusSeventhSpace = false;
  selectedPiece.minusNinthSpace = false;
  selectedPiece.minusFourteenthSpace = false;
  selectedPiece.minusEighteenthSpace = false;
};

// gets ID and index of the board cell its on
const getSelectedPiece = () => {
  selectedPiece.pieceId = parseInt(event.target.id);
  selectedPiece.indexOfBoardPiece = findPiece(selectedPiece.pieceId);
  isPieceKing();
};

// checks if selected piece is a king
const isPieceKing = () => {
  if (
    document.getElementById(selectedPiece.pieceId).classList.contains("king")
  ) {
    selectedPiece.isKing = true;
  } else {
    selectedPiece.isKing = false;
  }
  getAvailableSpaces();
};

// gets the moves that the selected piece can make
const getAvailableSpaces = () => {
  if (
    board[selectedPiece.indexOfBoardPiece + 7] === null &&
    cells[selectedPiece.indexOfBoardPiece + 7].classList.contains("none") !==
      true
  ) {
    selectedPiece.seventhSpace = true;
  }
  if (
    board[selectedPiece.indexOfBoardPiece + 9] === null &&
    cells[selectedPiece.indexOfBoardPiece + 9].classList.contains("none") !==
      true
  ) {
    selectedPiece.ninthSpace = true;
  }
  if (
    board[selectedPiece.indexOfBoardPiece - 7] === null &&
    cells[selectedPiece.indexOfBoardPiece - 7].classList.contains("none") !==
      true
  ) {
    selectedPiece.minusSeventhSpace = true;
  }
  if (
    board[selectedPiece.indexOfBoardPiece - 9] === null &&
    cells[selectedPiece.indexOfBoardPiece - 9].classList.contains("none") !==
      true
  ) {
    selectedPiece.minusNinthSpace = true;
  }
  checkAvailableJumpSpaces();
};

// gets the moves that the selected piece can jump
const checkAvailableJumpSpaces = () => {
  if (turn) {
    if (
      board[selectedPiece.indexOfBoardPiece + 14] === null &&
      cells[selectedPiece.indexOfBoardPiece + 14].classList.contains("none") !==
        true &&
      board[selectedPiece.indexOfBoardPiece + 7] >= 12
    ) {
      selectedPiece.fourteenthSpace = true;
    }
    if (
      board[selectedPiece.indexOfBoardPiece + 18] === null &&
      cells[selectedPiece.indexOfBoardPiece + 18].classList.contains("none") !==
        true &&
      board[selectedPiece.indexOfBoardPiece + 9] >= 12
    ) {
      selectedPiece.eighteenthSpace = true;
    }
    if (
      board[selectedPiece.indexOfBoardPiece - 14] === null &&
      cells[selectedPiece.indexOfBoardPiece - 14].classList.contains("none") !==
        true &&
      board[selectedPiece.indexOfBoardPiece - 7] >= 12
    ) {
      selectedPiece.minusFourteenthSpace = true;
    }
    if (
      board[selectedPiece.indexOfBoardPiece - 18] === null &&
      cells[selectedPiece.indexOfBoardPiece - 18].classList.contains("none") !==
        true &&
      board[selectedPiece.indexOfBoardPiece - 9] >= 12
    ) {
      selectedPiece.minusEighteenthSpace = true;
    }
  } else {
    if (
      board[selectedPiece.indexOfBoardPiece + 14] === null &&
      cells[selectedPiece.indexOfBoardPiece + 14].classList.contains("none") !==
        true &&
      board[selectedPiece.indexOfBoardPiece + 7] < 12 &&
      board[selectedPiece.indexOfBoardPiece + 7] !== null
    ) {
      selectedPiece.fourteenthSpace = true;
    }
    if (
      board[selectedPiece.indexOfBoardPiece + 18] === null &&
      cells[selectedPiece.indexOfBoardPiece + 18].classList.contains("none") !==
        true &&
      board[selectedPiece.indexOfBoardPiece + 9] < 12 &&
      board[selectedPiece.indexOfBoardPiece + 9] !== null
    ) {
      selectedPiece.eighteenthSpace = true;
    }
    if (
      board[selectedPiece.indexOfBoardPiece - 14] === null &&
      cells[selectedPiece.indexOfBoardPiece - 14].classList.contains("none") !==
        true &&
      board[selectedPiece.indexOfBoardPiece - 7] < 12 &&
      board[selectedPiece.indexOfBoardPiece - 7] !== null
    ) {
      selectedPiece.minusFourteenthSpace = true;
    }
    if (
      board[selectedPiece.indexOfBoardPiece - 18] === null &&
      cells[selectedPiece.indexOfBoardPiece - 18].classList.contains("none") !==
        true &&
      board[selectedPiece.indexOfBoardPiece - 9] < 12 &&
      board[selectedPiece.indexOfBoardPiece - 9] !== null
    ) {
      selectedPiece.minusEighteenthSpace = true;
    }
  }
  checkPieceConditions();
};

// restricts movement if the piece is a king
const checkPieceConditions = () => {
  if (selectedPiece.isKing) {
    givePieceBorder();
  } else {
    if (turn) {
      selectedPiece.minusSeventhSpace = false;
      selectedPiece.minusNinthSpace = false;
      selectedPiece.minusFourteenthSpace = false;
      selectedPiece.minusEighteenthSpace = false;
    } else {
      selectedPiece.seventhSpace = false;
      selectedPiece.ninthSpace = false;
      selectedPiece.fourteenthSpace = false;
      selectedPiece.eighteenthSpace = false;
    }
    givePieceBorder();
  }
};

// gives the piece a green highlight for the user (showing its movable)
const givePieceBorder = () => {
  if (
    selectedPiece.seventhSpace ||
    selectedPiece.ninthSpace ||
    selectedPiece.fourteenthSpace ||
    selectedPiece.eighteenthSpace ||
    selectedPiece.minusSeventhSpace ||
    selectedPiece.minusNinthSpace ||
    selectedPiece.minusFourteenthSpace ||
    selectedPiece.minusEighteenthSpace
  ) {
    document.getElementById(selectedPiece.pieceId).style.border =
      "3px solid green";
    giveCellsClick();
  } else {
    return;
  }
};

// gives the cells on the board a 'click' bassed on the possible moves
const giveCellsClick = () => {
  if (selectedPiece.seventhSpace) {
    cells[selectedPiece.indexOfBoardPiece + 7].setAttribute(
      "onclick",
      "makeMove(7)"
    );
  }
  if (selectedPiece.ninthSpace) {
    cells[selectedPiece.indexOfBoardPiece + 9].setAttribute(
      "onclick",
      "makeMove(9)"
    );
  }
  if (selectedPiece.fourteenthSpace) {
    cells[selectedPiece.indexOfBoardPiece + 14].setAttribute(
      "onclick",
      "makeMove(14)"
    );
  }
  if (selectedPiece.eighteenthSpace) {
    cells[selectedPiece.indexOfBoardPiece + 18].setAttribute(
      "onclick",
      "makeMove(18)"
    );
  }
  if (selectedPiece.minusSeventhSpace) {
    cells[selectedPiece.indexOfBoardPiece - 7].setAttribute(
      "onclick",
      "makeMove(-7)"
    );
  }
  if (selectedPiece.minusNinthSpace) {
    cells[selectedPiece.indexOfBoardPiece - 9].setAttribute(
      "onclick",
      "makeMove(-9)"
    );
  }
  if (selectedPiece.minusFourteenthSpace) {
    cells[selectedPiece.indexOfBoardPiece - 14].setAttribute(
      "onclick",
      "makeMove(-14)"
    );
  }
  if (selectedPiece.minusEighteenthSpace) {
    cells[selectedPiece.indexOfBoardPiece - 18].setAttribute(
      "onclick",
      "makeMove(-18)"
    );
  }
};

// when the cell is clicked
// makes the move that was clicked
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

// Changes the board states data on the back end
const changeData = (indexOfBoardPiece, modifiedIndex, removePiece) => {
  board[indexOfBoardPiece] = null;
  board[modifiedIndex] = parseInt(selectedPiece.pieceId);
  if (turn && selectedPiece.pieceId < 12 && modifiedIndex >= 57) {
    document.getElementById(selectedPiece.pieceId).classList.add("king");
  }
  if (turn === false && selectedPiece.pieceId >= 12 && modifiedIndex <= 7) {
    document.getElementById(selectedPiece.pieceId).classList.add("king");
  }
  if (removePiece) {
    board[removePiece] = null;
    if (turn && selectedPiece.pieceId < 12) {
      cells[removePiece].innerHTML = "";
      blackScore++;
      document.getElementById("rs").innerHTML = `${blackScore}/12`;
      if (blackScore === 1) {
        document.getElementById("rp").style.width = "8%";
        document.getElementById("red-score-table-1").style.visibility =
          "visible";
      } else if (blackScore === 2) {
        document.getElementById("rp").style.width = "16%";
        document.getElementById("red-score-table-2").style.visibility =
          "visible";
      } else if (blackScore === 3) {
        document.getElementById("rp").style.width = "24%";
        document.getElementById("red-score-table-3").style.visibility =
          "visible";
      } else if (blackScore === 4) {
        document.getElementById("rp").style.width = "32%";
        document.getElementById("red-score-table-4").style.visibility =
          "visible";
      } else if (blackScore === 5) {
        document.getElementById("rp").style.width = "40%";
        document.getElementById("red-score-table-5").style.visibility =
          "visible";
      } else if (blackScore === 6) {
        document.getElementById("rp").style.width = "50%";
        document.getElementById("red-score-table-6").style.visibility =
          "visible";
      } else if (blackScore === 7) {
        document.getElementById("rp").style.width = "58%";
        document.getElementById("red-score-table-7").style.visibility =
          "visible";
      } else if (blackScore === 8) {
        document.getElementById("rp").style.width = "66%";
        document.getElementById("red-score-table-8").style.visibility =
          "visible";
      } else if (blackScore === 9) {
        document.getElementById("rp").style.width = "74%";
        document.getElementById("red-score-table-9").style.visibility =
          "visible";
      } else if (blackScore === 10) {
        document.getElementById("rp").style.width = "82%";
        document.getElementById("red-score-table-10").style.visibility =
          "visible";
      } else if (blackScore === 11) {
        document.getElementById("rp").style.width = "90%";
        document.getElementById("red-score-table-11").style.visibility =
          "visible";
      } else {
        document.getElementById("rp").style.width = "100%";
        document.getElementById("red-score-table-12").style.visibility =
          "visible";
      }
    }
    if (turn === false && selectedPiece.pieceId >= 12) {
      cells[removePiece].innerHTML = "";
      redScore++;
      document.getElementById("bs").innerHTML = `${redScore}/12`;
      if (redScore === 1) {
        document.getElementById("bp").style.width = "8%";
        document.getElementById("black-score-table-1").style.visibility =
          "visible";
      } else if (redScore === 2) {
        document.getElementById("bp").style.width = "16%";
        document.getElementById("black-score-table-2").style.visibility =
          "visible";
      } else if (redScore === 3) {
        document.getElementById("bp").style.width = "24%";
        document.getElementById("black-score-table-3").style.visibility =
          "visible";
      } else if (redScore === 4) {
        document.getElementById("bp").style.width = "32%";
        document.getElementById("black-score-table-4").style.visibility =
          "visible";
      } else if (redScore === 5) {
        document.getElementById("bp").style.width = "40%";
        document.getElementById("black-score-table-5").style.visibility =
          "visible";
      } else if (redScore === 6) {
        document.getElementById("bp").style.width = "50%";
        document.getElementById("black-score-table-6").style.visibility =
          "visible";
      } else if (redScore === 7) {
        document.getElementById("bp").style.width = "58%";
        document.getElementById("black-score-table-7").style.visibility =
          "visible";
      } else if (redScore === 8) {
        document.getElementById("bp").style.width = "66%";
        document.getElementById("black-score-table-8").style.visibility =
          "visible";
      } else if (redScore === 9) {
        document.getElementById("bp").style.width = "74%";
        document.getElementById("black-score-table-9").style.visibility =
          "visible";
      } else if (redScore === 10) {
        document.getElementById("bp").style.width = "82%";
        document.getElementById("black-score-table-10").style.visibility =
          "visible";
      } else if (redScore === 11) {
        document.getElementById("bp").style.width = "90%";
        document.getElementById("black-score-table-11").style.visibility =
          "visible";
      } else {
        document.getElementById("bp").style.width = "100%";
        document.getElementById("black-score-table-12").style.visibility =
          "visible";
      }
    }
  }
  resetSelectedPieceProperties();
  removeCellOnClick();
  removeEventListeners();
};

// removes the 'onClick' event listeners for pieces
const removeEventListeners = () => {
  if (turn) {
    for (let i = 0; i < redsPieces.length; i++) {
      redsPieces[i].removeEventListener("click", getPlayerCount);
    }
  } else {
    for (let i = 0; i < blacksPieces.length; i++) {
      blacksPieces[i].removeEventListener("click", getPlayerCount);
    }
  }
  checkForWin();
};

// Checks for a win
const checkForWin = () => {
  if (blackScore === 12) {
    for (let i = 0; i < redTurnText.length; i++) {
      redTurnText[i].style.color = "black";
      blackTurnText[i].style.display = "none";
      redTurnText[i].textContent = "RED WINS!";
    }
  } else if (redScore === 12) {
    for (let i = 0; i < blackTurnText.length; i++) {
      blackTurnText[i].style.color = "black";
      redTurnText[i].style.display = "none";
      blackTurnText[i].textContent = "BLACK WINS!";
    }
  }
  changePlayer();
};

// Switches players turn
const changePlayer = () => {
  if (turn) {
    turn = false;
    for (let i = 0; i < redTurnText.length; i++) {
      redTurnText[i].style.color = "lightGrey";
      blackTurnText[i].style.color = "black";
    }
  } else {
    turn = true;
    for (let i = 0; i < blackTurnText.length; i++) {
      blackTurnText[i].style.color = "lightGrey";
      redTurnText[i].style.color = "black";
    }
  }
  applyEvents();
};

applyEvents();
