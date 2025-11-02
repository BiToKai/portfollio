// == header.js ==

// Declaration des constantes
const burger = document.querySelector(".burger");
const popup = document.getElementById("popup");
const menuClose = document.getElementById("menu-close");

// Ouvrir le menu burger
// Quand on clique sur le menu burger
burger.addEventListener("click", () => {
  // Ajoute la class show à la popup pour l'afficher
  popup.classList.add("show");
});

// Fermer le menu
// Quand on clique sur la croix
menuClose.addEventListener("click", () => {
  //  Retire la class show de la popup pour la cacher
  popup.classList.remove("show");
});

// Fermer le menu quand on clique sur un lien de la liste
// Sélectionne tous les liens à l'intérieur de la liste qui ont pour id "menu-liste"
document.querySelectorAll("#menu-liste a").forEach((link) => {
  // Pour chaque lien, on ajoute un écouteur d'événement au clic
  link.addEventListener("click", () => {
    // Quand on clique sur un  lien, on retire la classe "show" à la popup pour fermer le menu
    popup.classList.remove("show");
  });
});
