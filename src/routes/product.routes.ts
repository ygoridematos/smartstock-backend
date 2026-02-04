import { Router } from "express";
import ProductController from "../controllers/ProductController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Gerenciamento de produtos
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Products]
 */
router.post("/", ProductController.create);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Lista produtos com paginação e filtros
 *     tags: [Products]
 */
router.get("/", ProductController.list);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Busca um produto pelo ID
 *     tags: [Products]
 */
router.get("/:id", ProductController.show);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Atualiza um produto
 *     tags: [Products]
 */
router.put("/:id", ProductController.update);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Remove um produto
 *     tags: [Products]
 */
router.delete("/:id", ProductController.delete);

export default router;
