// Cargar variables de entorno
require("dotenv").config();

// Instanciar el servidor de Express
const express = require("express");

const { createServer } = require("http");

const path = require("path");

// Importar el servidor de Socket.io
const servidorRealtime = require("./servidor-tiempo-real");

// Para utilizar cookies en el servidor
const cookieParser = require("cookie-parser");

// Inicializar el servidor de Express
const app = express();
const httpServer = createServer(app);
//configuraciones
const PORT = process.env.PORT || 3000;
app.set("port", PORT);
app.use(cookieParser());

// Definicion de rutas
app.use(require("./routes.js"));

// Servir archivos estaticos para que el navegador pueda acceder a ellos
app.use(express.static(path.join(__dirname, "socket.io-admin-ui")));

// Iniciar el servidor
httpServer.listen(PORT, () => {
  console.log("El servidor está corriendo en el puerto", PORT);
});

// Llamar al  servidor de Socket.io
servidorRealtime(httpServer);
