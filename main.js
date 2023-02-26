import { Grid } from "./grid.js";
import { Renderer } from "./render.js";
import { ctx, canvas } from "./canvas.js";
import { WaveFunctionCollapse } from "./wave.js";
import { tiles } from "./tile.js";

window.ctx = ctx;

let grid = new Grid(10, 10);
let renderer = new Renderer(canvas, ctx, grid, 100, 100);
//renderer.render();

let wave = new WaveFunctionCollapse(grid);
/*grid.grid[2][2].tiles = [grid.grid[2][2].tiles[7 * 4 + 1]];
wave.checkNeighbor(grid.grid[2][2], grid.grid[1][2], "w", "e", [
  grid.grid[2][2],
]);

console.log(
  grid.grid[2][2].tiles[0].sockets.w,
  grid.grid[0][0].tiles[24].sockets.e
);

renderer.render();*/

/*grid.grid[5][5].tiles = [tiles[5 * 4]];
wave.checkNeighbors(grid.grid[5][5]);
console.log(grid.getCell(4, 5).tiles[1].sockets.e);
renderer.render();*/

const step = async () => {
  wave.autoSelect();
  renderer.render();
  await new Promise((r) => setTimeout(r, 100));
};

while (wave.findCellWithLeastTiles().length > 0) {
  await step();
}
