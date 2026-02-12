import { Router } from "express";
import ProductController from "../controllers/ProductController";

const router = Router();

/**
 * @swagger
 * tags:
 * name: Products
 * description: Endpoints para gerenciamento de inventário
 */

/**
 * @swagger
 * /products:
 * post:
 * summary: Cria um novo produto
 * tags: [Products]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required: [name, quantity]
 * properties:
 * name: { type: string, example: "Monitor 24pol" }
 * quantity: { type: integer, example: 15 }
 * responses:
 * 201: { description: "Criado com sucesso" }
 * 400: { description: "Erro de validação" }
 */
router.post("/", ProductController.create);

/**
 * @swagger
 * /products:
 * get:
 * summary: Lista todos os produtos (Paginado)
 * tags: [Products]
 * parameters:
 * - in: query
 * name: page
 * schema: { type: integer }
 * - in: query
 * name: name
 * description: Filtro por nome do produto
 * schema: { type: string }
 * responses:
 * 200: { description: "Lista retornada com sucesso" }
 */
router.get("/", ProductController.list);

// Rotas que exigem ID
router.get("/:id", ProductController.show);
router.put("/:id", ProductController.update);
router.delete("/:id", ProductController.delete);

export default router;
