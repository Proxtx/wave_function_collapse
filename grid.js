import { tiles } from "./tile.js";

export class Grid {
  constructor(tilesX, tilesY) {
    this.tilesX = tilesX;
    this.tilesY = tilesY;
    this.generateGrid();
  }

  generateGrid() {
    this.grid = [];
    for (let x = 0; x < this.tilesX; x++) {
      this.grid.push([]);
      for (let y = 0; y < this.tilesY; y++) {
        this.grid[x].push(new Cell(this, x, y, [...tiles]));
      }
    }
  }

  getCell(x, y) {
    if (x < 0 || x >= this.grid.length || y < 0 || y >= this.grid[x].length)
      return;
    return this.grid[x][y];
  }
}

class Cell {
  constructor(grid, x, y, tiles) {
    this.grid = grid;
    this.x = x;
    this.y = y;
    this.tiles = tiles;
  }

  getTopCell() {
    return this.grid.getCell(this.x, this.y - 1);
  }
  getBottomCell() {
    return this.grid.getCell(this.x, this.y + 1);
  }
  getRightCell() {
    return this.grid.getCell(this.x + 1, this.y);
  }
  getLeftCell() {
    return this.grid.getCell(this.x - 1, this.y);
  }
}
