import { prisma } from "../database/prisma";
import AppError from "../errors/AppError";

class UpdateProductService {
  async execute(id: string, name?: string, price?: number, quantity?: number) {
    const productExists = await prisma.product.findUnique({
      where: { id },
    });

    if (!productExists) {
      throw new AppError("Produto não encontrado", 404);
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(price !== undefined && { price }), // Adicionar esta linha
        ...(quantity !== undefined && { quantity }),
      },
    });

    return updatedProduct;
  }
}

export default new UpdateProductService();
