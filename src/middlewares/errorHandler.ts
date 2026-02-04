import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

/**
 * Middleware global de tratamento de erros
 * Ele SEMPRE precisa ter 4 parâmetros para o Express reconhecer como middleware de erro
 */
export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  _: NextFunction,
) {
  /**
   * Se for um erro que NÓS criamos (erro esperado da regra de negócio)
   * Ex: produto não encontrado, estoque negativo, etc
   */
  if (error instanceof AppError) {
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
