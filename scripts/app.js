import {
  hsbToHex,
  hsbToRgb,
  hslToHex,
  hslToHsv,
  hslToRgb,
} from "./conversions.js";

import {
  generateAnaloguePalette,
  generateMonochromePalette,
  generateComplementaryPalette,
  generateSplitComplementaryPalette,
  generateTriadicPalette,
  generateTetriadicPalette,
  generateRectanglePalette,
} from "./colorSchemes.js";
import { generateTones } from "./generateTones.js";

var GlobalColor = [0, 50, 50];
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
    if (e.target.value === "monochrome")
      paletto = generateMonochromePalette(
        GlobalColor[0],
        GlobalColor[1],
        GlobalColor[2]
      );
    if (e.target.value === "analogous")
      paletto = generateAnaloguePalette(
        GlobalColor[0],
        GlobalColor[1],
        GlobalColor[2]
      );
    if (e.target.value === "complementary")
      paletto = generateComplementaryPalette(
        GlobalColor[0],
        GlobalColor[1],
        GlobalColor[2]
      );
    if (e.target.value === "split-complementary")
      paletto = generateSplitComplementaryPalette(
        GlobalColor[0],
        GlobalColor[1],
        GlobalColor[2]
      );
    if (e.target.value === "triadic")
      paletto = generateTriadicPalette(
        GlobalColor[0],
        GlobalColor[1],
        GlobalColor[2]
      );
    if (e.target.value === "tetriadic")
      paletto = generateTetriadicPalette(
        GlobalColor[0],
        GlobalColor[1],
        GlobalColor[2]
      );
    if (e.target.value === "rectangle")
      paletto = generateRectanglePalette(
        GlobalColor[0],
        GlobalColor[1],
        GlobalColor[2]
      );
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
            <p>hex-${clrHex}</p> <p>rgb(${clrRGB})</p>
      </div>`;
  });

  displayVariations();
}

changeMain(GlobalColor);

// Generate colors variations:

function displayVariations() {
  const numb = GlobalPallete.length;
  const varial = document.getElementById("variations");
  varial.innerHTML = "";

  for (let j = 0; j < numb; j++) {
    const colors = generateTones(
      GlobalPallete[j][0], GlobalPallete[j][1], GlobalPallete[j][2]
    );
    const divColor = document.createElement("div");
    const clrHex = hslToHex(GlobalPallete[j][0], GlobalPallete[j][1], GlobalPallete[j][2]);
    divColor.className = "boxes";
    divColor.textContent = j+ " "+ clrHex;
    divColor.style.backgroundColor = clrHex;
    varial.appendChild(divColor);
    for (let cell of colors) {
      const divChild = document.createElement("div");
      divChild.className = "boxes";
      divChild.style.backgroundColor = cell;
      divChild.textContent = cell;
      varial.appendChild(divChild);
    }
  }
}
