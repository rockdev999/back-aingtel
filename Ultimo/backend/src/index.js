import express from "express";
import cors from "cors";
import { PORT } from "./config.js";
import { connection } from "./db.js";
import { dealerRoute } from "./routes/dealer.routes.js";
import { userRouter } from "./routes/users.routes.js";
import { productRouter } from "./routes/product.routes.js";
import path from "path";
import { fileURLToPath } from "url";
import { categoryRoute } from "./routes/category.routes.js";
import { QuotationRoute } from "./routes/quotation.routes.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración CORS antes de los archivos estáticos
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(categoryRoute);
app.use(dealerRoute);
app.use(userRouter);
app.use(productRouter);
app.use(QuotationRoute);

app.listen(PORT, () => {
  console.log("servidor en el puerto " + PORT);
});
