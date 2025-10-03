document.addEventListener("DOMContentLoaded", () => {});
// === Bouton retour haut de page ===
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Script chargé !");
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");

  if (scrollToTopBtn) {
    // Affiche/masque le bouton selon le scroll
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        scrollToTopBtn.classList.add("show");
      } else {
        scrollToTopBtn.classList.remove("show");
      }
    });

    // Action du clic
    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});
