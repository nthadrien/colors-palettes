// new ones tested and approuved by me: color format is hsl [h,s,l]

export function generateMonochromePalette(h, s, l) {
  let palette = [];
  palette[0] = [h, s, l];
  palette[1] = [h, Math.round(s*0.2), (l + 30) % 100];
  palette[2] = [h, Math.round(s*0.4), (l + 50) % 100];
  palette[3] = [h, Math.round(s*0.6), (l + 70) % 100];
  palette[4] = [h, Math.round(s*0.8), (l + 90) % 100];
  return palette;
}

export function generateAnaloguePalette(h, s, l) {
  let palette = [];
  let h1,
    h2 = 0;

  h1 = (h - 30) > 0 ? h - 30 : (360 + (h - 30)) % 360;
  h2 = (h + 30) % 360;
  palette[1] = [h, s, l];
  palette[0] = [h1, s, l];
  palette[2] = [h2, s, l];
  return palette;
}

export function generateComplementaryPalette(h, s, l) {
  let palette = [];
  let h1 = 0;
  h1 = (h + 180) % 360;
  palette[0] = [h, s, l];
  palette[1] = [h1, s, l];
  return palette;
}

export function generateSplitComplementaryPalette(h, s, l) {
  let palette = [];
  let h1,
    h2 = 0;
  h1 = (h + 150) % 360;
  h2 = (h + 210) % 360;
  palette[1] = [h, s, l];
  palette[0] = [h1, s, l];
  palette[2] = [h2, s, l];
  return palette;
}

export function generateTriadicPalette(h, s, l) {
  let palette = [];
  let h1,
    h2 = 0;
  h1 = (h + 120) % 360;
  h2 = (h + 240) % 360;
  palette[1] = [h, s, l];
  palette[0] = [h1, s, l];
  palette[2] = [h2, s, l];
  return palette;
}

export function generateTetriadicPalette(h, s, l) {
  let palette = [];
  let h1,
    h2,
    h3 = 0;
  h1 = (h + 90) % 360;
  h2 = (h + 180) % 360;
  h3 = (h + 270) % 360;
  palette[0] = [h, s, l];
  palette[1] = [h1, s, l];
  palette[2] = [h2, s, l];
  palette[3] = [h3, s, l];
  return palette;
}

export function generateRectanglePalette(h, s, l) {
  let palette = [];
  let h1,
    h2,
    h3 = 0;
  h1 = (h + 60) % 360;
  h2 = (h + 180) % 360;
  h3 = (h + 240) % 360;
  palette[0] = [h, s, l];
  palette[1] = [h1, s, l];
  palette[2] = [h2, s, l];
  palette[3] = [h3, s, l];
  return palette;
}
