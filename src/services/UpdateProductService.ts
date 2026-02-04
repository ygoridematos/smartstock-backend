import { prisma } from "../database/prisma";
import AppError from "../errors/AppError";

/**
 * Atualiza produto existente
 * Aqui ficam regras de negócio, não validação de tipos
 */
class UpdateProductService {
  async execute(id: string, name?: string, quantity?: number) {
    // Verifica se produto existe
    const productExists = await prisma.product.findUnique({
      where: { id },
    });

    if (!productExists) {
      throw new AppError("Produto não encontrado", 404);
    }

    // Atualiza apenas os campos enviados
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        quantity,
      },
    });

    return updatedProduct;
  }
}

export default new UpdateProductService();
