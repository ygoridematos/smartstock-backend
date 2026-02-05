"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductSchema = exports.createProductSchema = void 0;
const zod_1 = require("zod");
/**
 * Schema de validação para CRIAR produto
 * Aqui garantimos que os dados recebidos são válidos
 */
exports.createProductSchema = zod_1.z.object({
    // Nome precisa ser texto com tamanho mínimo e máximo
    name: zod_1.z
        .string()
        .min(3, "Nome deve ter no mínimo 3 caracteres")
        .max(100, "Nome muito longo"),
    // Quantidade deve ser número inteiro e não negativo
    quantity: zod_1.z
        .number()
        .int("Quantidade deve ser um número inteiro")
        .nonnegative("Quantidade não pode ser negativa"),
});
/**
 * Schema para ATUALIZAR produto
 * partial() transforma todos os campos em opcionais
 */
exports.updateProductSchema = exports.createProductSchema.partial();
