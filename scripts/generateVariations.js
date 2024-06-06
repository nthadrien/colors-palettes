
const rando = (a) => Math.round(Math.random() * a);
const saturations = [ 20, 30, 40, 50, 60, 70, 80, 90,100];
const lights = [30, 40, 60, 70, 80, 90,100];
const hues = [0,30,60,90,120,150,160,180,210,240,270,300,330];


export const generateVariations = (h, s, l) => {
  const palette = [];
  let i = 0;
  while (i < 13 ) {
    const h_radius = ( hues[i] + h) % 360;
    palette[i] = [h_radius, s, l];
    i++;
  }
  return palette.map((clr) => generateShades2(clr[0], clr[1], clr[2]));
};

export const generateVariationsTwo = (h, s, l) => {
  const palette = [];
  const radius = Math.sqrt(l * l + 2 * s * s);
  let i = 0;
  while (i < 13 ) {
    const s_radius = Math.round(Math.random() * radius) % 100;
    const l_radius = Math.round(Math.random() * radius) % 100;
    const h_radius = ( h + hues[i] ) % 360;
    palette[i] = [h_radius, s_radius, l_radius];
    i++;
  }
  return palette.map((clr) => generateShades(clr[0], clr[1], clr[2]));
};


export const generateVariationsFibonacci = (h, s, l) => {
  const palette = [];
  const ratio = 1.618;
  let i = 0;
  while (i < 13 ) {
    const h_radius = ( hues[i] + h) % 360;
    const s0 = Math.round(s*ratio*i)%100;
    const l0 = Math.round(l*ratio*i)%100;
    palette[i] = [h_radius, s0, l0];
    i++;
  }
  return palette.map((clr) => generateShades(clr[0], clr[1], clr[2]));
};

export const generateShades = (h, s, l) => {

  const s1 = (100 + s - 24) % 100;
  const l1 = (h + lights[rando(6)]) % 100;

  return [
    [h, s1, l1],
    [h, s, l],
  ];
};

export const generateShades2 = (h, s, l) => {

  const s1 = (s + saturations[rando(8)]) % 100;
  const l1 = (h + lights[rando(6)]) % 100;

  return [
    [h, s1, l1],
    [h, s, l],
  ];
};
