import express from "express";
import { PORT } from "./config.js";
import { sequelize } from "./models/index.js";

import publicationRouter from "./routes/publication.routes.js";
import buyerRouter from "./routes/buyers.routes.js";
import contactRouter from "./routes/contact.routes.js";
import purchaseRouter from './routes/purchase.routes.js';
import locationRouter from './routes/location.routes.js';
import orderRouter from './routes/order.routes.js';

import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir imágenes estáticas
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(express.json({ limit: '30mb' }));

app.use(publicationRouter);
app.use(buyerRouter);
app.use(contactRouter);
app.use(purchaseRouter);
app.use(locationRouter);
app.use(orderRouter);

async function main() {
  try {
    await sequelize.sync({ alter: true });
    console.log("Base de datos sincronizada");

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Error al conectar con la base de datos:", err);
  }
}

main();
