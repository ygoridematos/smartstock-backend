import { prisma } from "../database/prisma";
import { Prisma } from "@prisma/client";

interface IRequest {
  page?: number;
  limit?: number;
  name?: string;
}

class ListProductsService {
  async execute({ page = 1, limit = 20, name }: IRequest) {
    const skip = (page - 1) * limit;

    const where: Prisma.ProductWhereInput = name
      ? {
          name: {
            contains: name,
            mode: "insensitive",
          },
        }
      : {};

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.product.count({ where }),
    ]);

    // LOG CRUCIAL: veja se o campo price aparece aqui
    console.log(
      "🔍 Produtos retornados pelo Prisma (RAW):",
      JSON.stringify(products, null, 2),
    );

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
