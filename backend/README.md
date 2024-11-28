# Todo List API

Uma API para gerenciar tarefas (**Todos**) com autenticação e autorização. A aplicação utiliza Node.js, Express, MongoDB, e JWT para implementar um sistema robusto que atende aos requisitos do projeto.

## **Funcionalidades**

- **Usuários**:
  - Cadastro e autenticação com validação de entradas.
  - Alteração de nome de usuário.
  - Exclusão de conta e todos os dados associados (todos).
- **Tarefas (Todos)**:
  - Listar tarefas do usuário autenticado.
  - Criar novas tarefas.
  - Editar tarefas existentes.
  - Alternar o status de "feito".
  - Excluir tarefas.
- **Segurança**:
  - Criptografia de senhas utilizando `bcrypt`.
  - Autenticação via JWT.
  - Conformidade com a LGPD ao omitir dados sensíveis nas respostas.

## **Rotas**

### **Usuário**
| Método | Rota           | Descrição                                      | Requer Autenticação |
|--------|----------------|------------------------------------------------|---------------------|
| POST   | `/user/register` | Cadastra um novo usuário.                      | Não                 |
| POST   | `/user/login`    | Faz login e retorna um token de autenticação.  | Não                 |
| GET    | `/user/list`     | Lista todos os usuários (dados limitados).     | Não                 |
| PUT    | `/user/`         | Edita o nome do usuário autenticado.           | Sim                 |
| DELETE | `/user/`         | Exclui o usuário autenticado e suas tarefas.   | Sim                 |

### **Todo**
| Método | Rota               | Descrição                                     | Requer Autenticação |
|--------|--------------------|-----------------------------------------------|---------------------|
| GET    | `/todo/list`        | Lista todas as tarefas do usuário autenticado.| Sim                 |
| POST   | `/todo/`            | Cria uma nova tarefa.                         | Sim                 |
| PUT    | `/todo/:todoId`     | Edita uma tarefa existente.                   | Sim                 |
| PUT    | `/todo/:todoId/done`| Alterna o status "feito" da tarefa.           | Sim                 |
| DELETE | `/todo/:todoId`     | Exclui uma tarefa específica.                 | Sim                 |

### **Autorização**
- Rotas protegidas utilizam o middleware `validateToken`, que exige um token JWT no cabeçalho `Authorization` com o formato:  
  ```
  Authorization: Bearer [TOKEN]
  ```

---

## **Variáveis de Ambiente**

A aplicação utiliza variáveis de ambiente configuradas no arquivo `.env`. Aqui estão as variáveis esperadas:

- `DATABASE_URL`: URL de conexão com o MongoDB (ex.: `mongodb+srv://<user>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority`).
- `SECRET`: Chave secreta usada para assinar tokens JWT.
- `PORT` (opcional): Porta em que o servidor será iniciado (padrão: 3000).

---

## **Como Configurar**

1. **Clone o repositório:**
   ```bash
   git clone [URL_DO_REPOSITORIO]
   cd [NOME_DO_REPOSITORIO]
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure o arquivo `.env`:**
   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
   ```env
   DATABASE_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority
   SECRET=sua_chave_secreta
   PORT=3000
   ```

4. **Conecte ao MongoDB:**
   - Crie um banco de dados no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).
   - Use o Compass ou MongoDB Shell para administrar os dados.

5. **Inicie o servidor:**
   ```bash
   npm start
   ```
   O servidor será iniciado em `http://localhost:3000`.

---

## **Requisitos Atendidos**

### **Requisitos do Projeto**
1. **Landing Page, Login, Cadastro, Gestão Administrativa**:
   - As páginas podem ser desenvolvidas utilizando frameworks como Bootstrap.
   - O backend fornece endpoints que permitem integração com o front-end.
2. **CRUD de Usuários e Todos**:
   - Implementado com os métodos HTTP adequados (`GET`, `POST`, `PUT`, `DELETE`).
3. **Banco de Dados MongoDB**:
   - Banco hospedado no MongoDB Atlas, acessado com Mongoose.
4. **Responsividade e Bootstrap**:
   - A aplicação pode ser integrada com um front-end responsivo.
5. **LGPD**:
   - Senhas são armazenadas com hash.
   - Dados sensíveis não são retornados (ex.: senha omitida nas listagens).
6. **GitHub**:
   - O código deve ser hospedado em um repositório público e configurado conforme as instruções do projeto.

---

## **Como Contribuir**

1. Faça um fork do repositório.
2. Crie um branch para sua feature: `git checkout -b minha-feature`.
3. Faça commit das suas alterações: `git commit -m 'Minha nova feature'`.
4. Envie suas alterações: `git push origin minha-feature`.
5. Abra um Pull Request no repositório principal.