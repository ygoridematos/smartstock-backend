"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../database/prisma");
const AppError_1 = __importDefault(require("../errors/AppError"));
/**
 * Atualiza produto existente
 * Aqui ficam regras de negócio, não validação de tipos
 */
class UpdateProductService {
    async execute(id, name, quantity) {
        // Verifica se produto existe
        const productExists = await prisma_1.prisma.product.findUnique({
            where: { id },
        });
        if (!productExists) {
            throw new AppError_1.default("Produto não encontrado", 404);
        }
        // Atualiza apenas os campos enviados
        const updatedProduct = await prisma_1.prisma.product.update({
            where: { id },
            data: {
                name,
                quantity,
            },
        });
        return updatedProduct;
    }
}
exports.default = new UpdateProductService();
