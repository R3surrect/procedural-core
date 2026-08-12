/// <reference types="vite/client" />
import "./styles.css";
import { buildMap, checkCells, evolveMap2D } from "./draw2d.js";

const config = {
  length: 65400,
  width: 300,
  emptySymbol: "  ",
  wallSymbol: "██",
  wallPercentage: 40,
  seed: "",
};

let currentBinaryMap: boolean[] = [];
let currentHtmlMap: string[] = [];
let hightlightedNodes: Set<number> = new Set();

const getInputValue = (id: string): string => {
  const el = document.getElementById(id);
  if (el instanceof HTMLInputElement) return el.value;

  return "";
};

const getInputsConfig = () => {
  const lengthVal = Number(getInputValue("length"));
  const widthVal = Number(getInputValue("width"));
  const wallPercentageVal = Number(getInputValue("wallPercentage"));

  return {
    length: lengthVal || config.length,
    width: widthVal || config.width,
    emptySymbol: getInputValue("emptySymbol") || config.emptySymbol,
    wallSymbol: getInputValue("wallSymbol") || config.wallSymbol,
    seed: getInputValue("seed"),
    wallPercentage: !isNaN(wallPercentageVal) ? wallPercentageVal : config.wallPercentage,
  };
};

const updateMazeDOM = () => {
  const maze = document.querySelector<HTMLElement>(".maze");
  if (maze) {
    maze.style.gridTemplateColumns = `repeat(${config.width}, 1fr)`;
    maze.innerHTML = currentHtmlMap.join("");
  }
};

const handleMouseEnter = (id: number) => {
  if (id === 0) return;
  const ids: Set<number> = checkCells(currentBinaryMap, config.width, id);

  ids.forEach((val) => {
    const el = document.getElementById(`${val}`);
    el?.classList.add("active");
    hightlightedNodes.add(val);
  });
};

const handleMouseLeave = (id: number) => {
  hightlightedNodes.forEach((val) => {
    const el = document.getElementById(`${val}`);
    el?.classList.remove("active");
  });
  hightlightedNodes.clear();
};

export const drawLayout = () => {
  const fieldMarkingHorizontal = Array.from(
    { length: config.width },
    (_, i) => `<div class='mark'>${String(i).padStart(2, "0")}</div>`
  );

  const fieldMarkingVertical = Array.from(
    { length: Math.floor(config.length / config.width) },
    (_, i) => `<div class='mark'>${String(i).padStart(2, "0")}</div>`
  );

  const layout = `
    <div class="maze-container">
      <div
        class="field-marking-horizontal"
        style='grid-template-columns: repeat(${config.width}, 1fr)'
      >
      </div>
      <div
        class='maze'
        style='grid-template-columns: repeat(${config.width}, 1fr)'
      >
        ${currentHtmlMap.join("")}
      </div>
    </div>
    <div class="floating-controls">
      <center>
        <h3>Settings</h3>
      </center>
      <hr/>
      <label>
        Length: <input type="number" id="length" name="length" value="${config.length}" />
      </label>

      <label>
        Width: <input type="number" id="width" name="width" value="${config.width}" />
      </label>

      <label>
        Empty Symbol: <input type="text" id="emptySymbol" name="emptySymbol" value="${config.emptySymbol}" />
      </label>

      <label>
        Wall Symbol: <input type="text" id="wallSymbol" name="wallSymbol" value="${config.wallSymbol}" />
      </label>

      <label>
        Seed: <input type="text" id="seed" name="seed" value="${config.seed}" />
      </label>

      <label>
        Wall %: <input type="number" id="wallPercentage" name="wallPercentage" min="0" max="100" value="${config.wallPercentage}" />
      </label>

      <button id="apply" type="button">Apply</button>
      <button id="next-generation" type="button">Get next generation</button>
      <button id="refresh" type="button">Refresh grid</button>
      <button id="animate-generation" type="button">Play animation</button>
    </div>
  `;

  const app = document.querySelector("#app");
  if (app) {
    app.innerHTML = layout;
    bindEvents();
    initHightlight();
  }
};

const callNextGeneration = () => {
  const { binaryMap, htmlMap } = evolveMap2D(
    currentBinaryMap,
    config.width,
    config.emptySymbol,
    config.wallSymbol
  );
  currentBinaryMap = binaryMap;
  currentHtmlMap = htmlMap;
  updateMazeDOM();
};

const bindEvents = () => {
  const resetMap = () => {
    Object.assign(config, getInputsConfig());
    const { binaryMap, htmlMap } = buildMap(config);
    currentBinaryMap = binaryMap;
    currentHtmlMap = htmlMap;
    drawLayout();
  };

  document.getElementById("apply")?.addEventListener("click", resetMap);
  document.getElementById("refresh")?.addEventListener("click", resetMap);

  document.getElementById("next-generation")?.addEventListener("click", callNextGeneration);

  document.getElementById("animate-generation")?.addEventListener("click", () => {
    let counter = 0;
    const intervalId = setInterval(() => {
      callNextGeneration();
      counter++;

      if (counter === 20) clearInterval(intervalId);
    }, 350);
  })

};

export const initHightlight = () => {
  const maze = document.querySelector<HTMLElement>(".maze");

  maze?.addEventListener("pointerover", handleGridHover);
  maze?.addEventListener("pointerout", handleGridHover);

  function handleGridHover(e: Event) {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;

    const closestWall = target.closest(".wall");
    if (!closestWall) return;

    const id = Number(closestWall.id);
    if (isNaN(id)) return;

    if (e.type === "pointerover" || e.type === "mouseover") {
      handleMouseEnter(id);
    } else {
      handleMouseLeave(id);
    }
  }
};

export const init = () => {
  const app = document.querySelector<HTMLElement>("#app");

  if (app) {
    const { binaryMap, htmlMap } = buildMap(config);
    currentBinaryMap = binaryMap;
    currentHtmlMap = htmlMap;
    drawLayout();
  }
};
