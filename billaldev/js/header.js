const burger = document.querySelector(".burger");
const popup = document.getElementById("popup");
const menuClose = document.getElementById("menu-close");

function isMobile() {
  return window.innerWidth < 600;
}

function isTablet() {
  return window.innerWidth >= 600 && window.innerWidth <= 1024;
}

// Ouvre le menu popup uniquement sur mobile et tablette
burger.addEventListener("click", () => {
  if (isMobile() || isTablet()) {
    popup.style.display = "flex";
  }
});

// Ferme le menu popup
menuClose.addEventListener("click", () => {
  popup.style.display = "none";
});

// Ajoute l'écoute des clics sur chaque item de menu
document.querySelectorAll("#menu-liste li").forEach((item) => {
  item.addEventListener("click", () => {
    popup.style.display = "none";

    switch (item.id) {
      case "Accueil":
        // Remonte en haut de la page
        window.scrollTo({ top: 0, behavior: "smooth" });
        break;

      case "Compétences":
        // Scroll vers la section Compétences techniques
        const skillsSection = document.getElementById("skills");
        if (skillsSection) {
          skillsSection.scrollIntoView({ behavior: "smooth" });
        }
        break;

      case "Expériences":
        // Scroll vers la section Expériences (à créer)
        const expSection = document.getElementById("experiences");
        if (expSection) {
          expSection.scrollIntoView({ behavior: "smooth" });
        }
        break;

      case "Contact":
        // Redirection vers la page Contact (à adapter si nécessaire)
        window.location.href = "/billaldev/html/contact.html";
        break;
    }
  });
});
