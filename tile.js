import { ctx } from "./canvas.js";
import { images } from "./images.js";

let detail = 3;
//TODO: Implement detail

const componentToHex = (c) => {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
};

const rgbToHex = ([r, g, b]) => {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

class Tile {
  constructor(image, ctx, rotation, id) {
    this.ctx = ctx;
    this.image = image;
    this.rotation = rotation;
    this.id = id;

    this.getEdgeColors();
  }

  getEdgeColors() {
    let w = this.image.width;
    let h = this.image.height;
    let wH = Math.round(w / 2);
    let hH = Math.round(h / 2);

    this.ctx.drawImage(this.image, 0, 0, w, h);
    let edges = {};
    edges.n = [
      rgbToHex(this.ctx.getImageData(0, 0, 1, 1).data),
      rgbToHex(this.ctx.getImageData(wH, 0, 1, 1).data),
      rgbToHex(this.ctx.getImageData(w - 1, 0, 1, 1).data),
    ];
    edges.s = [
      rgbToHex(this.ctx.getImageData(0, h - 1, 1, 1).data),
      rgbToHex(this.ctx.getImageData(wH, h - 1, 1, 1).data),
      rgbToHex(this.ctx.getImageData(w - 1, h - 1, 1, 1).data),
    ];
    edges.w = [
      rgbToHex(this.ctx.getImageData(0, 0, 1, 1).data),
      rgbToHex(this.ctx.getImageData(0, hH, 1, 1).data),
      rgbToHex(this.ctx.getImageData(0, h - 1, 1, 1).data),
    ];
    edges.e = [
      rgbToHex(this.ctx.getImageData(w - 1, 0, 1, 1).data),
      rgbToHex(this.ctx.getImageData(w - 1, hH, 1, 1).data),
      rgbToHex(this.ctx.getImageData(w - 1, h - 1, 1, 1).data),
    ];

    let edgesClone = { ...edges };
    switch (this.rotation) {
      case 0:
        edges.n = edges.n.join("");
        edges.e = edges.e.join("");
        edges.s = edges.s.join("");
        edges.w = edges.w.join("");
        break;
      case 1:
        edgesClone = { ...edges };
        edges.n = edgesClone.w.reverse().join("");
        edges.e = edgesClone.n.join("");
        edges.s = edgesClone.e.reverse().join("");
        edges.w = edgesClone.s.join("");
        break;
      case 2:
        edgesClone = { ...edges };
        edges.n = edgesClone.s.reverse().join("");
        edges.e = edgesClone.w.reverse().join("");
        edges.s = edgesClone.n.reverse().join("");
        edges.w = edgesClone.e.reverse().join("");
        break;
      case 3:
        edgesClone = { ...edges };
        edges.n = edgesClone.e.reverse().join("");
        edges.e = edgesClone.s.reverse().join("");
        edges.s = edgesClone.w.join("");
        edges.w = edgesClone.n.reverse().join("");
        break;
    }

    this.sockets = edges;
  }
}

export let tiles = [];

for (let image in images) {
  tiles.push(new Tile(images[image], ctx, 0, image));
  tiles.push(new Tile(images[image], ctx, 1, image));
  tiles.push(new Tile(images[image], ctx, 2, image));
  tiles.push(new Tile(images[image], ctx, 3, image));
}
