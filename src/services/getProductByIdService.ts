import { prisma } from "../database/prisma";
import AppError from "../errors/AppError";

/**
 * SERVIÇO: Busca Detalhada
 * RESPONSABILIDADE: Localizar um único produto e garantir que ele seja retornado.
 */
class GetProductByIdService {
  /**
   * @param id Identificador único do produto
   */
  async execute(id: string) {
    // 1. BUSCA: Utilizamos o findUnique do Prisma por ser mais performático para chaves primárias.
    const product = await prisma.product.findUnique({
      where: { id },
    });

    // 2. VALIDAÇÃO: Se o retorno for nulo (null), o ID é inválido ou não existe no banco.
    if (!product) {
      throw new AppError("Produto não encontrado", 404);
    }

    // 3. RETORNO: Entrega os dados para o Controller.
    return product;
  }
}

export default new GetProductByIdService();
