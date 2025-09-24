const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Servir les fichiers statiques (CSS, JS, images…)
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
// To run the server, use the command: node server.js
// Make sure you have the necessary HTML files in the 'html' directory and static assets in 'css' and 'js' directories.
// Example HTML files: home.html, contact.html, legal.html, privacy.html
// Example static files: css/style.css, js/script.js
// The server will automatically include header and footer in each HTML page.
