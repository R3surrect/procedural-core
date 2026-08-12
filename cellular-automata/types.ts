export type AddFrames = (map1D: boolean[], width: number) => boolean[];
export type EvolveMap2D = (
  binaryMap: boolean[],
  width: number,
  emptySymbol: string,
  wallSymbol: string,
) => {
  binaryMap: boolean[],
  htmlMap: string[]
};

export type RawMap = {
  length: number;
  width: number;
  wallPercentage: number;
  emptySymbol: string;
  wallSymbol: string;
  seed?: string;
};

export type BuildMap = (props: RawMap) => {
  binaryMap: boolean[];
  htmlMap: string[];
}

export type StringifyMap = (
  map1D: boolean[],
  wallSymbol: string,
  emptySymbol: string,
) => string[];

export type IsInFrame = (
  map1D: number,
  width: number,
  index: number
) => boolean;

export type Directions = 'left' | 'right' | 'top' | 'bottom' | 'none';
export type CheckAroundCells = (
  binaryMap: boolean[],
  width: number,
  index: number,
) => Set<number>;
