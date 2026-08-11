/// <reference types="vite/client" />
import "./styles.css";
import { buildMap, checkCells, evolveMap2D } from "./draw2d.js";

//! nas rano nas rano nas rano uberu potom

const config = {
  length: 6000,
  width: 100,
  emptySymbol: "  ",
  wallSymbol: "██",
  wallPercentage: 40,
};

const fieldMarkingHorizontal = Array.from(
  { length: config.width },
  (_, i) => `<div class='mark'>${i++}</div>`.padStart(2, "0")
);

const fieldMarkingVertical = Array.from(
  { length: Math.floor(config.length / config.width) },
  (_, i) => `<div class='mark'>${i++}</div>`.padStart(2, "0")
);

const { binaryMap, htmlMap } = buildMap(config);

let hightlightedNodes: Set<number> = new Set();

const handleMouseEnter = (id: number) => {
  if (id === 0) return;
  const ids: Set<number> = checkCells(binaryMap, config.width, id);

  ids.forEach((val) => {
    const el = document.getElementById(`${val}`);
    el?.classList.add('active');
    hightlightedNodes.add(val);
  })
}

const handleMouseLeave = (id: number) => {
  hightlightedNodes.forEach((val) => {
    const el = document.getElementById(`${val}`);
    el?.classList.remove('active');
  })
  hightlightedNodes.clear();
}

export const init = () => {
  const app = document.querySelector<HTMLElement>("#app");


  if (app)
    app.innerHTML = `
      <div class="maze-container">
      <div
        class="field-marking-horizontal"
        style='grid-template-columns: repeat(${config.width}, 1fr)'
      >
        ${fieldMarkingHorizontal.toString().replaceAll(",", "")}
      </div>
        <div
          class="field-marking-vertical"
        >
        ${fieldMarkingVertical.toString().replaceAll(",", "")}
      </div>
        <div
          class='maze'
          style='grid-template-columns: repeat(${config.width}, 1fr)'
        >
          ${htmlMap.join('')}
        </div>
      </div>
    `;

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

  maze?.addEventListener(('mouseout'), (e) => {
    const target = e.target;
    if (target instanceof HTMLElement && target.classList.contains('wall')) {
      const closestWall = target.closest('.wall');
      if (closestWall) {
        const id = Number(closestWall.id);
        if (!isNaN(id))
          handleMouseLeave(id)
      }
    }
  })


};
