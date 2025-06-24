import express from "express";
import { createServer } from "http";           
import { Server } from "socket.io";            
import { PORT } from "./config.js";
import { sequelize } from "./models/index.js";

import publicationRouter from "./routes/publication.routes.js";
import buyerRouter from "./routes/buyers.routes.js";
import contactRouter from "./routes/contact.routes.js";
import purchaseRouter from './routes/purchase.routes.js';
import locationRouter from './routes/location.routes.js';
import orderRouter from './routes/order.routes.js';
import categoriesRouter from './routes/categories.routes.js';
import chatRouter from './routes/chats.routes.js';

import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(express.json({ limit: '2mb' }));


app.use(publicationRouter);
app.use(buyerRouter);
app.use(contactRouter);
app.use(purchaseRouter);
app.use(locationRouter);
app.use(orderRouter);
app.use(categoriesRouter);
app.use(chatRouter);

io.on("connection", (socket) => {
  console.log("Usuario conectado:", socket.id);

  socket.on("join", (chatId) => {
    socket.join(String(chatId));
    console.log(`Usuario unido a la sala: ${chatId}`);
  });

  socket.on("sendMessage", (message) => {
    io.to(String(message.chat_id)).emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
  });
});

async function main() {
  try {
    await sequelize.sync({ alter: true });
    console.log("Base de datos sincronizada");

    server.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Error al conectar con la base de datos:", err);
  }
}

main();
