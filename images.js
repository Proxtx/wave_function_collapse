export const images = {};

const prefix = "mix/";

let imageFound = false;
let index = 0;
do {
  imageFound = false;
  let i = new Image();
  let path = prefix + index++ + ".png";
  i.src = path;
  await new Promise((r) => {
    i.addEventListener("error", () => {
      r();
    });
    i.addEventListener("load", () => {
      imageFound = true;
      images[index] = i;
      r();
    });
  });
} while (imageFound);
