const express = require("express");
const cors = require("cors");

function safe(fn, name) {
  try {
    console.log("=> Running", name);
    fn();
    console.log("=> OK", name);
  } catch (e) {
    console.error("!! ERROR during", name, e && e.stack ? e.stack : e);
    process.exit(1);
  }
}

safe(() => {
  const app = express();
  console.log("app created");
}, "create app");

safe(() => {
  const app = express();
  app.use(cors());
  console.log("registered cors");
}, "register cors");

safe(() => {
  const app = express();
  app.use(express.json());
  console.log("registered json parser");
}, "register json");

safe(() => {
  const app = express();
  app.get("/api/ping", (_req, res) => res.json({ message: "ping" }));
  console.log("registered /api/ping");
}, "register /api/ping");

safe(() => {
  const app = express();
  const path = require("path");
  const distPath = path.join(__dirname, "..", "dist", "spa");
  app.use(express.static(distPath));
  console.log("registered static with distPath", distPath);
}, "register static");

console.log("diagnostic complete");
