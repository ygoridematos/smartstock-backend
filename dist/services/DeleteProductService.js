"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../database/prisma");
const AppError_1 = __importDefault(require("../errors/AppError"));
class DeleteProductService {
    async execute(id) {
        // Verifica se o produto existe antes de deletar
        const productExists = await prisma_1.prisma.product.findUnique({
            where: { id },
        });
        if (!productExists) {
            throw new AppError_1.default("Produto não encontrado", 404);
        }
        // Deleta o produto do banco
        await prisma_1.prisma.product.delete({
            where: { id },
        });
    }
}
exports.default = new DeleteProductService();
