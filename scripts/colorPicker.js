const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d", {
  willReadFrequently: true,
});
const bounding = canvas.getBoundingClientRect();
const imgSrc = document.getElementById("imgSource");

imgSrc.addEventListener("change", (e) => {
  const virtualImg = new Image();
  virtualImg.src = URL.createObjectURL(e.target.files[0]);  // reating from browser cache
  virtualImg.onload = () => {
    var ratio = virtualImg.naturalWidth / virtualImg.naturalHeight;
    var width = canvas.width;
    var height = width / ratio;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(virtualImg, 0, 0, width, height);
    URL.revokeObjectURL(virtualImg.src); // free bowser cache
  };
  console.log(virtualImg);
});

canvas.addEventListener("click", (e) => {
  const x = e.clientX - bounding.left;
  const y = e.clientY - bounding.top;
  const pixel = ctx.getImageData(x, y, 1, 1);
  const data = pixel.data;
  // getting rgba color;
  const rgbColor = `rgb(${data[0]} ${data[1]} ${data[2]} / ${data[3] / 255})`;
  // destination.style.background = rgbColor;
  // destination.textContent = rgbColor;
  // return rgbColor;
  console.log(rgbColor);
});
