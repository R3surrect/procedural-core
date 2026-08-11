type Get2DMap = {
  width: number;
  height: number;
  emptySymbol: string;
  wallSymbol: string;
  wallPercentage: number;
};

export const get2DNoise = ({
  width,
  height,
  emptySymbol,
  wallSymbol,
  wallPercentage,
}: Get2DMap): string[][] => {
  let draw = "";
  const map: string[][] = Array.from({ length: width + 1 }, () => []);

  for (let i = 0; i < width; i++) {
    let displayRow = "";

    for (let j = 0; j < height; j++) {
      let val = Math.random() > wallPercentage / 100 ? emptySymbol : wallSymbol;
      displayRow += val;
      map[i][j] = val;
    }

    draw += displayRow + "\n";
  }
  return map;
};

type Stringify2D = (map2D: string[][], hasFieldNumbers?: boolean) => string;
export const stringify2D: Stringify2D = (map2D) => {
  let result: string = "";

  map2D.map((row) => {
    const viewRow = row.map(
      (item) =>
        `<div class='cell' style='${item.trim().length > 0 && "cursor: pointer"}'>${item}</div>`,
    );

    result += viewRow + "\n";
  });

  return result.replaceAll(",", "");
};

type EvolveMap2D = (map2D: string[][]) => string[][];

export const evolveMap2D: EvolveMap2D = (map2D) => {
  const height = map2D.length;
  const width = map2D[0]?.length || 0;

  return [];
};
