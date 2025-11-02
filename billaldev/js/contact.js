// Création de variable
const form = document.querySelector("form");
const nom = document.querySelector("#nom");
const nomError = document.querySelector("#nom-error");
const prenom = document.querySelector("#prenom");
const prenomError = document.querySelector("#prenom-error");
const mail = document.querySelector("#email");
const mailError = document.querySelector("#mail-error");
const sujet = document.querySelector("#sujet");
const message = document.querySelector("#message");
const submitBtn = document.querySelector(".submit-btn");

// Règles de validation des champs
// Le prénom et le nom ne doivent contenir que des lettres, espaces ou tirets.
const prenomPattern = /^[a-zA-ZÀ-ÿ\s-]+$/;
const nomPattern = /^[a-zA-ZÀ-ÿ\s-]+$/;
// Accepte une suite de caractères alphanumériques, tirets, points avant l’@, puis un domaine valide.
const mailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

// Pénom
prenom.addEventListener("input", function () {
  // Afficher dans la console
  console.log(prenom.value);
  // Autorise les lettres(maj-min), les espaces et les tirets
  // (le ! transforme le if en if not) Si cela ne correspond pas. Affiche le message.
  if (!prenomPattern.test(prenom.value)) {
    prenomError.style.display = "block";
  } else {
    prenomError.style.display = "none";
  }
});

// Nom
nom.addEventListener("input", function () {
  console.log(nom.value);
  if (!nomPattern.test(nom.value)) {
    nomError.style.display = "block";
  } else {
    nomError.style.display = "none";
  }
});

// E-mail
mail.addEventListener("input", function () {
  console.log(mail.value);
  if (!mailPattern.test(mail.value)) {
    mailError.style.display = "block";
  } else {
    mailError.style.display = "none";
  }
});

// Vérifiez que les champs de  prenom, nom, e-mail, sujet, message ne sont pas vides.
form.addEventListener("submit", function (event) {
  // Récupérer la case à cocher et le captcha
  const terms = document.querySelector("#terms").checked;
  const hcaptchaResponse = document.querySelector('textarea[name="h-captcha-response"]')?.value.trim() || "";

  // Variable pour vérifier la validité globale
  let formulaireValide = true;

  // Vérifier les champs vides
  if (
    nom.value.trim() === "" ||
    prenom.value.trim() === "" ||
    mail.value.trim() === "" ||
    sujet.value.trim() === "" ||
    message.value.trim() === ""
  ) {
    alert("Veuillez remplir tous les champs obligatoires.");
    formulaireValide = false;
  }

  // Vérifier l'acceptation des conditions
  if (!terms) {
    alert("Veuillez accepter les conditions d'utilisation.");
    formulaireValide = false;
  }

  // Vérifier le captcha hCaptcha
  if (!hcaptchaResponse) {
    alert("Veuillez valider le captcha pour continuer.");
    formulaireValide = false;
  }

  // Vérifier les formats des champs (affiche les erreurs si besoin)
  if (!nomPattern.test(nom.value.trim())) {
    nomError.style.display = "block";
    formulaireValide = false;
  }
  if (!prenomPattern.test(prenom.value.trim())) {
    prenomError.style.display = "block";
    formulaireValide = false;
  }
  if (!mailPattern.test(mail.value.trim())) {
    mailError.style.display = "block";
    formulaireValide = false;
  }

  // Si le formulaire n'est pas valide, empêcher l'envoi
  if (!formulaireValide) {
    // Empêche l'envoi du formulaire
    event.preventDefault();
  } else {
    //  On empêche l'envoi du formulaire (même si valide dans pour cette démo)
    event.preventDefault();
    // On affiche un message de succès
    alert("Votre message a été envoyé avec succès !\nJe vous répondrai dans les plus brefs délais.");
    // On réinitialise le formulaire
    form.reset();
  }
});
