import { z } from "zod";

/**
 * SCHEMA DE VALIDAÇÃO (ZOD)
 * Centraliza as regras de integridade dos dados.
 */

export const createProductSchema = z.object({
  name: z
    .string({ required_error: "Nome é obrigatório" })
    .min(3, "Nome deve ter no mínimo 3 caracteres")
    .max(100, "Nome muito longo"),

  quantity: z
    .number({ required_error: "Quantidade é obrigatória" })
    .int("Quantidade deve ser um número inteiro")
    .nonnegative("Quantidade não pode ser negativa"),
});

// Partial torna todos os campos opcionais para updates parciais (PATCH/PUT)
export const updateProductSchema = createProductSchema.partial();
