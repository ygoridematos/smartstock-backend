"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const CreateProductService_1 = __importDefault(require("../services/CreateProductService"));
const UpdateProductService_1 = __importDefault(require("../services/UpdateProductService"));
const DeleteProductService_1 = __importDefault(require("../services/DeleteProductService"));
const getProductByIdService_1 = __importDefault(require("../services/getProductByIdService"));
const listProductsService_1 = __importDefault(require("../services/listProductsService"));
const product_schema_1 = require("../validations/product.schema");
class ProductController {
    /**
     * 🟢 CRIAR PRODUTO
     * Validação acontece aqui no controller
     */
    async create(req, res) {
        try {
            // 🔎 Valida o corpo da requisição com Zod
            const validatedData = product_schema_1.createProductSchema.parse(req.body);
            // Chama o service passando dados já seguros
            const product = await CreateProductService_1.default.execute(validatedData.name, validatedData.quantity);
            return res.status(201).json({
                success: true,
                data: product,
            });
        }
        catch (error) {
            // Se for erro de validação do Zod
            if (error instanceof zod_1.ZodError) {
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
    async list(req, res) {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;
        const name = req.query.name ? String(req.query.name) : undefined;
        const result = await listProductsService_1.default.execute({ page, limit, name });
        return res.json({
            success: true,
            ...result,
        });
    }
    /**
     * 🔍 BUSCAR PRODUTO POR ID
     */
    async show(req, res) {
        const id = String(req.params.id);
        const product = await getProductByIdService_1.default.execute(id);
        return res.json({
            success: true,
            data: product,
        });
    }
    /**
     * ✏️ ATUALIZAR PRODUTO
     */
    async update(req, res) {
        try {
            const id = String(req.params.id);
            // Validação antes de atualizar
            const validatedData = product_schema_1.updateProductSchema.parse(req.body);
            const product = await UpdateProductService_1.default.execute(id, validatedData.name, validatedData.quantity);
            return res.json({
                success: true,
                data: product,
            });
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
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
    async delete(req, res) {
        const id = String(req.params.id);
        await DeleteProductService_1.default.execute(id);
        return res.status(204).send();
    }
}
exports.default = new ProductController();
