import { prisma } from "../database/prisma";
import AppError from "../errors/AppError";

/**
 * SERVIÇO: Deleção de Produto
 * RESPONSABILIDADE: Validar existência e remover o registro do banco.
 */
class DeleteProductService {
  /**
   * @param id Identificador único (UUID) do produto
   * @throws AppError se o produto não existir.
   */
  async execute(id: string): Promise<void> {
    // 1. REGRA DE NEGÓCIO: Não podemos deletar algo que não existe.
    const productExists = await prisma.product.findUnique({
      where: { id },
    });

    if (!productExists) {
      throw new AppError("Produto não encontrado", 404);
    }

    // 2. EXECUÇÃO: Remove o registro permanentemente.
    await prisma.product.delete({
      where: { id },
    });
  }
}

export default new DeleteProductService();
