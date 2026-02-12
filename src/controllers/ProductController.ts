import { Request, Response } from "express";
import { ZodError } from "zod";

// Importação dos Services (Regra de Negócio)
import CreateProductService from "../services/CreateProductService";
import UpdateProductService from "../services/UpdateProductService";
import DeleteProductService from "../services/DeleteProductService";
import GetProductByIdService from "../services/getProductByIdService";
import ListProductsService from "../services/listProductsService";

// Schemas de Validação
import {
  createProductSchema,
  updateProductSchema,
} from "../validations/product.schema";

class ProductController {
  /**
   * [POST] Cria um novo produto
   * Flow: Validação Zod -> Service -> Resposta 201
   */
  async create(req: Request, res: Response) {
    try {
      // 1. Validação estrita dos dados de entrada
      const validatedData = createProductSchema.parse(req.body);

      // 2. Execução da regra de negócio
      const product = await CreateProductService.execute(
        validatedData.name,
        validatedData.quantity,
      );

      return res.status(201).json({
        success: true,
        data: product,
      });
    } catch (error) {
      // Tratamento específico para erros de validação
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          error: "Dados inválidos",
          details: error.issues,
        });
      }
      throw error; // Repassa para o errorHandler global
    }
  }

  /**
   * [GET] Listagem com Paginação e Filtros
   */
  async list(req: Request, res: Response) {
    // Extração e conversão de Query Params
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
   * [GET] Busca detalhada por ID
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
   * [PUT] Atualização de produto
   */
  async update(req: Request, res: Response) {
    try {
      const id = String(req.params.id);

      // Valida apenas os campos que foram enviados (Partial)
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
          error: "Dados de atualização inválidos",
          details: error.issues,
        });
      }
      throw error;
    }
  }

  /**
   * [DELETE] Remoção lógica ou física do produto
   */
  async delete(req: Request, res: Response) {
    const id = String(req.params.id);
    await DeleteProductService.execute(id);

    // 204 No Content é o padrão para deleção bem sucedida
    return res.status(204).send();
  }
}

export default new ProductController();
