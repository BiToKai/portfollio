// == header.js ==

// Declaration des constantes
const burger = document.querySelector(".burger");
const popup = document.getElementById("popup");
const menuClose = document.getElementById("menu-close");

// Ouvrir le menu burger
// Quand on clique le menu buger
burger.addEventListener("click", () => {
  // Si la largeur de la fenetre est < a 500px
  if (window.innerWidth < 500) {
    // Ajoute la class show a la popup pour l'afficher
    popup.classList.add("show");
  }
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
    // Quand le lien est cliqué, on retire la classe "show" de l'élément popup
    // Cela permet de fermer le menu burger
    popup.classList.remove("show");
  });
});
