export const stringToSeed = (input: unknown): number => {
  const str = String(input);
  let hash = 0;
  for (let i = 0; i < str.length; i++)
    hash = (Math.imul(31, hash) + str.charCodeAt(i)) | 0;

  return hash;
};

export const getSeededRandom = (seed: number) => () => {
  let t = (seed += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
