import swaggerJsdoc from "swagger-jsdoc";

// Configuração principal do Swagger
const options: swaggerJsdoc.Options = {
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

export const swaggerSpec = swaggerJsdoc(options);
