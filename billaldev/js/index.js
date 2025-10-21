// // Sélectionne les onglets et les compétences
// const tabs = document.querySelectorAll(".skills-tabs .tab");
// const skills = document.querySelectorAll(".skills-list li");

// function updateBorders() {
//   // Retire la classe sur tous les li
//   skills.forEach((skill) => skill.classList.remove("last-visible"));
//   // Récupère tous les éléments visibles
//   const visibleSkills = Array.from(skills).filter((skill) => skill.style.display !== "none");
//   if (visibleSkills.length) {
//     visibleSkills[visibleSkills.length - 1].classList.add("last-visible");
//   }
// }

// tabs.forEach((tab) => {
//   tab.addEventListener("click", () => {
//     tabs.forEach((t) => t.classList.remove("active"));
//     tab.classList.add("active");

//     const category = tab.dataset.category;
//     skills.forEach((skill) => {
//       if (category === "all" || skill.dataset.category === category) {
//         skill.style.display = "flex";
//       } else {
//         skill.style.display = "none";
//       }
//     });
//     updateBorders();
//   });
// });

// // Initialisation des bordures au chargement
// updateBorders();
// Sélectionne les onglets et les compétences
const tabs = document.querySelectorAll(".skills-tabs .tab");
const skills = document.querySelectorAll(".skills-list li");

function updateBorders() {
  // Retire la classe sur tous les li
  skills.forEach((skill) => skill.classList.remove("last-visible"));
  // Récupère tous les éléments visibles
  const visibleSkills = Array.from(skills).filter((skill) => skill.style.display !== "none");
  if (visibleSkills.length) {
    visibleSkills[visibleSkills.length - 1].classList.add("last-visible");
  }
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    // Désactive tous les onglets
    tabs.forEach((t) => {
      t.classList.remove("active");
      // accessibilité : état inactif
      t.setAttribute("aria-pressed", "false");
    });

    // Active l’onglet cliqué
    tab.classList.add("active");
    // accessibilité : état actif
    tab.setAttribute("aria-pressed", "true");

    // Récupère la catégorie associée
    const category = tab.dataset.category;

    // Affiche/masque les compétences
    skills.forEach((skill) => {
      if (category === "all" || skill.dataset.category === category) {
        skill.style.display = "flex";
      } else {
        skill.style.display = "none";
      }
    });

    updateBorders();
  });
});

// Initialisation des bordures au chargement
updateBorders();

// Initialisation de l’état aria-pressed (par défaut, "Tous" est actif)
tabs.forEach((t) => t.setAttribute("aria-pressed", "false"));
const activeTab = document.querySelector(".skills-tabs .tab.active");
if (activeTab) {
  activeTab.setAttribute("aria-pressed", "true");
}
