"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./docs/swagger");
const errorHandler_1 = require("./middlewares/errorHandler");
const app = (0, express_1.default)();
// HABILITA CORS PARA O FRONTEND
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
}));
app.use(express_1.default.json());
// Rota da documentação
app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
// Rotas da aplicação
app.use("/products", product_routes_1.default);
// Rota de saúde da API
app.get("/health", (_, res) => {
    res.json({ status: "ok" });
});
// Middleware global de erros (SEMPRE o último)
app.use(errorHandler_1.errorHandler);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
