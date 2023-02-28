import { tiles } from "./tile.js";

export class Renderer {
  constructor(canvas, ctx, grid, cellWidth, cellHeight) {
    this.grid = grid;
    this.cellWidth = cellWidth;
    this.cellHeight = cellHeight;
    this.canvas = canvas;
    this.ctx = ctx;
  }

  render(debug = false) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let row in this.grid.grid) {
      for (let column in this.grid.grid[row]) {
        this.renderCell(this.grid.getCell(row, column), row, column, debug);
      }
    }
  }

  renderCell(cell, x, y, debug = false) {
    let posX = x * (this.cellWidth + 0);
    let posY = y * (this.cellHeight + 0);
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(posX, posY, this.cellWidth, this.cellHeight);
    if (cell.tiles.length == 1) {
      this.ctx.save();
      this.ctx.translate(posX + this.cellWidth / 2, posY + this.cellHeight / 2);
      this.ctx.rotate((cell.tiles[0].rotation * 90 * Math.PI) / 180);

      this.ctx.drawImage(
        cell.tiles[0].image,
        -this.cellWidth / 2,
        -this.cellHeight / 2,
        this.cellWidth,
        this.cellHeight
      );

      this.ctx.restore();

      return;
    }
    if (!debug) return;
    for (let t in cell.tiles) {
      this.renderInnerImage(
        cell.tiles[t].image,
        cell.tiles[t].rotation,
        t,
        tiles.length,
        posX,
        posY
      );
    }
  }

  renderInnerImage(image, rotation, index, max, posX, posY) {
    let rows = Math.floor(Math.sqrt(max)) + 1;

    let innerCellSize = this.cellHeight / rows;
    let row = Math.floor(index / rows);
    let column = index % rows;

    this.ctx.save();
    this.ctx.translate(
      posX + row * innerCellSize + innerCellSize / 2,
      posY + column * innerCellSize + innerCellSize / 2
    );
    this.ctx.rotate((rotation * 90 * Math.PI) / 180);

    this.ctx.drawImage(
      image,
      -innerCellSize / 2,
      -innerCellSize / 2,
      innerCellSize,
      innerCellSize
    );

    this.ctx.restore();
  }
}
