console.log("Hello Todo App!");

function addNewTodo() {
  const newTodoEl = document.querySelector("#new-todo");
  const newTodo = newTodoEl.value;
  console.log("Your new todo: " + newTodo);
}

const addTodoBtn = document.querySelector("#add-todo");
addTodoBtn.addEventListener("click", addNewTodo);
