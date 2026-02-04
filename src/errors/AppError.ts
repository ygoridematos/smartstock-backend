// Criamos uma classe para representar erros "esperados" da aplicação
// Ex: validação, regra de negócio, dados inválidos

export class AppError {
  // Mensagem que será enviada ao cliente
  public readonly message: string;

  // Status HTTP que o erro representa (400, 404, etc)
  public readonly statusCode: number;

  // Constructor é chamado quando usamos: new AppError(...)
  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default AppError;
