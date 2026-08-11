/// <reference types="vite/client" />
import "./styles.css";
import { buildMap, checkCells, evolveMap2D } from "./draw2d.js";

const config = {
  length: 5600,
  width: 100,
  emptySymbol: "  ",
  wallSymbol: "██",
  wallPercentage: 40,
};

const fieldMarking = Array.from(
  { length: config.width },
  (_, i) => `<div class='mark'>${i++}</div>`.padStart(2, "0")
);

const { binaryMap, htmlMap } = buildMap(config);

const handleMouseEnter = (id: number) => {
  if (id === 0) return;
  const ids: Set<number> = checkCells(binaryMap, config.width, id);
  console.log(ids);
}

const handleMouseLeave = (id: number) => {
  console.log('DDDD ' + id);
}

export const init = () => {
  const app = document.querySelector<HTMLElement>("#app");


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
        ${htmlMap.join('')}
      </div>
    </div>`;

  const maze = document.querySelector<HTMLElement>('.maze');

  maze?.addEventListener(('mouseover'), (e) => {
    const target = e.target;
    if (target instanceof HTMLElement && target.classList.contains('wall')) {
      const closestWall = target.closest('.wall');
      if (closestWall) {
        const id = Number(closestWall.id);
        if (!isNaN(id))
          handleMouseEnter(id)
      }
    }
  })

  maze?.addEventListener(('mouseover'), (e) => {
    const target = e.target;
    if (target instanceof HTMLElement && target.classList.contains('wall')) {
      const closestWall = target.closest('.wall');
      if (closestWall) {
        const id = Number(closestWall.id);
        if (!isNaN(id))
          handleMouseEnter(id)
      }
    }
  })


};
