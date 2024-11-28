# Todo List

Uma aplicação web desenvolvida para gerenciar tarefas (**Todos**) e administrar usuários.

## **Descrição**

O sistema permite que usuários:
- Criem contas e façam login para acessar suas tarefas.
- Realizem operações de **CRUD** em suas tarefas.
- Administrem usuários (na tela de gestão administrativa).

O back-end utiliza **Node.js** e **MongoDB** para armazenar dados de forma segura e escalável, enquanto o front-end foi desenvolvido com **HTML**, **CSS** e **Bootstrap**, garantindo uma experiência responsiva.

---

## **Requisitos cumpridos**

### **1. Funcionalidades Exigidas**
- **Landing Page**: Implementada como a página inicial do sistema, explicando o tema do projeto.
- **Tela de Login**: Desenvolvida para autenticação dos usuários com JWT.
- **Tela de Cadastro de Usuário**: Permite o registro de novos usuários com validação de dados.
- **Tela de Gestão Administrativa**:
  - Apresenta uma lista de usuários.
  - Permite a exclusão e edição de nomes.
- **Tela de Gerenciamento de Tarefas**:
  - Exibe tarefas pessoais em formato de tabela.
  - Permite criar, editar, excluir, alternar status e limpar todas as tarefas.

### **2. Conexão entre Front-End e Back-End**
- O front-end utiliza **Axios** para realizar requisições à API RESTful.
- As rotas protegidas utilizam autenticação JWT para validar as operações.

### **3. Banco de Dados MongoDB**
- **MongoDB Atlas** é usado para hospedar o banco de dados, com acesso configurado via `mongoose`.
- Modelos de usuário e tarefa foram criados para garantir estrutura consistente:
  - **Usuário**: `name`, `email`, `password` (com hash).
  - **Tarefa**: `title`, `done`, `author`, `createdAt`.

### **4. Responsividade**
- Todas as páginas utilizam **Bootstrap**, garantindo uma interface adaptável a desktops, tablets e smartphones.

### **5. LGPD (Lei Geral de Proteção de Dados)**
- Senhas são armazenadas com hash usando **bcrypt**, garantindo a privacidade dos dados.
- Informações sensíveis, como senhas, não são retornadas em nenhuma resposta da API.

---

## **Rotas da API**

### **Rotas de Usuário**
| Método | Endpoint      | Descrição                                | Autenticação |
|--------|---------------|------------------------------------------|--------------|
| POST   | `/user/register` | Cadastra um novo usuário.                | Não          |
| POST   | `/user/login`    | Faz login e retorna um token JWT.        | Não          |
| GET    | `/user/list`     | Lista todos os usuários.                 | Sim          |
| PUT    | `/user/`         | Atualiza o nome do usuário autenticado.  | Sim          |
| DELETE | `/user/`         | Exclui o usuário autenticado e suas tarefas. | Sim       |

### **Rotas de Tarefa (To-Do)**
| Método | Endpoint         | Descrição                                     | Autenticação |
|--------|------------------|-----------------------------------------------|--------------|
| GET    | `/todo/list`       | Lista todas as tarefas do usuário autenticado. | Sim          |
| POST   | `/todo/`           | Cria uma nova tarefa.                         | Sim          |
| PUT    | `/todo/:todoId`        | Atualiza o título de uma tarefa.              | Sim          |
| PUT    | `/todo/:todoId/done`   | Alterna o status de conclusão de uma tarefa.  | Sim          |
| DELETE | `/todo/:todoId`        | Exclui uma tarefa específica.                 | Sim          |
| DELETE | `/todo/clear`      | Exclui todas as tarefas do usuário autenticado. | Sim          |

---

## **Configuração do Banco de Dados (MongoDB Atlas)**

1. **Criação do Cluster**:
   - Acesse [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) e crie um cluster gratuito.
2. **Configuração do Banco de Dados**:
   - Em **Database Access**, adicione um novo usuário com nome e senha.
   - Em **Network Access**, permita o acesso do IP `0.0.0.0/0`.
3. **String de Conexão**:
   - Em **Connect** > **Drivers** > **Node.js**, copie a string de conexão, algo como:
     ```
     mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority
     ```
4. **Configuração no Projeto**:
   - No diretório do backend, crie o arquivo `.env`:
     ```env
     DATABASE_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority
     SECRET=seu-segredo-jwt
     PORT=3000
     ```

---

## **Como Executar**

### **1. Backend**
1. Instale as dependências:
   ```bash
   cd backend
   npm install
   ```
2. Inicie o servidor:
   ```bash
   npm start
   ```

### **2. Frontend**
1. Navegue para o diretório do frontend:
   ```bash
   cd frontend
   ```
2. Abra os arquivos HTML no navegador ou use um servidor local como o **VS Code Live Server**.

---

## **Funcionalidades**

### **Usuário**
- **CRUD de Usuários**:
  - Cadastrar, logar, editar o nome e excluir conta.

### **Tarefas**
- **CRUD de Tarefas**:
  - Criar, listar, editar, excluir, alternar status e limpar todas as tarefas.

### **Administração**
- **Gestão de Usuários**:
  - Listar e excluir usuários no painel administrativo.
