import { prisma } from "../database/prisma";
import AppError from "../errors/AppError";

/**
 * SERVIÇO: Deleção de Produto
 * RESPONSABILIDADE: Validar existência e remover o registro do banco.
 */
class DeleteProductService {
  /**
   * @param id Identificador único (UUID) do produto
   */
  async execute(id: string): Promise<void> {
    // 1. REGRA DE NEGÓCIO: Não podemos deletar algo que não existe.
    // Buscamos o produto no banco antes de tentar a remoção.
    const productExists = await prisma.product.findUnique({
      where: { id },
    });

    // 2. TRATAMENTO DE ERRO: Se não existir, lançamos um erro 404.
    // O errorHandler global capturará isso e enviará a resposta correta ao cliente.
    if (!productExists) {
      throw new AppError("Produto não encontrado", 404);
    }

    // 3. EXECUÇÃO: Remove o registro permanentemente.
    await prisma.product.delete({
      where: { id },
    });
  }
}

// Exportamos uma instância única (Singleton) para otimizar a memória.
export default new DeleteProductService();
