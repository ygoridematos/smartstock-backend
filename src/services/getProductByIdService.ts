import { prisma } from "../database/prisma";
import AppError from "../errors/AppError";

class GetProductByIdService {
  async execute(id: string) {
    // Busca produto pelo ID
    const product = await prisma.product.findUnique({
      where: { id },
    });

    // Se não encontrar, lança erro 404
    if (!product) {
      throw new AppError("Produto não encontrado", 404);
    }

    return product;
  }
}

export default new GetProductByIdService();
