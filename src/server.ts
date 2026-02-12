import express from "express";
import cors from "cors";
import productRoutes from "./routes/product.routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

/**
 * CONFIGURAÇÃO DO CORS
 * Define quem pode acessar a API.
 * Em produção, é vital restringir a 'origin' para o domínio do seu frontend.
 */
app.use(
  cors({
    origin: [
      "http://localhost:3000", // Frontend local
      "https://smartstock-frontend-wheat.vercel.app", // Frontend em produção
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  }),
);

// Habilita o parse de JSON no corpo das requisições
app.use(express.json());

// ================= ROTAS =================

// Documentação interativa (Swagger UI)
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas de Domínio (Produtos)
app.use("/products", productRoutes);

// Health Check (usado por serviços de cloud como Render/AWS para saber se a API caiu)
app.get("/health", (_, res) => {
  res.json({ status: "ok", timestamp: new Date() });
});

// ================= ERROS =================
// Middleware global de erros deve ser SEMPRE o último uso do app
app.use(errorHandler);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📑 Docs available at http://localhost:${PORT}/docs`);
});
