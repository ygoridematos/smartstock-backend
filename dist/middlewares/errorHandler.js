"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const AppError_1 = require("../errors/AppError");
/**
 * Middleware global de tratamento de erros
 * Ele SEMPRE precisa ter 4 parâmetros para o Express reconhecer como middleware de erro
 */
function errorHandler(error, req, res, _) {
    /**
     * Se for um erro que NÓS criamos (erro esperado da regra de negócio)
     * Ex: produto não encontrado, estoque negativo, etc
     */
    if (error instanceof AppError_1.AppError) {
        return res.status(error.statusCode).json({
            success: false, // padrão profissional
            error: error.message, // mensagem clara do erro
        });
    }
    /**
     * Se cair aqui, é um erro inesperado (bug no sistema)
     * Nunca mostramos detalhes internos para o usuário
     */
    console.error(error); // Mostra o erro completo no terminal (IMPORTANTE para debug)
    return res.status(500).json({
        success: false,
        error: "Erro interno do servidor",
    });
}
