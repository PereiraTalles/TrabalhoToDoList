const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const clearStorageBtn = document.querySelector("#clear-storage-btn")

let currentTodoId = null; // Armazena o ID da tarefa em edição

// Instância Axios com autenticação
const api = axios.create({
  baseURL: "http://localhost:3000/todo",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  },
});

// Carregar tarefas do backend
const loadTodos = async () => {
  try {
    const response = await api.get("/list");
    const todos = response.data;
    todoList.innerHTML = ""; // Limpa a lista antes de recarregar

    todos.forEach((todo) => {
      addTodoToDOM(todo); // Adiciona cada tarefa à interface
    });
  } catch (error) {
    console.error("Erro ao carregar as tarefas:", error.response?.data || error.message);
  }
};

// Adicionar uma tarefa ao DOM
const addTodoToDOM = (todo) => {
  const todoEl = document.createElement("div");
  todoEl.classList.add("todo");
  todoEl.dataset.id = todo._id; // Inclui o ID da tarefa no elemento

  if (todo.done) {
    todoEl.classList.add("done");
  }

  const todoTitle = document.createElement("h3");
  todoTitle.innerText = todo.title;
  todoEl.appendChild(todoTitle);

  const doneBtn = document.createElement("button");
  doneBtn.classList.add("finish-todo");
  doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
  todoEl.appendChild(doneBtn);

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-todo");
  editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
  todoEl.appendChild(editBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("remove-todo");
  deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  todoEl.appendChild(deleteBtn);

  todoList.appendChild(todoEl);
};

// Criar uma nova tarefa
const createTodo = async (title) => {
  try {
    const response = await api.post("/", { title });
    addTodoToDOM(response.data); // Adiciona a nova tarefa ao DOM
  } catch (error) {
    console.error("Erro ao criar a tarefa:", error.response?.data || error.message);
  }
};

// Alternar o status de conclusão de uma tarefa
const toggleTodoStatus = async (todoId, todoEl) => {
  try {
    await api.put(`/${todoId}/done`);
    todoEl.classList.toggle("done");
  } catch (error) {
    console.error("Erro ao alternar status da tarefa:", error.response?.data || error.message);
  }
};

// Deletar uma tarefa
const deleteTodo = async (todoId, todoEl) => {
  try {
    await api.delete(`/${todoId}`);
    todoEl.remove(); // Remove a tarefa do DOM
  } catch (error) {
    console.error("Erro ao deletar a tarefa:", error.response?.data || error.message);
  }
};

// Atualizar uma tarefa
const updateTodo = async (todoId, newTitle) => {
  try {
    const response = await api.put(`/${todoId}`, { title: newTitle });
    const todoEl = document.querySelector(`.todo[data-id="${todoId}"]`);
    todoEl.querySelector("h3").innerText = response.data.title;
  } catch (error) {
    console.error("Erro ao atualizar a tarefa:", error.response?.data || error.message);
  }
};

// Alternar formulários
const toggleForms = () => {
  editForm.classList.toggle("hide");
  todoForm.classList.toggle("hide");
  todoList.classList.toggle("hide");
};

// Eventos
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = todoInput.value.trim();

  if (title) {
    createTodo(title);
    todoInput.value = ""; // Limpa o campo de entrada
  }
});

document.addEventListener("click", (e) => {
  const targetEl = e.target;
  const parentEl = targetEl.closest(".todo");

  if (parentEl) {
    const todoId = parentEl.dataset.id;

    // Alternar status de conclusão
    if (targetEl.classList.contains("finish-todo")) {
      toggleTodoStatus(todoId, parentEl);
    }

    // Editar tarefa
    if (targetEl.classList.contains("edit-todo")) {
      currentTodoId = todoId; // Armazena o ID da tarefa sendo editada
      editInput.value = parentEl.querySelector("h3").innerText;
      toggleForms();
    }

    // Deletar tarefa
    if (targetEl.classList.contains("remove-todo")) {
      deleteTodo(todoId, parentEl);
    }
  }
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newTitle = editInput.value.trim();

  if (newTitle && currentTodoId) {
    updateTodo(currentTodoId, newTitle);
    toggleForms();
  }
});

cancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault();
  toggleForms();
});

clearStorageBtn.addEventListener("click", async () => {
  if (confirm("Tem certeza de que deseja apagar todas as tarefas?")) {
    try {
      await api.delete("/clear"); // Chama a rota da API para limpar todas as tarefas
    } catch (error) {
      console.error("Erro ao apagar todas as tarefas:", error.response?.data || error.message);
      alert("Erro ao tentar apagar as tarefas. Por favor, tente novamente.");
    }
  }
});

// Carregar tarefas ao iniciar
loadTodos();
