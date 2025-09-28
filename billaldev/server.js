const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Servir les fichiers statiques (HTML, CSS, JS, images…)
app.use("/hmtl", express.static(path.join(__dirname, "html")));
// app.use(express.static(path.join(__dirname, "html"))); // Ajout pour servir les fichiers HTML statiques
app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/js", express.static(path.join(__dirname, "js")));
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use("/fonts", express.static(path.join(__dirname, "fonts")));

// Fonction qui insère header et footer dans une page
function renderPage(filePath) {
  let content = fs.readFileSync(filePath, "utf-8");
  // Remplacer les includes <!--#include file="...-->
  content = content.replace(/<!--#include file="(.+?)"-->/g, (match, includePath) => {
    const includeFullPath = path.join(path.dirname(filePath), includePath);
    if (fs.existsSync(includeFullPath)) {
      return fs.readFileSync(includeFullPath, "utf-8");
    }
    return `<!-- fichier ${includePath} introuvable -->`;
  });
  return content;
}

// Page d’accueil = home.html
app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "html", "home.html");
  res.send(renderPage(filePath));
});

// Route générique : /contact → contact.html
app.get("/:page", (req, res) => {
  const requestedPage = req.params.page;
  const filePath = path.join(__dirname, "html", requestedPage + ".html");
  if (fs.existsSync(filePath)) {
    res.send(renderPage(filePath));
  } else {
    res.status(404).send("Page non trouvée");
  }
});

app.listen(PORT, () => {
  console.log(`✅ Serveur lancé : http://localhost:${PORT}`);
});
