const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/ping", (_req, res) => res.json({ message: "ping" }));

app.post("/api/verify-recaptcha", async (req, res) => {
  try {
    const token = req.body.token || req.query.token;
    if (!token)
      return res.status(400).json({ success: false, message: "Missing token" });
    const secret = process.env.RECAPTCHA_SECRET;
    if (!secret)
      return res
        .status(500)
        .json({ success: false, message: "Recaptcha secret not configured" });
    const params = new URLSearchParams();
    params.append("secret", secret);
    params.append("response", token);
    const r = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });
    const data = await r.json();
    if (data.success) return res.json({ success: true, data });
    return res.status(400).json({ success: false, data });
  } catch (err) {
    console.error("verify error", err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

const distPath = path.join(__dirname, "..", "dist", "spa");
app.use(express.static(distPath));
app.get("*", (req, res) => {
  if (req.path.startsWith("/api/") || req.path.startsWith("/health"))
    return res.status(404).json({ error: "API endpoint not found" });
  res.sendFile(path.join(distPath, "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Prod server running on", port));
