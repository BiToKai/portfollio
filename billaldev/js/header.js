const burger = document.querySelector(".burger");
const popup = document.getElementById("popup");
const menuClose = document.getElementById("menu-close");

function isMobile() {
  return window.innerWidth < 600;
}

function isTablet() {
  return window.innerWidth >= 600 && window.innerWidth <= 1024;
}

burger.addEventListener("click", () => {
  if (isMobile() || isTablet()) {
    popup.style.display = "flex";
  }
});

menuClose.addEventListener("click", () => {
  popup.style.display = "none";
});

document.querySelectorAll("#menu-liste li").forEach((item) => {
  item.addEventListener("click", (event) => {
    event.preventDefault();
    popup.style.display = "none";

    switch (item.id) {
      case "Accueil":
        if (window.location.pathname.endsWith("home.html") || window.location.pathname === "/") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          window.location.href = "home.html";
        }
        break;

      case "Compétences":
        if (window.location.pathname.endsWith("home.html") || window.location.pathname === "/") {
          const skillsSection = document.getElementById("skills");
          if (skillsSection) {
            skillsSection.scrollIntoView({ behavior: "smooth" });

            setTimeout(() => {
              const yOffset = -75; // hauteur du header sticky
              const y = skillsSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
              window.scrollTo({ top: y, behavior: "smooth" });
            }, 300);
          }
          // Met à jour le hash dans l'URL de manière propre
          history.replaceState(null, null, "#competences-techniques");
        } else {
          window.location.href = "home#competences-techniques";
        }
        break;

      case "Expériences":
        if (window.location.pathname.endsWith("home.html") || window.location.pathname === "/") {
          const expSection = document.getElementById("experiences");
          if (expSection) {
            expSection.scrollIntoView({ behavior: "smooth" });

            setTimeout(() => {
              const yOffset = -75; // hauteur du header sticky
              const y = expSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
              window.scrollTo({ top: y, behavior: "smooth" });
            }, 300);
          }
        } else {
          window.location.href = "home#experiences";
        }
        break;

      case "Contact":
        if (!window.location.pathname.endsWith("contact.html")) {
          window.location.href = "contact";
        }
        break;
    }
  });
});

// Ajuste dynamique du padding main selon le scroll
function adjustMainPadding() {
  const main = document.querySelector("main");
  if (!main) return;

  if (window.scrollY === 0) {
    // espace minimal quand en haut
    main.style.paddingTop = "10px";
  } else {
    // hauteur header sticky quand on scroll
    main.style.paddingTop = "75px";
  }
}

window.addEventListener("load", adjustMainPadding);
window.addEventListener("scroll", adjustMainPadding);
