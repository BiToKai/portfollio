const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const HTML_DIR = path.join(ROOT, "html");
const OUT_DIR = path.join(ROOT, "build");
const STATIC_DIRS = ["css", "js", "assets", "fonts"];

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// Read a file and replace include directives <!--#include file="..."-->
function renderPage(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  content = content.replace(/<!--#include file="(.+?)"-->/g, (m, inc) => {
    // allow include paths relative to html directory or same dir as file
    const tryPaths = [path.join(path.dirname(filePath), inc), path.join(HTML_DIR, inc)];
    for (const p of tryPaths) {
      if (fs.existsSync(p) && fs.statSync(p).isFile()) {
        return fs.readFileSync(p, "utf8");
      }
    }
    return `<!-- include ${inc} not found -->`;
  });
  return content;
}

// Copy static directories (preserve tree)
function copyStatic() {
  for (const dir of STATIC_DIRS) {
    const src = path.join(ROOT, dir);
    if (!fs.existsSync(src)) continue;
    const dest = path.join(OUT_DIR, dir);
    copyRecursive(src, dest);
  }
}

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    ensureDir(dest);
    for (const entry of fs.readdirSync(src)) {
      const srcEntry = path.join(src, entry);
      const destEntry = path.join(dest, entry);
      copyRecursive(srcEntry, destEntry);
    }
  } else if (stat.isFile()) {
    ensureDir(path.dirname(dest));
    fs.copyFileSync(src, dest);
  }
}

// Build HTML files, skipping items starting with '_'
// Build HTML files by scanning the project root for .html files (not starting with '_')
// and by processing any html files inside `html/` subfolder. We skip static dirs.
function buildHtmlFromRoot() {
  const entries = fs.readdirSync(ROOT, { withFileTypes: true });

  for (const entry of entries) {
    const name = entry.name;

    // Skip static dirs, build dir, and underscored files/dirs
    if (name === path.basename(OUT_DIR)) continue;
    if (STATIC_DIRS.includes(name)) continue;
    if (name.startsWith("_")) continue;

    const abs = path.join(ROOT, name);
    if (entry.isFile() && path.extname(name) === ".html") {
      // render and write to build/<same name>
      const outPath = path.join(OUT_DIR, name);
      ensureDir(path.dirname(outPath));
      const rendered = renderPage(abs);
      fs.writeFileSync(outPath, rendered, "utf8");
      console.log("Wrote", outPath);
    } else if (entry.isDirectory()) {
      // also scan subdirectories (but skip html/ because it's handled separately below)
      if (name === path.basename(HTML_DIR)) continue;
      copyHtmlDir(abs, path.join(OUT_DIR, name));
    }
  }

  // Also include any .html files inside the `html/` directory (existing behavior)
  if (fs.existsSync(HTML_DIR)) {
    const htmlEntries = fs.readdirSync(HTML_DIR);
    for (const file of htmlEntries) {
      if (file.startsWith("_")) continue;
      const srcPath = path.join(HTML_DIR, file);
      const stat = fs.statSync(srcPath);
      if (stat.isFile() && path.extname(file) === ".html") {
        const outPath = path.join(OUT_DIR, file);
        ensureDir(path.dirname(outPath));
        const rendered = renderPage(srcPath);
        fs.writeFileSync(outPath, rendered, "utf8");
        console.log("Wrote", outPath);
      } else if (stat.isDirectory()) {
        copyHtmlDir(srcPath, path.join(OUT_DIR, file));
      }
    }
  }
}

function copyHtmlDir(srcDir, destDir) {
  for (const entry of fs.readdirSync(srcDir)) {
    if (entry.startsWith("_")) continue;
    const srcEntry = path.join(srcDir, entry);
    const destEntry = path.join(destDir, entry);
    const stat = fs.statSync(srcEntry);
    if (stat.isDirectory()) {
      for (const child of fs.readdirSync(srcEntry)) {
        // handled by recursion
      }
      copyHtmlDir(srcEntry, destEntry);
    } else if (stat.isFile() && path.extname(entry) === ".html") {
      ensureDir(path.dirname(destEntry));
      const rendered = renderPage(srcEntry);
      fs.writeFileSync(destEntry, rendered, "utf8");
      console.log("Wrote", destEntry);
    } else {
      // non-html files inside html directory -> copy as-is (images etc)
      ensureDir(path.dirname(destEntry));
      fs.copyFileSync(srcEntry, destEntry);
      console.log("Copied", destEntry);
    }
  }
}

function cleanOut() {
  if (fs.existsSync(OUT_DIR)) {
    fs.rmSync(OUT_DIR, { recursive: true, force: true });
  }
  ensureDir(OUT_DIR);
}

function main() {
  console.log("Building site to", OUT_DIR);
  cleanOut();
  buildHtmlFromRoot();
  copyStatic();
  console.log("Build complete");
}

if (require.main === module) main();
