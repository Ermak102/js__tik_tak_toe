function gameProperty() {
  let countGame = 0;
  let isGameEnd = false;

  function endGame() {
    isGameEnd = true;
    resetButton.disabled = false;
  }

  return {
    playerWon(player) {
      alert(`Player with color: ${player.getColor().toUpperCase()} won`);
      player.incrementCountWin();
      endGame();
    },

    gameOver() {
      alert("Draw in the game");
      endGame();
    },

    getCountGame() {
      return countGame;
    },

    isGameEnd() {
      return isGameEnd;
    },

    startNewGame() {
      countGame++;
      isGameEnd = false;
    },
  };
}
