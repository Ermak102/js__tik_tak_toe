const firstPlayer = player("X", "red");
const secondPlayer = player("O", "blue");

function player(markSymbol, color) {
  let markPositions = [];
  let winCounter = 0;

  const maxCellNumber = 8;
  const minCellNumber = 0;

  return {
    getMarkPositions() {
      return markPositions;
    },

    resetMarkPositions() {
      markPositions = [];
    },

    addNewMarkPosition(newPosition) {
      if (newPosition < minCellNumber || newPosition > maxCellNumber) {
        return new Error("Incorrect mark position");
      }

      markPositions.push(newPosition);
    },

    getMark() {
      if (markSymbol === "") {
        return new Error("Player mark is not defined");
      }

      return markSymbol;
    },

    getColor() {
      if (color === "") {
        return new Error("Player color is not defined");
      }

      return color;
    },

    getWinCount() {
      if (winCounter < 0) {
        return new Error("Win counter is incorrect");
      }

      return winCounter;
    },

    incrementCountWin() {
      winCounter++;
    },
  };
}
