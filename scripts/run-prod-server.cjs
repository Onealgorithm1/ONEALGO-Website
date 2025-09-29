const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/ping", (_req, res) => res.json({ message: "ping" }));

const distPath = path.join(__dirname, "..", "dist", "spa");
app.use(express.static(distPath));
app.get("*", (req, res) => {
  if (req.path.startsWith("/api/") || req.path.startsWith("/health"))
    return res.status(404).json({ error: "API endpoint not found" });
  res.sendFile(path.join(distPath, "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Prod server running on", port));
