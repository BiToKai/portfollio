// Quand le DOM est complètement chargé execute le code suivant
document.addEventListener("DOMContentLoaded", () => {
  // Declaration des variables
  const form = document.querySelector("form");
  const nom = document.querySelector("#nom");
  const nomError = document.querySelector("#nom-error");
  const prenom = document.querySelector("#prenom");
  const prenomError = document.querySelector("#prenom-error");
  const mail = document.querySelector("#email");
  const mailError = document.querySelector("#mail-error");
  const sujet = document.querySelector("#sujet");
  const message = document.querySelector("#message");

  // Règles de validation des champs
  // Le prénom et le nom ne doivent contenir que des lettres, espaces ou tirets.
  const prenomPattern = /^[a-zA-ZÀ-ÿ\s-]+$/;
  const nomPattern = /^[a-zA-ZÀ-ÿ\s-]+$/;
  // Accepte une suite de caractères alphanumériques, tirets, points avant l’@, puis un domaine valide.
  const mailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  // Prénom
  // Quand on écrit dans le champ prénom
  prenom.addEventListener("input", function () {
    // Si cela ne correspond pas au pattern
    if (!prenomPattern.test(prenom.value)) {
      // Alors on affiche le message d'erreur
      prenomError.style.display = "block";
    }
    // Autrement on le masque
    else {
      prenomError.style.display = "none";
    }
  });

  // Nom
  // Quand on écrit dans le champ nom
  nom.addEventListener("input", function () {
    // Si cela ne correspond pas au pattern
    if (!nomPattern.test(nom.value)) {
      // Alors on affiche le message d'erreur
      nomError.style.display = "block";
    }
    // Autrement on le masque
    else {
      nomError.style.display = "none";
    }
  });

  // E-mail
  // Quand on écrit dans le champ e-mail
  mail.addEventListener("input", function () {
    // Si cela ne correspond pas au pattern
    if (!mailPattern.test(mail.value)) {
      mailError.style.display = "block";
    }
    // Autrement on le masque
    else {
      mailError.style.display = "none";
    }
  });

  // Quand on soumet le formulaire cela execute la fonction suivante
  form.addEventListener("submit", function (event) {
    // Par défaut on n'envoie pas le formulaire
    event.preventDefault();

    // Récupère la valeur(true/false) de la case à cocher des conditions d'utilisation
    const terms = document.querySelector("#terms").checked;
    // On récupère la réponse du hCaptcha si elle existe (?), sinon on met une chaîne vide.
    const hcaptchaResponse = document.querySelector('textarea[name="h-captcha-response"]')?.value.trim() || "";

    // Variable pour vérifier la validité globale
    let formulaireValide = true;

    // Vérifier les champs vides
    // Si un des champs est vide
    if (
      nom.value.trim() === "" ||
      prenom.value.trim() === "" ||
      mail.value.trim() === "" ||
      sujet.value.trim() === "" ||
      message.value.trim() === ""
    ) {
      // Alors on affiche le message d'erreur
      alert("Veuillez remplir tous les champs obligatoires.");
      // Et on indique que le formulaire n'est pas valide
      formulaireValide = false;
    }

    // Si la case des conditions d'utilisation n'est pas cochée
    if (!terms) {
      // Alors on affiche le message d'erreur
      alert("Veuillez accepter les conditions d'utilisation.");
      // Et on indique que le formulaire n'est pas valide
      formulaireValide = false;
    }

    // Si le captcha n'est pas validé
    if (!hcaptchaResponse) {
      // Alors on affiche le message d'erreur
      alert("Veuillez valider le captcha pour continuer.");
      // Et on indique que le formulaire n'est pas valide
      formulaireValide = false;
    }

    // Si le champ nom ne respecte pas le pattern
    if (!nomPattern.test(nom.value.trim())) {
      // Alors on affiche le message d'erreur
      nomError.style.display = "block";
      // Et on indique que le formulaire n'est pas valide
      formulaireValide = false;
    }
    // Si le champ prénom ne respecte pas le pattern
    if (!prenomPattern.test(prenom.value.trim())) {
      // Alors on affiche le message d'erreur
      prenomError.style.display = "block";
      // Et on indique que le formulaire n'est pas valide
      formulaireValide = false;
    }
    // Si le champ e-mail ne respecte pas le pattern
    if (!mailPattern.test(mail.value.trim())) {
      // Alors on affiche le message d'erreur
      mailError.style.display = "block";
      // Et on indique que le formulaire n'est pas valide
      formulaireValide = false;
    }

    // si le formulaire est valide
    if (formulaireValide) {
      // Code pour envoyer le formulaire si c'était pas la démo.
      // Et on  affiche le message de succès
      alert("Votre message a été envoyé avec succès !\nJe vous répondrai dans les plus brefs délais.");

      // Et on réinitialise le formulaire
      form.reset();
    }
  });
});
