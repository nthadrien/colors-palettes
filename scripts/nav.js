//  nav bar
document.getElementById("hamburger").addEventListener("click", (e) => {
  const menu = document.getElementsByClassName("nav-menu")[0];
  menu.classList.toggle("open");
  e.target.classList.toggle("open");
});