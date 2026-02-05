"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductController_1 = __importDefault(require("../controllers/ProductController"));
// Criamos uma instância do Router do Express
// Ele é responsável por agrupar todas as rotas relacionadas a produtos
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Gerenciamento de produtos
 *
 * Essa tag organiza as rotas no Swagger UI dentro do grupo "Products"
 */
/**
 * @swagger
 * /products:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Products]
 *     description: Rota responsável por cadastrar um novo produto no sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - quantity
 *             properties:
 *               name:
 *                 type: string
 *                 example: Teclado Mecânico
 *               price:
 *                 type: number
 *                 example: 199.90
 *               quantity:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *       400:
 *         description: Erro de validação dos dados enviados
 */
router.post("/", ProductController_1.default.create);
// POST /products → chama o controller para criar um produto
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Lista produtos com paginação e filtros
 *     tags: [Products]
 *     description: Retorna uma lista paginada de produtos cadastrados
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Número da página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Quantidade de itens por página
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
 */
router.get("/", ProductController_1.default.list);
// GET /products → lista produtos com paginação
/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Busca um produto pelo ID
 *     tags: [Products]
 *     description: Retorna os dados de um único produto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto encontrado
 *       404:
 *         description: Produto não encontrado
 */
router.get("/:id", ProductController_1.default.show);
// GET /products/:id → busca um produto específico
/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Atualiza um produto
 *     tags: [Products]
 *     description: Atualiza os dados de um produto existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Mouse Gamer
 *               price:
 *                 type: number
 *                 example: 150.50
 *               quantity:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *       404:
 *         description: Produto não encontrado
 */
router.put("/:id", ProductController_1.default.update);
// PUT /products/:id → atualiza produto
/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Remove um produto
 *     tags: [Products]
 *     description: Exclui um produto do sistema
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto removido com sucesso
 *       404:
 *         description: Produto não encontrado
 */
router.delete("/:id", ProductController_1.default.delete);
// DELETE /products/:id → remove produto
// ⚠️ ESSA LINHA É FUNDAMENTAL
// Exportamos o router como DEFAULT para que o server.ts consiga importar corretamente
exports.default = router;
