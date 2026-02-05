"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
// Configuração principal do Swagger
const options = {
    definition: {
        openapi: "3.0.0", // Versão do padrão OpenAPI
        info: {
            title: "API de Controle de Estoque", // Nome da sua API
            version: "1.0.0",
            description: "API para gerenciamento de produtos em estoque",
        },
        servers: [
            {
                url: "http://localhost:3333", // URL base da API
            },
        ],
    },
    // Arquivos onde o Swagger vai procurar comentários das rotas
    apis: ["./src/routes/*.ts"],
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);
