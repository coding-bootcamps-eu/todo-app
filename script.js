console.log("Hello Todo App!");

function addNewTodo() {
  const newTodoEl = document.querySelector("#new-todo");
  const newTodo = newTodoEl.value;

  const newTodoLiEl = document.createElement("li");
  newTodoLiEl.innerText = newTodo;

  const todoListEl = document.querySelector("#todo-list");
  todoListEl.appendChild(newTodoLiEl);
}

const addTodoBtn = document.querySelector("#add-todo");
addTodoBtn.addEventListener("click", addNewTodo);
