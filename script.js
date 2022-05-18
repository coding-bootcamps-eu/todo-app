console.log("Hello Todo App!");

let todos = [];
const deleteTodosButton = document.querySelector("#delete-todos");
const addTodoBtn = document.querySelector("#add-todo");
const todoListEl = document.querySelector("#todo-list");

function readTodosFromLocalStorage() {
  const todosFromStorage = localStorage.getItem("todos");
  if (todosFromStorage !== null) {
    todos = JSON.parse(todosFromStorage);
  }
}

function saveTodosToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addNewTodo() {
  const newTodoEl = document.querySelector("#new-todo");
  const newTodoText = newTodoEl.value.trim();

  // length check
  if (newTodoText.length === 0) {
    return;
  }

  // duplicate check
  if (isDuplicate(newTodoText)) {
    return;
  }

  const newTodo = {
    todo: newTodoText,
    done: false,
  };
  todos.push(newTodo);

  renderTodos();
  saveTodosToLocalStorage();

  newTodoEl.value = "";
}
addTodoBtn.addEventListener("click", addNewTodo);

function renderTodos() {
  const todoListEl = document.querySelector("#todo-list");
  todoListEl.innerHTML = "";

  todos.forEach(function (currentTodo) {
    const newTodoLiEl = document.createElement("li");

    const todoCheckboxEl = document.createElement("input");
    todoCheckboxEl.setAttribute("type", "checkbox");
    todoCheckboxEl.checked = currentTodo.done;
    newTodoLiEl.appendChild(todoCheckboxEl);

    const textNode = document.createTextNode(currentTodo.todo);
    newTodoLiEl.append(textNode);

    if (currentTodo.done === true) {
      newTodoLiEl.classList.add("done");
    }

    newTodoLiEl.todo = currentTodo;

    const filterValue = getFilterValue();
    if (filterValue === "done") {
      newTodoLiEl.hidden = true;
    }

    todoListEl.appendChild(newTodoLiEl);
  });

  filterTodos();
}

function isDuplicate(todo) {
  todo = todo.toLowerCase();

  for (let i = 0; i < todos.length; i++) {
    const currentTodo = todos[i];
    if (currentTodo.todo.toLowerCase() === todo) {
      return true;
    }
  }
  return false;
}

todoListEl.addEventListener("change", toggleTodoState);
function toggleTodoState(event) {
  const checkbox = event.target;
  if (checkbox.checked === true) {
    checkbox.parentElement.classList.add("done");
    checkbox.parentElement.todo.done = true;
  } else {
    checkbox.parentElement.classList.remove("done");
    checkbox.parentElement.todo.done = false;
  }

  saveTodosToLocalStorage();
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
      currentTodo.hidden = currentTodo.todo.done;
    } else if (filterValue === "done") {
      currentTodo.hidden = !currentTodo.todo.done;
    }
  }
}

function getFilterValue() {
  return document.querySelector('#todo-filter input[type="radio"]:checked')
    .value;
}

function deleteDoneTodos() {
  todos = todos.filter((todo) => todo.done === false);
  saveTodosToLocalStorage();
  renderTodos();
}
deleteTodosButton.addEventListener("click", deleteDoneTodos);

function initTodoApp() {
  readTodosFromLocalStorage();
  renderTodos();
}
initTodoApp();
