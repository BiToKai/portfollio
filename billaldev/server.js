const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Serveurs statiques pour css, js, assets, fonts
app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/js", express.static(path.join(__dirname, "js")));
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use("/fonts", express.static(path.join(__dirname, "fonts")));

// Fonction qui insère header et footer dans une page HTML donnée
function renderPage(filePath) {
  let content = fs.readFileSync(filePath, "utf-8");
  content = content.replace(/<!--#include file="(.+?)"-->/g, (match, includePath) => {
    const includeFullPath = path.join(path.dirname(filePath), includePath);
    if (fs.existsSync(includeFullPath)) {
      return fs.readFileSync(includeFullPath, "utf-8");
    }
    return `<!-- fichier ${includePath} introuvable -->`;
  });
  return content;
}

// Page d'accueil
app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "html", "index.html");
  res.send(renderPage(filePath));
});

// Route générique qui sert toutes les pages via le renderPage (ajoute header/footer)
app.get("/:page", (req, res) => {
  let pageName = req.params.page;

  // Ajoute l'extension .html uniquement si aucun point dans le nom (pas déjà une extension)
  if (!pageName.includes(".")) {
    pageName += ".html";
  }

  const filePath = path.join(__dirname, "html", pageName);
  if (fs.existsSync(filePath)) {
    res.send(renderPage(filePath));
  } else {
    res.status(404).send("Page non trouvée");
  }
});

app.listen(PORT, () => {
  console.log(`✅ Serveur lancé : http://localhost:${PORT}`);
});
