let menu = document.getElementById("mobile-menu");
let drop = document.getElementById("mobile-drop");

menu.onclick = () => {
  if (!menu.classList.contains("active")) {
    menu.classList.add("active");
  } else {
    menu.classList.remove("active");
  }

  if (!drop.classList.contains("hidden")) {
    drop.classList.add("hidden");
  } else {
    drop.classList.remove("hidden");
  }
};
