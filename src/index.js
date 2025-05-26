import express from "express";
import { PORT } from "./config.js";
import { sequelize } from "./models/index.js";

import publicationRouter from "./routes/publication.routes.js";
import buyerRouter from "./routes/buyers.routes.js";

import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use(publicationRouter);
app.use(buyerRouter);

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
