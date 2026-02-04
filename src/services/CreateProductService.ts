import { prisma } from "../database/prisma";

/**
 * Service cuida apenas da regra de negócio e banco
 * NÃO faz validação de formato — isso é papel do controller
 */
class CreateProductService {
  async execute(name: string, quantity: number) {
    const product = await prisma.product.create({
      data: { name, quantity },
    });

    return product;
  }
}

export default new CreateProductService();
