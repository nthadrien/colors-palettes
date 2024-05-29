import { hslToHsv , hsbToHex } from "./conversions.js";

export function generateTones(h, s, l) {
  const HSB = hslToHsv(h, s, l);

  const jwl = jewelTone(HSB[1], HSB[2]);
  const pst = pastelTone(HSB[1], HSB[2]);
  const eth = earthTone(HSB[1], HSB[2]);
  const flw = fluoTone(HSB[1], HSB[2]);
  const ntr = neutralTone(HSB[1], HSB[2]);
  const shd = shadeTone(HSB[1], HSB[2]);
  //   return p - sss  =
  // return [
  //   [h, ...pst],
  //   [h, ...eth],
  //   [h, ...jwl],
  //   [h, ...flw],
  //   [h, ...ntr],
  //   [h, ...shd],
  // ];

  return [
    hsbToHex(h, pst[0], pst[1]),
    hsbToHex(h, eth[0], eth[1]),
    hsbToHex(h, jwl[0], jwl[1]),
    hsbToHex(h, flw[0], flw[1]),
    hsbToHex(h, ntr[0], ntr[1]),
    hsbToHex(h, shd[0], shd[1])
  ]
}

// S:14-21, B: 89-96
function pastelTone(s, b) {
  s =  Math.round(Math.random() * 7) + 14 ;
  b =  Math.round(Math.random() * 7) + 89 ;
  return [s, b];
}


// S: 36-41, B: 77-36
function earthTone(s, b) {
  s = Math.round(Math.random() * 5) + 36 ;
  b = Math.round(Math.random() * 41) + 89 ;
  return [s, b];
}

// S:83-73, B: 76-56
function jewelTone(s, b) {
  s = Math.round(Math.random() * 10) + 73 ;
  b =  Math.round(Math.random() * 20) + 56;
  return [s, b];
}

// S: 100-63, B: 100-82
function fluoTone(s, b) {
  s = Math.round(Math.random() * 37) + 63;
  b = Math.round(Math.random() * 18) + 83;
  return [s, b];
}

// S: 1-10, B: 99-70
function neutralTone(s, b) {
  s =  Math.round(Math.random() * 9) + 1 ;
  b = Math.round(Math.random() * 29) + 70 ;
  return [s, b];
}

function shadeTone(s, l) {
  return [0, Math.floor(Math.random() * 100)];
}
