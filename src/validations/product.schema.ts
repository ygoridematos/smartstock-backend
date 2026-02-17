import { z } from "zod";

/**
 * SCHEMA DE VALIDAÇÃO (ZOD)
 * Centraliza as regras de integridade dos dados.
 * O Zod valida os dados recebidos antes de chegarem aos services.
 */

/**
 * Schema para CRIAÇÃO de um produto.
 * Todos os campos são obrigatórios.
 */
export const createProductSchema = z.object({
  name: z
    .string()
    .min(3, "Nome deve ter no mínimo 3 caracteres")
    .max(100, "Nome muito longo"),

  price: z
    .number()
    .positive("Preço deve ser um valor positivo")
    .finite("Preço inválido"),

  quantity: z
    .number()
    .int("Quantidade deve ser um número inteiro")
    .nonnegative("Quantidade não pode ser negativa"),
});

/**
 * Schema para ATUALIZAÇÃO de um produto.
 * Usamos .partial() para tornar todos os campos opcionais,
 * permitindo atualizações parciais (PATCH ou PUT com campos parciais).
 */
export const updateProductSchema = createProductSchema.partial();
