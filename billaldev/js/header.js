const burger = document.querySelector(".burger");
const popup = document.getElementById("popup");
const menuClose = document.getElementById("menu-close");

// Vérifie si on est sur mobile (menu burger uniquement)
function isMobile() {
  return window.innerWidth < 500;
}

// Ouvrir le menu burger
burger.addEventListener("click", () => {
  if (isMobile()) {
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
    // sécurité → on ne gère que le mobile
    if (!isMobile()) return;

    // ferme le menu burger
    popup.classList.remove("show");

    const href = link.getAttribute("href");

    // Cas spécifique : Compétences
    if (href === "index.html#skills" || href === "#skills") {
      const skillsSection = document.getElementById("skills");

      // Si on est déjà sur index.html → scroll avec offset
      if (skillsSection) {
        setTimeout(() => {
          // hauteur du header sticky
          const yOffset = -75;
          const y = skillsSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }, 50);
      } else {
        // Sinon, redirection vers index.html
        window.location.href = "index.html#skills";
      }
    }
  });
});

// Ajuste le padding du <main> en fonction du scroll
function adjustMainPadding() {
  const main = document.querySelector("main");
  if (!main) return;

  if (window.scrollY === 0) {
    // en haut → petit padding
    main.style.paddingTop = "10px";
  } else {
    // scrolled → compense le header sticky
    main.style.paddingTop = "75px";
  }
}

window.addEventListener("load", adjustMainPadding);
window.addEventListener("scroll", adjustMainPadding);
