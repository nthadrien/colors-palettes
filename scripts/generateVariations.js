

export const generateVariations = (h, s, l) => {
  const palette = [];
  const radius = Math.sqrt(l * l + 2 * s * s);
  palette[4] = [h, s, l];
  let i = 0;
  while (i <= 8) {
    const s_radius = Math.round(Math.random() * radius) %100;
    const l_radius = Math.round(Math.random() * radius) %100;
    const h_radius = (30 * i + h) % 360;
    const isValid =
      Math.sqrt(2 * s_radius * s_radius + l_radius * l_radius) !== radius;
    if (isValid) {
      palette[i] = [h_radius, s_radius, l_radius];
      i++;
    }
  }
  return palette;
};

export const generateShades = (h, s, l) => {
  const h1 = h - 5 < 0 ? 360 + h - 5 : h - 5;
  const h2 = (h + 5) % 360;
  const s1 = s - 24 < 0 ? 100 + s - 24 : s - 24;
  const s2 = (s + 20) % 100;
  const l1 = (l + 30) % 100;
  const l2 = l - 24 > 0 ? l - 24 : 100 + l - 24;

  return [
    [h1, s1, l1],
    [h, s, l],
    [h2, s2, l2],
  ];
};
