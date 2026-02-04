import { prisma } from "../database/prisma";
import AppError from "../errors/AppError";

class DeleteProductService {
  async execute(id: string) {
    // Verifica se o produto existe antes de deletar
    const productExists = await prisma.product.findUnique({
      where: { id },
    });

    if (!productExists) {
      throw new AppError("Produto não encontrado", 404);
    }

    // Deleta o produto do banco
    await prisma.product.delete({
      where: { id },
    });
  }
}

export default new DeleteProductService();
