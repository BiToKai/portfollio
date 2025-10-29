const prenomPattern = /^[a-zA-ZÀ-ÿ\s-]+$/;
const nomPattern = /^[a-zA-ZÀ-ÿ\s-]+$/;
const mailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

// Validation du prénom
prenom.addEventListener("input", () => {
  if (!prenomPattern.test(prenom.value)) {
    prenomError.style.display = "block";
  } else {
    prenomError.style.display = "none";
  }
});

// Vérification complète à la soumission
form.addEventListener("submit", (event) => {
  const terms = document.querySelector("#terms").checked;
  const hcaptchaResponse = document.querySelector('textarea[name="h-captcha-response"]')?.value.trim() || "";
  let formulaireValide = true;

  if (!terms) {
    alert("Veuillez accepter les conditions d'utilisation.");
    formulaireValide = false;
  }

  if (!hcaptchaResponse) {
    alert("Veuillez valider le captcha pour continuer.");
    formulaireValide = false;
  }

  if (!formulaireValide) event.preventDefault();
  else {
    event.preventDefault();
    alert("✅ Votre message a été envoyé avec succès !");
    form.reset();
  }
});
