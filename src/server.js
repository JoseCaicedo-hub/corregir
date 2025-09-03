// app.js o server.js
import express from "express";
import routes from "./routes/productRoutes.js";
import dotenv from "dotenv";
import { connect } from "./prismaClient.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // Permite recibir JSON desde el frontend
 // Permite peticiones desde otros orígenes (ej: frontend)
app.use("/api", routes); // todas las rutas están bajo /api


connect();

//Puesta en marcha de servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
});
