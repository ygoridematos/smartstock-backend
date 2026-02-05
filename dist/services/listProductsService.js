"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../database/prisma");
class ListProductsService {
    async execute({ page = 1, limit = 20, name }) {
        const skip = (page - 1) * limit;
        // 👇 Tipamos explicitamente como o Prisma espera
        const where = name
            ? {
                name: {
                    contains: name,
                    mode: "insensitive", // agora TS entende o tipo correto
                },
            }
            : {};
        const [products, total] = await Promise.all([
            prisma_1.prisma.product.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
            }),
            prisma_1.prisma.product.count({ where }),
        ]);
        return {
            data: products,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
}
exports.default = new ListProductsService();
