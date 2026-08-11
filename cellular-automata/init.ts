import "./styles.css";
import { get2DNoise, evolveMap2D, stringify2D } from "./draw2d.js";

const config = {
  width: 90,
  height: 60,
  emptySymbol: "  ",
  wallSymbol: "██",
  wallPercentage: 17,
};

const fieldMarking = Array.from({ length: config.width }, (_, i) => {
  return `<div class='mark'>${i++}</div>`.padStart(2, "0");
});

export const init = () => {
  const map2D: string[][] = get2DNoise(config);
  const app = document.querySelector("#app");

  evolveMap2D(map2D);
  console.log(map2D);
  if (app)
    app.innerHTML = `<div class="maze-container">
      <div
        class="field-marking-horizontal"
        style='grid-template-columns: repeat(${config.width}, 1fr)'
      >
        ${fieldMarking.toString().replaceAll(",", "")}
      </div>

      <div
        class='maze'
        style='grid-template-columns: repeat(${config.width}, 1fr)'
      >
        ${stringify2D(map2D)}
      </div>

    </div>`;
};
