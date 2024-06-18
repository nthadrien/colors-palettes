import { rgbToHsl } from "./conversions.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d", {willReadFrequently: true});

const imgSrc = document.getElementById("imgSource");
const destination = document.getElementById("picked");

imgSrc.addEventListener("change", (e) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const virtualImg = new Image();
  virtualImg.src = URL.createObjectURL(e.target.files[0]); // reating from browser cache
  virtualImg.onload = () => {
    ctx.drawImage(virtualImg, 0, 0, canvas.width, canvas.height);
    getPalleteFromPicture();
    URL.revokeObjectURL(virtualImg.src); // free bowser cache
  };
});

canvas.addEventListener("click", (e) => {
  const bounding = canvas.getBoundingClientRect();
  const x = e.clientX - bounding.left;
  const y = e.clientY - bounding.top;
  const pixel = ctx.getImageData(x, y, 1, 1);
  const data = pixel.data;
  // getting rgba color;
  const hslClr = rgbToHsl(data[0], data[1], data[2]);
  destination.style.background =  `hsl(${hslClr[0]}, ${hslClr[1]}%, ${hslClr[2]}%)`;
  destination.textContent = hslClr;
});

const getPalleteFromPicture = () => {
  const crtWidth = canvas.width;
  const crtHeight = canvas.height;
  const cols = Math.floor(crtHeight / 5);
  const rows = Math.floor(crtWidth / 5);
  let pallete = []

  for( let j=0; j < rows; j++ ) {
    for (let i = 0; i < cols; i++) {
      const pixel = ctx.getImageData(i * 5, j * 5, 1,  1);
      const data = pixel.data;
      // const rgbColor = `rgb(${data[0]} ${data[1]} ${data[2]} / ${data[3] / 255})`;
      const hslClr = rgbToHsl(data[0], data[1], data[2]);
      if ( checkClr ( pallete , hslClr )) pallete.push(hslClr);
    }
  }

  pallete.sort( (a,b) => a[0] >= b[0] );

  generateProposals(pallete);
};

// colors filter function
const checkClr = (clrs, h) => {
  const chec = clrs.find( item => h[0] >= item[0] - 2 && h[0] <= item[0] + 2 );
  return  h[1] > 30  && h[2] < 90 && h[2] > 20 && !chec ;
}

function generateProposals(colors) {
  const pil = document.getElementById("pic-colors");
  pil.innerHTML = " ";
  for (let clr of colors) {
    const textClr = `hsl(${clr[0]}, ${clr[1]}%, ${clr[2]}%)`;
    const boxy = document.createElement("div");
    boxy.textContent = textClr;
    boxy.className = "boxes";
    boxy.style.background = textClr;
    boxy.style.color = clr[2] > 50 ? "black" : "white";
    pil.appendChild(boxy);
  }
}