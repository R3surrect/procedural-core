type HslColor = { h: number, s: number, l: number };
export type GetRandomBrightHslColor = (isString?: boolean, brightness?: number) => string | HslColor;

export const getRandomBrightHslColor: GetRandomBrightHslColor = (isString = true, brightness) => {
  const isBrightnessInvalid = brightness === undefined || brightness > 100 || brightness < 0;

  const brightnessLevel = isBrightnessInvalid
    ? Math.floor(Math.random() * 11) + 50
    : brightness;

  const h = Math.floor(Math.random() * 361);
  const s = Math.floor(Math.random() * 11) + 35;
  const l = brightnessLevel;

  return isString
    ? `hsl(${h}, ${s}%, ${l}%)`
    : { h, s, l };
};
