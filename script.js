console.log("Hello Todo App!");

function addNewTodo() {
  const newTodoEl = document.querySelector("#new-todo");
  const newTodo = newTodoEl.value.trim();

  // length check
  if (newTodo.length === 0) {
    return;
  }

  // duplicate check
  if (isDuplicate(newTodo)) {
    alert("This todo is already in the list");
    return;
  }

  const newTodoLiEl = document.createElement("li");
  newTodoLiEl.innerText = newTodo;

  newTodoLiEl.setAttribute("data-todo", newTodo.toLowerCase());

  const todoListEl = document.querySelector("#todo-list");
  todoListEl.appendChild(newTodoLiEl);

  newTodoEl.value = "";
}

const addTodoBtn = document.querySelector("#add-todo");
addTodoBtn.addEventListener("click", addNewTodo);

function isDuplicate(todo) {
  todo = todo.toLowerCase();
  const todoListEl = document.querySelector("#todo-list");

  for (let i = 0; i < todoListEl.children.length; i++) {
    const currentLiEl = todoListEl.children[i];
    const currentTodo = currentLiEl.getAttribute("data-todo");
    if (currentTodo === todo) {
      return true;
    }
  }

  return false;
}
