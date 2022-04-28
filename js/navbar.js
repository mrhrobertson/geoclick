const menu = document.getElementById("mobile-menu");
const drop = document.getElementById("mobile-drop");

function open_mobile_menu() {
  console.log("Open menu");
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
}
