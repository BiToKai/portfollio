// Quand le DOM est complètement chargé execute le code suivant
document.addEventListener("DOMContentLoaded", () => {
  // Declaration des variables
  const tabs = document.querySelectorAll(".skills-tabs .tab");
  const skills = document.querySelectorAll(".skills-list li");

  // Fonction pour gerer le trait sous la derniere compétence visible
  function updateBorders() {
    //   console.log("Début de updateBorders");
    // Retire la classe "last-visible" sur tous les li
    skills.forEach((skill) => skill.classList.remove("last-visible"));

    //   console.log("Variable skills", skills);
    //   Créer  un tableau/array en convertissant la variable skills
    const skillsAsArray = Array.from(skills);

    // Filtre pour récupérer tous les éléments visibles
    const visibleSkills = skillsAsArray.filter((skill) => skill.style.display === "flex");

    //   console.log("visibleSkills", visibleSkills);
    //   Ajoute la classe "last-visible" au dernier de la liste.
    visibleSkills[visibleSkills.length - 1].classList.add("last-visible");
  }

  // Ajoute un écouteur d'événement à chaque onglet
  tabs.forEach((tab) => {
    // Quand on clique sur un onglet
    tab.addEventListener("click", () => {
      // Cela désactive tous les onglets
      tabs.forEach((t) => {
        // En lui retirant la classe "active"
        t.classList.remove("active");
        // Et met aria-pressed à false(accessibilité)
        t.setAttribute("aria-pressed", "false");
      });

      // Active l’onglet cliqué
      tab.classList.add("active");
      // Et met aria-pressed à true (accessibilité)
      tab.setAttribute("aria-pressed", "true");

      // Récupère la catégorie associée
      const tabCategory = tab.dataset.category;

      // Affiche/masque les compétences
      skills.forEach((skill) => {
        // Si la catégorie est "all" ou correspond à la compétence
        if (tabCategory === "all" || tabCategory === skill.dataset.category) {
          //   Alors on affiche la compétence
          skill.style.display = "flex";
          //   Autrement on la masque
        } else {
          skill.style.display = "none";
        }
      });

      // Masque les bordures des compétences sauf de la dernière visible
      updateBorders();
    });
  });
});
