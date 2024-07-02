import { hslToHex, hslToHsv } from "./conversions.js";

import {
  generateVariations,
  generateVariationsFibonacci,
  generateVariationsTwo,
} from "./generateVariations.js";

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
var DefaultPallete = [];

window.onload = () => {

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

  const schemes = document.getElementById("color-scheme");
  schemes.addEventListener("change", (e) => {
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
    DefaultPallete = paletto;
    drawColors(paletto);
  });

  // drawing default Colors obtained from schemes
  function drawColors(colors) {
    const max = colors.length;
    const results = document.querySelectorAll(".clr-card");
    for (let i = 0; i < results.length; i++) {
      if (i < max) {
        const current = results[i];
        const clrHex = hslToHex(...colors[i]);
        const txtClr = colors[i][2] <= 50 ? "white" : "black";
        current.style.display = "grid";
        current.children[0].style = `background-color: ${clrHex}; color: ${txtClr}`;
        current.children[0].textContent = clrHex;
        // for( const node of  current.children ) {
        //   if ( node.nodeName === 'sat1'  ) node.nodeValue = '30';
        //   if ( node.nodeName === 'lig1'  ) node.nodeValue = '40';
        // }
      } else results[i].style.display = "none";
    }
  }

  // Generate colors variations:
  function drawPalette1() {
    const palette = generateVariations(
      GlobalColor[0],
      GlobalColor[1],
      GlobalColor[2]
    );
    GlobalPallete = palette;
    generateProposals();
  }

  function drawPalette2() {
    const palette = generateVariationsTwo(
      GlobalColor[0],
      GlobalColor[1],
      GlobalColor[2]
    );
    GlobalPallete = palette;
    generateProposals();
  }

  function drawPalettefibo() {
    const palette = generateVariationsFibonacci(
      GlobalColor[0],
      GlobalColor[1],
      GlobalColor[2]
    );
    GlobalPallete = palette;
    generateProposals();
  }

  document.getElementById("refresh").addEventListener("click", () => {
    GlobalColor = [0, 50, 50];
    saturationElts.forEach((elt) => (elt.value = GlobalColor[1]));
    hueElts.forEach((elt) => (elt.value = GlobalColor[0]));
    lightElts.forEach((elt) => (elt.value = GlobalColor[2]));
    changeMain(GlobalColor);
  });

  document
    .getElementById("generate")
    .addEventListener("click", (e) => drawPalette1());
  document
    .getElementById("generate-two")
    .addEventListener("click", (e) => drawPalette2());
  document
    .getElementById("generate-three")
    .addEventListener("click", (e) => drawPalettefibo());

  function generateProposals() {
    const pil = document.getElementById("proposals");
    pil.innerHTML = "";

    if (GlobalScheme && GlobalPallete.length > 0) {
      const Variations = colorSort(GlobalPallete, GlobalColor);
      const list = Object.keys(Variations);

      for (let scheme of list) {
        const h = document.createElement("h3");
        h.textContent = scheme;
        pil.appendChild(h);

        const container = document.createElement("div");
        container.style =
          "display:flex;gap:0.2rem;justify-content:center;align-items:center;";
        const b = Variations[scheme];
        b.forEach((clr) => {
          const boxy = document.createElement("div");
          boxy.style = `height:78px;width:110px;color:${
            clr[2] > 50 ? "#000" : "#fff"
          }`;
          boxy.textContent = clr;
          boxy.className = "boxes";
          boxy.style.backgroundColor = hslToHex(...clr);
          container.appendChild(boxy);
        });
        pil.appendChild(container);
      }
    } else {
      alert("please generate the palette");
    }
    return;
  }

  changeMain(GlobalColor);

  // Functions that will change the saturations and ligths of the results

  document.getElementsByName("sat").forEach((elt) => {
    elt.addEventListener("change", (e) => {
      const list = e.target.parentNode.className;
      var colors;

      if (list.includes("one")) colors = DefaultPallete[0];
      else if (list.includes("two")) colors = DefaultPallete[1];
      else if (list.includes("three")) colors = DefaultPallete[2];
      else if (list.includes("four")) colors = DefaultPallete[3];
      else if (list.includes("five")) colors = DefaultPallete[4];

      colors[1] = e.target.value;
      const clrHex = hslToHex(...colors);
      const txtClr = colors[2] <= 50 ? "white" : "black";
      e.target.parentNode.children[0].style = `background-color: ${clrHex}; color: ${txtClr}`;
      e.target.parentNode.children[0].textContent = clrHex
      e.target.parentNode.children[2].value = e.target.value;
      e.target.parentNode.children[3].value = e.target.value;
    });
  });

  document.getElementsByName("lig").forEach((elt) => {
    elt.addEventListener("change", (e) => {
      const list = e.target.parentNode.className;
      var colors;

      if (list.includes("one")) colors = DefaultPallete[0];
      else if (list.includes("two")) colors = DefaultPallete[1];
      else if (list.includes("three")) colors = DefaultPallete[2];
      else if (list.includes("four")) colors = DefaultPallete[3];
      else if (list.includes("five")) colors = DefaultPallete[4];

      colors[2] = e.target.value;
      const clrHex = hslToHex(...colors);
      const txtClr = colors[2] <= 50 ? "white" : "black";
      e.target.parentNode.children[0].style = `background-color: ${clrHex}; color: ${txtClr}`;
      e.target.parentNode.children[0].textContent = clrHex;
      e.target.parentNode.children[5].value = e.target.value;
      e.target.parentNode.children[6].value = e.target.value;
    });
  });
};