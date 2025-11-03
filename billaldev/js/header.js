// Quand le DOM est complètement chargé execute le code suivant
document.addEventListener("DOMContentLoaded", () => {
  // Declaration des variables
  const burger = document.querySelector(".burger");
  const popup = document.querySelector("#popup");
  const menuClose = document.querySelector("#menu-close");
  const menuLinks = document.querySelectorAll("#menu-liste a");

  // Ouvrir le menu burger
  // Quand on clique sur le menu burger
  burger.addEventListener("click", () => {
    // Ajoute la classe "show" à la popup pour l'afficher
    popup.classList.add("show");
  });

  // Fermer le menu
  // Quand on clique sur la croix
  menuClose.addEventListener("click", () => {
    //  Retire la classe "show" de la popup pour la cacher
    popup.classList.remove("show");
  });

  // Fermer le menu quand on clique sur un lien de la liste
  // Sélectionne tous les liens à l'intérieur de la liste qui ont pour id "menu-liste"
  menuLinks.forEach((link) => {
    // Pour chaque lien, on ajoute un écouteur d'événement au clic
    link.addEventListener("click", () => {
      // Quand on clique sur un  lien, on retire la classe "show" à la popup pour fermer le menu
      popup.classList.remove("show");
    });
  });
});
