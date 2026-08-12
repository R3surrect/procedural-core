import { getSeededRandom, stringToSeed } from "../utils/seededRandom";
import { EvolveMap2D, BuildMap, IsInFrame, CheckAroundCells } from "./types";

export const isInFrame: IsInFrame = (length, width, index) => {
  return (
    index < width ||
    index % width === width - 1 ||
    index % width === 0 ||
    index >= length - width
  );
};

export const checkWallCountAround = (
  map: boolean[],
  width: number,
  index: number
) => {
  if (isInFrame(map.length, width, index)) {
    return 8;
  }

  let wallsAround = 0;

  if (map[index - 1] === true) wallsAround++;
  if (map[index + 1] === true) wallsAround++;

  if (map[index + width] === true) wallsAround++;
  if (map[index - width] === true) wallsAround++;

  if (map[index + width + 1] === true) wallsAround++;
  if (map[index + width - 1] === true) wallsAround++;

  if (map[index - width - 1] === true) wallsAround++;
  if (map[index - width + 1] === true) wallsAround++;

  return wallsAround;
};

export const buildMap: BuildMap = ({
  length,
  width,
  wallPercentage,
  emptySymbol,
  wallSymbol,
  seed,
}) => {
  const binaryMap: boolean[] = [];
  const htmlMap: string[] = [];

  const initialSeed = seed ?? String(Math.random());
  const random = getSeededRandom(stringToSeed(initialSeed));
  const threshold = wallPercentage / 100;

  for (let i = 0; i < length; i++) {
    const isFrame = isInFrame(length, width, i);
    const isWall = isFrame || random() < threshold;

    binaryMap.push(isWall);

    if (isWall) {
      const idAttr = !isFrame ? `id=${i}` : "";
      htmlMap.push(
        `<div data-structure='wall' ${idAttr} class='cell wall'>${wallSymbol}</div>`
      );
    } else {
      const idAttr = !isFrame ? `id=${i}` : "";
      htmlMap.push(
        `<div data-structure='floor' ${idAttr} class='cell'>${emptySymbol}</div>`
      );
    }
  }

  return { binaryMap, htmlMap };
};

export const checkCells: CheckAroundCells = (binaryMap, width, index) => {
  const cellsAround: Set<number> = new Set();
  const visitedCells: Set<number> = new Set();

  const recursiveCheckWalls = (currentIndex: number) => {
    if (
      isInFrame(binaryMap.length, width, currentIndex) ||
      visitedCells.has(currentIndex)
    ) {
      return;
    }

    visitedCells.add(currentIndex);

    if (binaryMap[currentIndex] === true) {
      cellsAround.add(currentIndex);
    } else {
      return;
    }

    if ((currentIndex + 1) % width !== 0) recursiveCheckWalls(currentIndex + 1);
    if (currentIndex % width !== 0) recursiveCheckWalls(currentIndex - 1);

    recursiveCheckWalls(currentIndex + width);
    recursiveCheckWalls(currentIndex - width);
  };

  recursiveCheckWalls(index);
  return cellsAround;
};

export const evolveMap2D: EvolveMap2D = (
  binaryMap,
  width,
  emptySymbol,
  wallSymbol
) => {
  const length = binaryMap.length;
  const mapBuffer: boolean[] = structuredClone(binaryMap);
  const htmlMap: string[] = new Array(length);

  for (let i = 0; i < length; i++) {
    const isFrame = isInFrame(length, width, i);

    if (isFrame) {
      mapBuffer[i] = true;
      htmlMap[i] = `<div data-structure='wall' class='cell wall'>${wallSymbol}</div>`;
      continue;
    }

    const isCurrentCellWall = binaryMap[i] !== false;
    const wallsAround = checkWallCountAround(binaryMap, width, i);
    const isWall = isCurrentCellWall ? wallsAround >= 4 : wallsAround >= 5;

    mapBuffer[i] = isWall;

    if (isWall) htmlMap[i] = `<div data-structure='wall' id=${i} class='cell wall'>${wallSymbol}</div>`;
    else htmlMap[i] = `<div data-structure='floor' id=${i} class='cell'>${emptySymbol}</div>`;
  }

  return { binaryMap: mapBuffer, htmlMap };
};
