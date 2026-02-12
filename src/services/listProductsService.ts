import { prisma } from "../database/prisma";
import { Prisma } from "@prisma/client";

interface IRequest {
  page?: number;
  limit?: number;
  name?: string;
}

class ListProductsService {
  /**
   * Retorna lista paginada e filtrada de produtos.
   * Otimizado para performance usando Promise.all (busca dados e contagem simultaneamente).
   */
  async execute({ page = 1, limit = 20, name }: IRequest) {
    const skip = (page - 1) * limit;

    // Construção dinâmica do filtro (WHERE)
    const where: Prisma.ProductWhereInput = name
      ? {
          name: {
            contains: name,
            mode: "insensitive", // Ignora maiúsculas/minúsculas
          },
        }
      : {};

    // Executa query de busca e count em paralelo
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" }, // Mais recentes primeiro
      }),
      prisma.product.count({ where }),
    ]);

    return {
      data: products,
      metadata: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}

export default new ListProductsService();
