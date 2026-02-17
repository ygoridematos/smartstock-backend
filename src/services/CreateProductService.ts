import { prisma } from "../database/prisma";

/**
 * SERVIÇO: Criação de Produto
 * RESPONSABILIDADE: Persistir um novo produto no banco de dados,
 * incluindo nome, preço e quantidade.
 */
class CreateProductService {
  /**
   * Executa a criação do produto.
   * @param name - Nome do produto
   * @param price - Preço do produto (número)
   * @param quantity - Quantidade em estoque
   * @returns O produto recém-criado
   */
  async execute(name: string, price: number, quantity: number) {
    const product = await prisma.product.create({
      data: {
        name,
        price, // Garantir que esta linha existe
        quantity,
      },
    });
    return product;
  }
}

export default new CreateProductService();
