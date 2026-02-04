import { z } from "zod";

/**
 * Schema de validação para CRIAR produto
 * Aqui garantimos que os dados recebidos são válidos
 */
export const createProductSchema = z.object({
  // Nome precisa ser texto com tamanho mínimo e máximo
  name: z
    .string()
    .min(3, "Nome deve ter no mínimo 3 caracteres")
    .max(100, "Nome muito longo"),

  // Quantidade deve ser número inteiro e não negativo
  quantity: z
    .number()
    .int("Quantidade deve ser um número inteiro")
    .nonnegative("Quantidade não pode ser negativa"),
});

/**
 * Schema para ATUALIZAR produto
 * partial() transforma todos os campos em opcionais
 */
export const updateProductSchema = createProductSchema.partial();
