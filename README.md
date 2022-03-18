# ultimate-checkers

--variables--

- board = creates an array of the checkers board. This array numbers the occupied
  spaces and the lables the empty ones as null.

- cells = defines "cells" as the html "td" tag.

- redsPieces = defines "redsPieces" as the html tag "p".

- blacksPieces = defines "blackPieces" as the html tag "span".

- redTurnText = defines "redTurnText" as the html class ".red-turn-text".

- blackTurnText = defines "blackTurnText" as the html class".black-turn-text".

- turn = bool(true).

- redScore = 0, starts at 0 then increase as pieces are taken.

- blackScore = 0, starts at 0 then increase as pieces are taken.

- playerPieces = any, used later to define players piece count.

- selectedPiece = A object that is applyed to every piece that is selected
  as their inital state.

--functions--

- findPiece(pieceId) = passed the "pieceId" (-1). This is then parsed from a string
  to a integer then returned as the pieces place on the board.

- applyEvents() = itterates through the length of of the array "redPieces" or
  "blackPieces" and adds a click event so these pieces can be moved, also triggers getPlayerCount.

- getPlayerCount() = gets the count on the "redPieces" or the "blackPieces" that have
  been taken.

- removeCellOnClick() = removes "onclick" from the pices that have been removed
  from the board.

- resetBorders() = resets the boarder if you select a different piece, or after you
  make your move. also triggers resetSelectedPieceProperties() and getSelectedPiece().

- resetSelectedPieceProperties() = resets the inital state of a piece once it is move
  or once it is deselected.
