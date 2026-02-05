"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../database/prisma");
const AppError_1 = __importDefault(require("../errors/AppError"));
class GetProductByIdService {
    async execute(id) {
        // Busca produto pelo ID
        const product = await prisma_1.prisma.product.findUnique({
            where: { id },
        });
        // Se não encontrar, lança erro 404
        if (!product) {
            throw new AppError_1.default("Produto não encontrado", 404);
        }
        return product;
    }
}
exports.default = new GetProductByIdService();
