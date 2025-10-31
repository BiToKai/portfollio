// Sélectionne les onglets et les compétences
const tabs = document.querySelectorAll(".skills-tabs .tab");
const skills = document.querySelectorAll(".skills-list li");

function updateBorders() {
  console.log("Début de updateBorders");
  // Retire la classe sur tous les li
  skills.forEach((skill) => skill.classList.remove("last-visible"));
  console.log("Variable skills", skills);
  //   Convertit skills en un vrai tableau/array
  const skillsAsArray = Array.from(skills);
  console.log("skillsAsArray", skillsAsArray);
  // Récupère tous les éléments visibles
  const visibleSkills = skillsAsArray.filter((skill) => skill.style.display !== "none");
  console.log("visibleSkills", visibleSkills);
  //   Ajoute last-visible au dernier de la liste.
  visibleSkills[visibleSkills.length - 1].classList.add("last-visible");
}
// Ajoute un écouteur d'événement à chaque onglet
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
// updateBorders();
