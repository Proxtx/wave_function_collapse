export class WaveFunctionCollapse {
  constructor(grid) {
    this.grid = grid;
  }

  findCellWithLeastTiles() {
    let cells = [];
    for (let row in this.grid.grid) {
      for (let column in this.grid.grid[row]) {
        let cell = this.grid.getCell(row, column);
        if (cell.tiles.length == 1) continue;
        if (cells.length == 0 || cells[0].tiles.length == cell.tiles.length) {
          cells.push(cell);
        } else if (cells[0].tiles.length > cell.tiles.length) {
          cells = [cell];
        }
      }
    }

    return cells;
  }

  autoSelect() {
    let possibleCells = this.findCellWithLeastTiles();
    shuffleArray(possibleCells);
    let cell = possibleCells[0];
    shuffleArray(cell.tiles);
    cell.tiles.splice(1, cell.tiles.length - 1);
    this.checkNeighbors(cell, []);
  }

  removeTile(cell, index) {
    cell.tiles.splice(index, 1);
    this.checkNeighbors(cell, []);
  }

  checkNeighbors(cell) {
    if (cell.getTopCell())
      this.checkNeighbor(cell, cell.getTopCell(), "n", "s");
    if (cell.getRightCell())
      this.checkNeighbor(cell, cell.getRightCell(), "e", "w");
    if (cell.getBottomCell())
      this.checkNeighbor(cell, cell.getBottomCell(), "s", "n");
    if (cell.getLeftCell())
      this.checkNeighbor(cell, cell.getLeftCell(), "w", "e");
  }

  checkNeighbor(originalCell, neighborCell, matchOriginal, matchNeighbor) {
    let removed = false;

    for (let tileNeighborIndex in neighborCell.tiles) {
      let tileNeighbor = neighborCell.tiles[tileNeighborIndex];
      let saved = false;
      for (let tileOriginal of originalCell.tiles) {
        if (
          tileOriginal.sockets[matchOriginal] ==
          tileNeighbor.sockets[matchNeighbor]
        ) {
          saved = true;
        }
      }

      if (!saved) {
        neighborCell.tiles[tileNeighborIndex] = undefined;
        removed = true;
      }
    }

    neighborCell.tiles = neighborCell.tiles.filter((element) => {
      return element !== undefined;
    });
    if (removed) {
      this.checkNeighbors(neighborCell);
    }

    return true;
  }
}

const shuffleArray = (array) => {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};
