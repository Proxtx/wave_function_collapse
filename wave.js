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
          cells.push(cell);
          //cells = [cell];
        }
      }
    }

    return cells;
  }

  async autoSelect() {
    let possibleCells = this.findCellWithLeastTiles();
    if (possibleCells.length < 1) return true;
    shuffleArray(possibleCells);
    let cell = possibleCells[0];
    let oldTiles = [...cell.tiles];
    let tries = 0;
    do {
      await new Promise((r) => setTimeout(r, 100));
      if (tries >= 20) {
        window.renderer.ctx.fillStyle = "orange";
        window.renderer.ctx.fillRect(
          cell.x * window.renderer.cellWidth + window.renderer.cellWidth / 3,
          cell.y * window.renderer.cellHeight + window.renderer.cellHeight / 3,
          window.renderer.cellWidth / 3,
          window.renderer.cellHeight / 3
        );
        cell.tiles = oldTiles;
        //throw new Error("ahhh");
        return false;
      }
      tries++;
      cell.tiles = [oldTiles[Math.floor(Math.random() * oldTiles.length)]];
      window.renderer.render();
      console.log("attempting with tile", cell.tiles[0], "of", oldTiles);
    } while (!this.checkNeighbors(cell) || !(await this.autoSelect()));
    /*let possibleCells = this.findCellWithLeastTiles();
    if(possibleCells.length < 1) return true;

    let cell = possibleCells[Math.floor(Math.random() * possibleCells.length)]
    let oldTiles = [...cell.tiles];
    do {
      await new Promise(r => setTimeout(r, 100));

      
    } while(!this.checkNeighbors(cell) &&)*/
  }

  removeTile(cell, index) {
    let removed = cell.tiles.splice(index, 1);
    if (!this.checkNeighbors(cell)) {
      cell.tiles.splice(cell.tiles, 0, removed[0]);
      return false;
    }

    return true;
  }

  checkNeighbors(cell) {
    if (cell.getTopCell())
      if (!this.checkNeighbor(cell, cell.getTopCell(), "n", "s")) return false;
    if (cell.getRightCell())
      if (!this.checkNeighbor(cell, cell.getRightCell(), "e", "w"))
        return false;
    if (cell.getBottomCell())
      if (!this.checkNeighbor(cell, cell.getBottomCell(), "s", "n"))
        return false;
    if (cell.getLeftCell())
      if (!this.checkNeighbor(cell, cell.getLeftCell(), "w", "e")) return false;

    return true;
  }

  checkNeighbor(originalCell, neighborCell, matchOriginal, matchNeighbor) {
    //window.renderer.render(true);
    window.renderer.ctx.fillStyle = "red";
    window.renderer.ctx.fillRect(
      neighborCell.x * window.renderer.cellWidth +
        window.renderer.cellWidth / 3,
      neighborCell.y * window.renderer.cellHeight +
        window.renderer.cellHeight / 3,
      window.renderer.cellWidth / 3,
      window.renderer.cellHeight / 3
    );
    console.log(originalCell, neighborCell);
    let removed = false;

    do {
      removed = false;
      neighborTilesLoop: for (let tileNeighborIndex in neighborCell.tiles) {
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
          if (!this.removeTile(neighborCell, tileNeighborIndex)) return false;
          removed = true;
          break neighborTilesLoop;
        }
      }
    } while (removed);

    /*neighborCell.tiles = neighborCell.tiles.filter((element) => {
      return element !== undefined;
    });*/
    window.renderer.renderCell(
      neighborCell,
      neighborCell.x,
      neighborCell.y,
      true
    );
    if (neighborCell.tiles.length == 0) {
      //return false;
      //window.renderer.render(true);
      window.renderer.ctx.fillStyle = "green";
      window.renderer.ctx.fillRect(
        neighborCell.x * window.renderer.cellWidth +
          window.renderer.cellWidth / 3,
        neighborCell.y * window.renderer.cellHeight +
          window.renderer.cellHeight / 3,
        window.renderer.cellWidth / 3,
        window.renderer.cellHeight / 3
      );
      //throw new Error("0 Tiles Please Render");
    }
    /*if (removed) {
      if (!this.checkNeighbors(neighborCell)) return false;
    }*/

    if (neighborCell.tiles.length == 0) console.log("fail. reverting");
    if (neighborCell.tiles.length == 0)
      //throw new Error("error");
      return false;

    window.renderer.ctx.clearRect(
      neighborCell.x * window.renderer.cellWidth +
        window.renderer.cellWidth / 3,
      neighborCell.y * window.renderer.cellHeight +
        window.renderer.cellHeight / 3,
      window.renderer.cellWidth / 3,
      window.renderer.cellHeight / 3
    );

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
