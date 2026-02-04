import express from "express";
import cors from "cors";
import productRoutes from "./routes/product.routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

// HABILITA CORS PARA O FRONTEND
app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);

app.use(express.json());

// Rota da documentação
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas da aplicação
app.use("/products", productRoutes);

// Rota de saúde da API
app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

// Middleware global de erros (SEMPRE o último)
app.use(errorHandler);

app.listen(3333, () => {
  console.log("Servidor rodando na porta 3333 🚀");
});
