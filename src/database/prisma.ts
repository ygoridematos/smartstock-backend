import { PrismaClient } from "@prisma/client";

/**
 * Instância única do PrismaClient (Singleton).
 * Evita abrir múltiplas conexões desnecessárias com o banco durante o desenvolvimento (Hot Reload).
 */
export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["query", "error"] : ["error"],
});
