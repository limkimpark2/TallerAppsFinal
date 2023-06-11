const express = require("express");
const router = express.Router();
const path = require("path");

// Ruta para el admin-ui de Socket.io
router.get("/admin-ui", (req, res) => {
  // http://localhost:3001/admin-ui
  res.sendFile(path.join(__dirname, "socket.io-admin-ui", "index.html"));
});

module.exports = router;
