// api/server.js
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ API server berjalan. Gunakan endpoint /api/admin/login untuk login.");
});

app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email dan password wajib diisi" });
  }

  // Contoh dummy: ganti dengan pengecekan DB/Supabase
  if (email === "admin@example.com" && password === "secret") {
    const admin = { id: 1, nama: "Admin Utama", email: "admin@example.com" };
    return res.json({ ok: true, admin });
  }

  return res.status(401).json({ error: "Kredensial salah" });
});

app.listen(PORT, () => {
  console.log(`✅ API Server running on http://localhost:${PORT}`);
});
