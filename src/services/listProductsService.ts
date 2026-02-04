import { prisma } from "../database/prisma";
import { Prisma } from "@prisma/client"; // 👈 IMPORTANTE

interface IRequest {
  page?: number;
  limit?: number;
  name?: string;
}

class ListProductsService {
  async execute({ page = 1, limit = 20, name }: IRequest) {
    const skip = (page - 1) * limit;

    // 👇 Tipamos explicitamente como o Prisma espera
    const where: Prisma.ProductWhereInput = name
      ? {
          name: {
            contains: name,
            mode: "insensitive", // agora TS entende o tipo correto
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

    return {
      data: products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}

export default new ListProductsService();
