import { hslToHex, rgb2Hex, rgb2Hsb, rgb2Hsl } from "./conversions.js";

window.onload = () => {
  const inp = document.getElementsByName("input-color")[0];
  const displayIt = document.getElementById("main-color");

  inp.addEventListener("blur", (e) => {
    const color = e.target.value;
    if (
      color.includes("#") ||
      color.includes("hsl(") ||
      color.includes("hsb(") ||
      color.includes("rgb(") ||
      color.includes("hsv(")
    ) {
      displayIt.style = "background-color:" + color + ";";
      e.target.style = "border: 1px solid #ddd;";
      convertAll();
    } else {
      e.target.style = "border: 2px solid red;";
    }
  });

  const convertAll = () => {
    const color = window
      .getComputedStyle(displayIt, null)
      .getPropertyValue("background-color");

    const proccessedColor = color
      .replace("rgb(", "")
      .replace(")", "")
      .split(",")
      .map((it) => parseInt(it));

    console.log(proccessedColor);

    const hex = rgb2Hex(...proccessedColor);
    const rgb = `rgb(${proccessedColor})`;
    const hsb = rgb2Hsb(...proccessedColor);
    const hsl = rgb2Hsl(...proccessedColor);

    const conversions = {
      hex,
      rgb,
      hsb,
      hsl,
    };

    const result = document.getElementById("resu");
    result.innerHTML = "";
    for (let modelo in conversions) {
      const po = document.createElement("P");
      po.textContent = modelo + ": " + conversions[modelo];
      po.style =
        "padding:1rem; border-left: 5px solid" +
        hex +
        ";border-radius: 6px;margin: 1rem 0;";
      result.appendChild(po);
    }
  };
};
