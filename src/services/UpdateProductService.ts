import { prisma } from "../database/prisma";
import AppError from "../errors/AppError";

class UpdateProductService {
  async execute(id: string, name?: string, quantity?: number) {
    // 1. Verifica existência
    const productExists = await prisma.product.findUnique({
      where: { id },
    });

    if (!productExists) {
      throw new AppError("Produto não encontrado", 404);
    }

    // 2. Atualiza
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
