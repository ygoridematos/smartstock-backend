"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProduct = validateProduct;
/**
 * Middleware responsável por validar os dados
 * de criação de um produto antes de chegar no controller
 */
function validateProduct(req, res, next) {
    // 🔹 Extraímos os dados enviados no corpo da requisição
    const { name, quantity } = req.body;
    // 🔹 Validação: nome é obrigatório
    if (!name) {
        return res.status(400).json({
            error: "Nome do produto é obrigatório",
        });
    }
    // 🔹 Validação: quantity precisa ser número
    if (typeof quantity !== "number") {
        return res.status(400).json({
            error: "Quantidade deve ser um número",
        });
    }
    // 🔹 Validação: quantity não pode ser negativa
    if (quantity < 0) {
        return res.status(400).json({
            error: "Quantidade não pode ser negativa",
        });
    }
    // ✅ Se todas as validações passaram,
    // deixamos a requisição seguir para o controller
    next();
}
