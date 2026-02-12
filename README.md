⚙️ SmartStock API - Gestão de Inventário Inteligente
Esta API RESTful é o motor central do sistema SmartStock. Construída com TypeScript e seguindo a rigorosa arquitetura MSC (Model-Service-Controller), ela garante que a lógica de negócio seja independente, escalável e extremamente segura para operações de estoque.

Shutterstock

🚀 Diferenciais Técnicos e Arquitetura
TypeScript: Tipagem estática para evitar erros comuns em tempo de desenvolvimento e execução.

Prisma ORM: Gestão profissional de banco de dados com sistema de migrations automáticas.

Zod Validation: Validação de schemas rigorosa para todas as entradas da API (Request Validation).

Swagger (OpenAPI): Documentação interativa completa disponível para desenvolvedores.

Global Error Handling: Tratamento centralizado de exceções através da classe customizada AppError.

CORS Configurado: Preparado para aceitar requisições do frontend hospedado na Vercel e localhost.

📊 Endpoints da API
A documentação interativa detalhada pode ser acessada em: https://smartstock-backend-kevj.onrender.com/docs

GET /products: Listagem paginada com filtros dinâmicos por nome.

POST /products: Cadastro validado de novos produtos no estoque.

PUT /products/:id: Atualização inteligente (parcial ou total) de dados do item.

DELETE /products/:id: Remoção segura de registros do banco.

🔧 Instalação e Configuração
Clone o repositório: git clone https://github.com/ygoridematos/smartstock-backend.git

Configuração de Variáveis (.env): Crie um arquivo .env e configure sua conexão com o banco: DATABASE_URL="file:./dev.db" PORT=3333

Inicialização do Ambiente: npm install npx prisma migrate dev npm run dev

Desenvolvido por Ygor I. de Matos.
