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

  const todoCheckboxEl = document.createElement("input");
  todoCheckboxEl.setAttribute("type", "checkbox");
  newTodoLiEl.appendChild(todoCheckboxEl);
  newTodoLiEl.setAttribute("data-done", false);

  const filterValue = getFilterValue();
  if (filterValue === "done") {
    newTodoLiEl.hidden = true;
  }

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

const todoListEl = document.querySelector("#todo-list");
todoListEl.addEventListener("change", toggleTodoState);

function toggleTodoState(event) {
  const checkbox = event.target;
  if (checkbox.checked === true) {
    checkbox.parentElement.classList.add("done");
    checkbox.parentElement.setAttribute("data-done", true);
  } else {
    checkbox.parentElement.classList.remove("done");
    checkbox.parentElement.setAttribute("data-done", false);
  }
}

const todoFilterEl = document.querySelector("#todo-filter");
todoFilterEl.addEventListener("change", filterTodos);
function filterTodos() {
  const filterValue = getFilterValue();

  const todoListEl = document.querySelector("#todo-list");
  for (let i = 0; i < todoListEl.children.length; i++) {
    const currentTodo = todoListEl.children[i];
    if (filterValue === "all") {
      currentTodo.hidden = false;
    } else if (filterValue === "open") {
      currentTodo.hidden = currentTodo.getAttribute("data-done") === "true";
    } else if (filterValue === "done") {
      currentTodo.hidden = currentTodo.getAttribute("data-done") === "false";
    }
  }
}

function getFilterValue() {
  return document.querySelector('#todo-filter input[type="radio"]:checked')
    .value;
}
