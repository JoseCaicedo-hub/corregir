// app.js o server.js
import express from "express";
import routes from "./routes/productRoutes.js";

const app = express();
app.use("/api", routes); // todas las rutas están bajo /api
app.listen(3000, () => console.log("Servidor corriendo en el puerto 3000"));
dotenv.config();
app.use(cors()); // Permite peticiones desde otros orígenes (ej: frontend)
app.use(express.json()); // Permite recibir JSON desde el frontend


connect();

//Puesta en marcha de servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
});
