import io from "socket.io-client";

// Conectar con el servidor de Socket.io
const HOST = import.meta.env.VITE_SOCKET_HOST || "http://localhost";
const PORT = import.meta.env.VITE_SOCKET_PORT || 3000;

const socket = io(`${HOST}:${PORT}`);

export default socket;
