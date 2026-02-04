import { Request, Response } from "express";
import { ZodError } from "zod";

import CreateProductService from "../services/CreateProductService";
import UpdateProductService from "../services/UpdateProductService";
import DeleteProductService from "../services/DeleteProductService";
import GetProductByIdService from "../services/getProductByIdService";
import ListProductsService from "../services/listProductsService";

import {
  createProductSchema,
  updateProductSchema,
} from "../validations/product.schema";

class ProductController {
  /**
   * 🟢 CRIAR PRODUTO
   * Validação acontece aqui no controller
   */
  async create(req: Request, res: Response) {
    try {
      // 🔎 Valida o corpo da requisição com Zod
      const validatedData = createProductSchema.parse(req.body);

      // Chama o service passando dados já seguros
      const product = await CreateProductService.execute(
        validatedData.name,
        validatedData.quantity,
      );

      return res.status(201).json({
        success: true,
        data: product,
      });
    } catch (error) {
      // Se for erro de validação do Zod
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          error: "Dados inválidos",
          details: error.issues, // Zod v4 usa "issues"
        });
      }

      throw error; // Outros erros vão para o middleware global
    }
  }

  /**
   * 📄 LISTAR PRODUTOS
   */
  async list(req: Request, res: Response) {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const name = req.query.name ? String(req.query.name) : undefined;

    const result = await ListProductsService.execute({ page, limit, name });

    return res.json({
      success: true,
      ...result,
    });
  }

  /**
   * 🔍 BUSCAR PRODUTO POR ID
   */
  async show(req: Request, res: Response) {
    const id = String(req.params.id);

    const product = await GetProductByIdService.execute(id);

    return res.json({
      success: true,
      data: product,
    });
  }

  /**
   * ✏️ ATUALIZAR PRODUTO
   */
  async update(req: Request, res: Response) {
    try {
      const id = String(req.params.id);

      // Validação antes de atualizar
      const validatedData = updateProductSchema.parse(req.body);

      const product = await UpdateProductService.execute(
        id,
        validatedData.name,
        validatedData.quantity,
      );

      return res.json({
        success: true,
        data: product,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          error: "Dados inválidos",
          details: error.issues,
        });
      }

      throw error;
    }
  }

  /**
   * ❌ DELETAR PRODUTO
   */
  async delete(req: Request, res: Response) {
    const id = String(req.params.id);

    await DeleteProductService.execute(id);

    return res.status(204).send();
  }
}

export default new ProductController();
