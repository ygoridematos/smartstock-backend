"use strict";
// Criamos uma classe para representar erros "esperados" da aplicação
// Ex: validação, regra de negócio, dados inválidos
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError {
    // Constructor é chamado quando usamos: new AppError(...)
    constructor(message, statusCode = 400) {
        this.message = message;
        this.statusCode = statusCode;
    }
}
exports.AppError = AppError;
exports.default = AppError;
