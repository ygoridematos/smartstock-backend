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

/**
 * CONTROLLER DE PRODUTOS
 * Responsável por receber as requisições HTTP, validar os dados de entrada
 * (via Zod) e chamar os services apropriados. Trata erros de validação
 * e repassa outros erros para o handler global.
 */
class ProductController {
  /**
   * [POST] Cria um novo produto
   * Flow: Validação Zod -> Service -> Resposta 201
   */
  async create(req: Request, res: Response) {
    try {
      console.log("📌 ProductController.create() foi chamado");
      console.log("Body recebido:", req.body);

      const validatedData = createProductSchema.parse(req.body);

      const product = await CreateProductService.execute(
        validatedData.name,
        validatedData.price,
        validatedData.quantity,
      );

      return res.status(201).json({
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
   * [GET] Listagem com Paginação e Filtros
   */
  async list(req: Request, res: Response) {
    console.log("📌 ProductController.list() foi chamado");
    console.log("Query params:", req.query);

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const name = req.query.name ? String(req.query.name) : undefined;

    console.log(
      `📌 Chamando ListProductsService com page=${page}, limit=${limit}, name=${name}`,
    );

    const result = await ListProductsService.execute({ page, limit, name });

    console.log(
      "📌 Resultado do ListProductsService:",
      JSON.stringify(result, null, 2),
    );

    return res.json({
      success: true,
      ...result,
    });
  }

  /**
   * [GET] Busca detalhada por ID
   */
  async show(req: Request, res: Response) {
    console.log("📌 ProductController.show() foi chamado, id:", req.params.id);

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
      console.log(
        "📌 ProductController.update() foi chamado, id:",
        req.params.id,
      );
      console.log("Body recebido:", req.body);

      const id = String(req.params.id);
      const validatedData = updateProductSchema.parse(req.body);

      const product = await UpdateProductService.execute(
        id,
        validatedData.name,
        validatedData.price,
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
    console.log(
      "📌 ProductController.delete() foi chamado, id:",
      req.params.id,
    );

    const id = String(req.params.id);
    await DeleteProductService.execute(id);

    return res.status(204).send();
  }
}

export default new ProductController();
