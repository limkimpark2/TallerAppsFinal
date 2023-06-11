// // cargar variables de entorno
// require("dotenv").config();

module.exports = (httpServer) => {
  const { Server } = require("socket.io");
  const { instrument } = require("@socket.io/admin-ui");

  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      // credentials: true,
    },
  });

  instrument(io, {
    // auth: false,
    auth: {
      type: "basic",
      username: process.env.SOCKET_ADMIN_UI_USERNAME || "admin",
      password:
        process.env.SOCKET_ADMIN_UI_PASSWORD ||
        "a$2a$12$z2GkYy21wBEcfP82kal0H.mTVx/OdxJ2Bfi8yJOmYHhmdYSZi6xIi", // password
    },
    mode: "development",
  });

  // Cuando un cliente se conecta
  io.on("connection", (socket) => {
    console.log("Un cliente se ha conectado");

    // Escuchar el evento "compra"
    socket.on("compra", (datos) => {
      console.log(datos);

      io.emit("nueva-compra", datos);
    });

    // Escuchar el evento "chat"
    socket.on("chat", (chat) => {
      console.log(chat);

      io.emit("chat", chat);
    });

    console.log(socket.id);

    // Escuchar el evento "disconnect"
    socket.on("disconnect", () => {
      console.log("El cliente se ha desconectado");
    });

    // Escuchar el evento "comentario"
    socket.on("comentario", (datos) => {
      console.log(datos);

      io.emit("nuevo-comentario", datos);
    });
  });
};
