const scene = document.getElementById("scene");
const resetButton = document.getElementById("reset");
const gamesCountElement = document.getElementById("games__count");

const firstPlayerElement = document.getElementById("first__player");
const secondPlayerElement = document.getElementById("second__player");

const firstPlayerColor = document.getElementById("first__player-color");
const secondPlayerColor = document.getElementById("second__player-color");

const cells = Array.from(scene.children);
const game = gameProperty();

let currentPlayer = firstPlayer;

firstPlayerColor.style.backgroundColor = firstPlayer.getColor().toString();
secondPlayerColor.style.backgroundColor = secondPlayer.getColor().toString();

cells.map((cell, index) => {
  cell.addEventListener("click", () => {
    if (!isEmptyCell(cell) || game.isGameEnd()) {
      return;
    }

    playerMove(cell, index);

    if (isPlayerWon(currentPlayer.getMarkPositions())) {
      game.playerWon(currentPlayer);
      return;
    }

    if (isGameOver(cells)) {
      game.gameOver();
      return;
    }

    currentPlayer = getNextPlayer();
  });
});

resetButton.addEventListener("click", resetGame);

function isEmptyCell(cell) {
  if (cell.innerHTML === "") {
    return true;
  }

  return false;
}

function resetGame() {
  resetCells();

  firstPlayer.resetMarkPositions();
  secondPlayer.resetMarkPositions();

  currentPlayer = firstPlayer;

  firstPlayerElement.innerHTML = firstPlayer.getWinCount();
  secondPlayerElement.innerHTML = secondPlayer.getWinCount();

  game.startNewGame();
  gamesCountElement.innerHTML = game.getCountGame();
}

function resetCells() {
  for (let i = 0; i < scene.children.length; i++) {
    scene.children[i].innerHTML = "";
  }
}

function playerMove(cell, index) {
  cell.style.color = currentPlayer.getColor();
  cell.innerHTML = currentPlayer.getMark();

  currentPlayer.addNewMarkPosition(index);
}

function getNextPlayer() {
  return currentPlayer === firstPlayer ? secondPlayer : firstPlayer;
}

function isPlayerWon(playerPositions) {
  const winPositions = ["012", "345", "678", "048", "246", "036", "147", "258"];
  const numberOfWinMatches = 3;

  for (let i = 0; i < winPositions.length; i++) {
    let playerWinMatches = getPlayerWinMatches(
      winPositions[i],
      playerPositions
    );

    if (playerWinMatches === numberOfWinMatches) {
      return true;
    }
  }

  return false;
}

function getPlayerWinMatches(winPosition, playerPositions) {
  return playerPositions.reduce((accumulator, item) => {
    if (winPosition.includes(item.toString())) {
      winPosition = winPosition.replace(item.toString(), "");
      return (accumulator += 1);
    }

    return accumulator;
  }, 0);
}

function isGameOver(cells) {
  const maxCellCount = 9;

  const counter = cells.reduce((accumulator, item) => {
    if (isEmptyCell(item)) {
      return accumulator;
    }

    return (accumulator += 1);
  }, 0);

  return maxCellCount === counter;
}
