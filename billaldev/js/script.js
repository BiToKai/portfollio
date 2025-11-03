// === Btn retour en haut de pg === //

// Quand le DOM est complètement chargé execute le code suivant
document.addEventListener("DOMContentLoaded", () => {
  //   console.log(" script chargé !");
  const scrollToTopBtn = document.querySelector("#scrollToTopBtn");

  // Affiche ou masque le btn si on scroll vers le haut ou le bas.
  window.addEventListener("scroll", () => {
    // Si on est en dessous de 300px de la pg alors on affiche le btn en rajoutant la clase "show".
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add("show");
    }
    // Autrement on masque le btn en retirant la clase "show".
    else {
      scrollToTopBtn.classList.remove("show");
    }
  });

  // Quand on click sur le btn , cela nous ramène en haut de la pg.
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      //   Avec une remontée progressive.
      behavior: "smooth",
    });
  });
});
