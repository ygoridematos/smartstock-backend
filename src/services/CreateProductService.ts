import { prisma } from "../database/prisma";

class CreateProductService {
  /**
   * Cria um produto no banco de dados.
   * Nota: A validação dos dados já foi feita no Controller.
   */
  async execute(name: string, quantity: number) {
    const product = await prisma.product.create({
      data: {
        name,
        quantity,
      },
    });

    return product;
  }
}

export default new CreateProductService();
