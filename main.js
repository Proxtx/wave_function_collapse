import { Grid } from "./grid.js";
import { Renderer } from "./render.js";
import { ctx, canvas } from "./canvas.js";
import { WaveFunctionCollapse } from "./wave.js";

window.ctx = ctx;

let grid = new Grid(
  5, //Math.floor(canvas.width / 50),
  5 //Math.floor(canvas.height / 50)
);
let renderer = new Renderer(canvas, ctx, grid, 50, 50);

window.renderer = renderer;

let wave = new WaveFunctionCollapse(grid);

const step = async () => {
  wave.autoSelect();
  renderer.render(true);
  await new Promise((r) => setTimeout(r, 10));
};

wave.autoSelect();

/*while (wave.findCellWithLeastTiles().length > 0) {
  await step();
}*/

/*window.addEventListener("click", () => {
  step();
});*/

//renderer.render();
