"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../database/prisma");
/**
 * Service cuida apenas da regra de negócio e banco
 * NÃO faz validação de formato — isso é papel do controller
 */
class CreateProductService {
    async execute(name, quantity) {
        const product = await prisma_1.prisma.product.create({
            data: { name, quantity },
        });
        return product;
    }
}
exports.default = new CreateProductService();
