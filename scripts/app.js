import {
  hsbToHex,
  hsbToRgb,
  hslToHex,
  hslToHsv,
  hslToRgb,
} from "./conversions.js";

import { generateVariations, generateVariationsFibonacci, generateVariationsTwo } from "./generateVariations.js";

import {
  generateAnaloguePalette,
  generateMonochromePalette,
  generateComplementaryPalette,
  generateSplitComplementaryPalette,
  generateTriadicPalette,
  generateTetriadicPalette,
  generateRectanglePalette,
} from "./colorSchemes.js";
import { colorSort } from "./sortingColors.js";

var GlobalColor = [0, 90, 50];
var GlobalPallete = [];
var GlobalScheme = "monochrome";

const saturationElts = document.getElementsByName("saturation");
const hueElts = document.getElementsByName("hue");
const lightElts = document.getElementsByName("light");

hueElts.forEach((elt) =>
  elt.addEventListener("change", (e) => {
    GlobalColor[0] = parseInt(e.target.value);
    hueElts.forEach((elt) => (elt.value = e.target.value));
    changeMain(GlobalColor);
  })
);

saturationElts.forEach((elt) =>
  elt.addEventListener("change", (e) => {
    GlobalColor[1] = parseInt(e.target.value);
    saturationElts.forEach((elt) => (elt.value = e.target.value));
    changeMain(GlobalColor);
  })
);

lightElts.forEach((elt) =>
  elt.addEventListener("change", (e) => {
    GlobalColor[2] = parseInt(e.target.value);
    lightElts.forEach((elt) => (elt.value = e.target.value));
    changeMain(GlobalColor);
  })
);

const changeMain = (color) => {
  const Dv = document.getElementById("main-color");
  Dv.style.color = color[2] > 50 ? "#000" : "#fff";
  Dv.innerHTML = `<p>hsl - ${GlobalColor.toString()}</p> <p> hsb - ${hslToHsv(
    GlobalColor[0],
    GlobalColor[1],
    GlobalColor[2]
  )}</p> <p> hex - ${hslToHex(
    GlobalColor[0],
    GlobalColor[1],
    GlobalColor[2]
  )}</p>
  `;
  Dv.style.background = hslToHex(color[0], color[1], color[2]);
  return;
};

const schemes = document.getElementsByName("scheme");
schemes.forEach((elt) =>
  elt.addEventListener("change", (e) => {
    let paletto = [];
    switch (e.target.value) {
      case "analogue":
        paletto = generateAnaloguePalette(...GlobalColor);
        break;
      case "monochrome":
        paletto = generateMonochromePalette(...GlobalColor);
        break;
      case "complementary":
        paletto = generateComplementaryPalette(...GlobalColor);
        break;
      case "split-complementary":
        paletto = generateSplitComplementaryPalette(...GlobalColor);
        break;
      case "triadic":
        paletto = generateTriadicPalette(...GlobalColor);
        break;
      case "tetriadic":
        paletto = generateTetriadicPalette(...GlobalColor);
        break;
      case "rectangle":
        paletto = generateRectanglePalette(...GlobalColor);
        break;
    }
    GlobalScheme = e.target.value;
    drawColors(paletto);
  })
);

function drawColors(colors) {
  const results = document.getElementById("results");
  GlobalPallete = colors;
  results.innerHTML = "";
  colors.forEach((color) => {
    const clrHex = hslToHex(color[0], color[1], color[2]);
    const clrRGB = hslToRgb(color[0], color[1], color[2]);
    const low = color[2] > 50 ? "#000" : "#fff";
    results.innerHTML += `<div class="box" style="background:${clrHex}; color: ${low};font-size:12px;">
            <p>hex-${clrHex}</p> <p>rgb(${clrRGB})</p><p>${color}</p>
      </div>`;
  });
}

// Generate colors variations:
function drawPalette1() {
  const palette = generateVariations(GlobalColor[0], GlobalColor[1], GlobalColor[2]);
  GlobalPallete = palette;
  generateProposals();
}

function drawPalette2() {
  const palette = generateVariationsTwo(GlobalColor[0], GlobalColor[1], GlobalColor[2]);
  GlobalPallete = palette;
  generateProposals();
}


function drawPalettefibo() {
  const palette = generateVariationsFibonacci(GlobalColor[0], GlobalColor[1], GlobalColor[2]);
  GlobalPallete = palette;
  generateProposals();
}

document.getElementById("refresh").addEventListener("click",()=>{
  GlobalColor= [0,50,50]
  saturationElts.forEach(elt => elt.value = GlobalColor[1]);
  hueElts.forEach(elt => elt.value = GlobalColor[0]);
  lightElts.forEach(elt => elt.value = GlobalColor[2]);
  changeMain(GlobalColor)
});

document.getElementById("generate").addEventListener("click", e => drawPalette1() );
document.getElementById("generate-two").addEventListener("click", e => drawPalette2() );
document.getElementById("generate-three").addEventListener("click", e => drawPalettefibo() );

function generateProposals () {
  const pil = document.getElementById("proposals");
  pil.innerHTML = "";

  if( GlobalScheme &&  GlobalPallete.length > 0 ) {

    const Variations = colorSort(GlobalPallete,GlobalColor);
    const list = Object.keys(Variations);

    for( let scheme of list ) {

      const h = document.createElement("h3");
      h.textContent = scheme;
      pil.appendChild(h);

      const container = document.createElement("div");
      container.style = "display:flex;gap:0.2rem;justify-content:center;align-items:center;";
      const b = Variations[scheme];
      b.forEach( clr => {
        const boxy = document.createElement("div");
        boxy.style = `height:78px;width:110px;color:${clr[2] > 50 ? "#000":"#fff"}`;
        boxy.textContent = clr;
        boxy.className = "boxes";
        boxy.style.backgroundColor = hslToHex(...clr);
        container.appendChild(boxy);
      });
      pil.appendChild(container);
    }
  } else {
    alert("please generate the palette")
  }
  return ;
}

changeMain(GlobalColor);