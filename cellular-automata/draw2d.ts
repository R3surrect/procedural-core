import { EvolveMap2D, BuildMap, IsInFrame, CheckAroundCells, Directions } from './types';

export const isInFrame: IsInFrame = (length, width, index) => {
  if (
    index < width
    || (index % width === width - 1)
    || (index % width === 0)
    || (index >= length - width)
  ) return true;
  return false;
};
export const buildMap: BuildMap = ({
  length,
  width,
  wallPercentage,
  emptySymbol,
  wallSymbol
}) => {
  const binaryMap: boolean[] = [];
  const htmlMap: string[] = [];

  for (let i = 0; i <= length - 1; i++) {
    const isFrame = isInFrame(length, width, i)
    const isWall = isFrame || Math.random() < wallPercentage / 100;

    binaryMap.push(isWall);
    if (isWall)
      htmlMap.push(`<div data-structure='wall' ${!isFrame ? `id=${i}` : ''} class='cell wall'>${wallSymbol}</div>`);
    else
      htmlMap.push(`<div data-structure='floor' ${!isFrame ? `id=${i}` : ''} class='cell'>${emptySymbol}</div>`);
  }

  return { binaryMap, htmlMap };
};
export const checkCells: CheckAroundCells = (
  binaryMap,
  width,
  index,
) => {
  const cellsAround: Set<number> = new Set();
  const visitedCells: Set<number> = new Set();

  const recursiveCheckWalls = (index: number) => {
    if (isInFrame(binaryMap.length, width, index) || visitedCells.has(index)) return;
    visitedCells.add(index);
    if (binaryMap[index] === true) cellsAround.add(index);
    else return;

    if ((index + 1) % width !== 0) recursiveCheckWalls(index + 1);
    if ((index % width) !== 0) recursiveCheckWalls(index - 1);

    recursiveCheckWalls(index + width);
    recursiveCheckWalls(index - width);
  }

  recursiveCheckWalls(index);

  return cellsAround;
}
export const evolveMap2D: EvolveMap2D = (map) => {


  
  return map;
};
