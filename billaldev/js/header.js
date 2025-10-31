const burger = document.querySelector(".burger");
const popup = document.getElementById("popup");
const menuClose = document.getElementById("menu-close");

// Ouvrir le menu burger
burger.addEventListener("click", () => {
  if (window.innerWidth < 500) {
    // utilise la classe CSS .show (opacity + transition)
    popup.classList.add("show");
  }
});

// Fermer le menu
menuClose.addEventListener("click", () => {
  popup.classList.remove("show");
});

// Ferme le menu automatiquement quand on clique sur un lien
document.querySelectorAll("#menu-liste a").forEach((link) => {
  link.addEventListener("click", () => {
    // ferme le menu burger
    popup.classList.remove("show");
  });
});
