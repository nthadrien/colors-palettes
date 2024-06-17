



// new ones checked and tested

export function hslToHex(h, s, l) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export function hslToRgb (h, s, l) {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [Math.round(255 * f(0)), Math.round(255 * f(8)), Math.round(255 * f(4))];
};

// hsv is also know as hsb
export function hslToHsv (h,s,l) { 
  const b = l + (s / 100) * Math.min(l, 100 - l);
  s = b === 0 ? 0 : Math.ceil(2 * (1 - l / b) * 100);
  return [h, s, b];
}

// 
export function hsbToRgb (h, s, b) {
  s /= 100;
  b /= 100;
  const k = (n) => (n + h / 60) % 6;
  const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  return [Math.round(255 * f(5)),Math.round( 255 * f(3)), Math.round(255 * f(1))];
};

export const  rgbToHex =  (r, g, b) =>
((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');
 


export function hsbToHex (h,s,l) {
  const rgb = hsbToRgb(h,s,l);
  const hex = rgbToHex( rgb[0] , rgb[1] , rgb[2]);
  return ("#"+hex).substring(0,7);
}


export function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  const delta = max - min;
  let h, s, l;

  l = (max + min) * 0.5;

  if (delta === 0) {
    h = 0;
    s = 0;
  } else {
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
    switch (max) {
      case r:
        h = (g - b) / delta + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / delta + 2;
        break;
      case b:
        h = (r - g) / delta + 4;
        break;
    }
    h /= 6;
  }

  h = Math.round(h*360)%360;
  s = Math.round(s*100)%100;
  l = Math.round(l*100)%100;

  return [h, s, l];
}