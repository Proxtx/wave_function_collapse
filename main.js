import { Grid } from "./grid.js";
import { Renderer } from "./render.js";
import { ctx, canvas } from "./canvas.js";
import { WaveFunctionCollapse } from "./wave.js";

window.ctx = ctx;

let grid = new Grid(
  Math.floor(canvas.width / 50) + 1,
  Math.floor(canvas.height / 50) + 1
);
let renderer = new Renderer(canvas, ctx, grid, 50, 50);

let wave = new WaveFunctionCollapse(grid);

const step = async () => {
  wave.autoSelect();
  renderer.render();
  await new Promise((r) => setTimeout(r, 100));
};

while (wave.findCellWithLeastTiles().length > 0) {
  await step();
}

//renderer.render();
