/*MENU*/ /*JESUS AMADO, QUANTA COISA*/
const menuBar = document.querySelector(".menu-bar");
const btnCloseMenu = document.getElementById("close-menu");
const btnBlockMenu = document.getElementById("menu-bar-block");
btnCloseMenu.addEventListener("click", () => {
  menuBar.classList.remove("block");
  menuBar.classList.add("hidden");
});

btnBlockMenu.addEventListener("click", () => {
  menuBar.classList.remove("hidden");
  menuBar.classList.add("block");
});
