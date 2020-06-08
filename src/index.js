// Variables
const container = document.querySelector(".container");
const todoAddBtn = document.querySelector(".todo-button");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoAddBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", removeCheck);

// Functions
function addTodo(event) {
  // Prevent from action
  event.preventDefault();

  // Create HTML elements
  // Create DIV
  const todoDiv = document.createElement("div");
  todoDiv.setAttribute("class", "todo");

  // Create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.setAttribute("class", "todo-item");

  // ADD TODO TO LOCALSTORAGE
  saveLocalTodos(todoInput.value);

  //Check BUTTON
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.setAttribute("class", "complete-btn");

  //Trash BUTTON
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.setAttribute("class", "trash-btn");

  //Append todoDiv(DIV) to todoList(UL), then all other created element into (todoDIV)
  todoList.appendChild(todoDiv);
  todoDiv.appendChild(newTodo);
  todoDiv.appendChild(completedButton);
  todoDiv.appendChild(trashButton);

  // Clear input
  todoInput.value = "";
}

function removeCheck(e) {
  const targetItem = e.target;

  // Remove todo
  if (targetItem.classList[0] === "trash-btn") {
    const todo = targetItem.parentElement;

    // Remove animation
    todo.classList.add("fall");

    // Remove from local storage
    removeLocalTodos(todo);

    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //Check
  if (targetItem.classList[0] === "complete-btn") {
    const todo = targetItem.parentElement;
    todo.classList.toggle("completed");
  }
}

function saveLocalTodos(todo) {
  // Check if theres something in the storage if no create an epmty array
  // otherwise get the JSON data back into JS then push into todo array.

  // Empty variable made into an empty list or passed data from local storage
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Runs after DOMContentLoaded
function getTodos() {
  // Check again
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  // Write them out again for each
  todos.forEach(function (todo) {
    // Create HTML elements
    // Create DIV
    const todoDiv = document.createElement("div");
    todoDiv.setAttribute("class", "todo");

    // Create LI
    const newTodo = document.createElement("li");
    // Change inputTodo to todo (variable with data from local storage)
    newTodo.innerText = todo;
    newTodo.setAttribute("class", "todo-item");

    // ADD TODO TO LOCALSTORAGE
    //saveLocalTodos(inputText.value);

    //Check BUTTON
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.setAttribute("class", "complete-btn");

    //Trash BUTTON
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.setAttribute("class", "trash-btn");

    //Append todoDiv(DIV) to todoList(UL), then all other created element into (todoDIV)
    todoList.appendChild(todoDiv);
    todoDiv.appendChild(newTodo);
    todoDiv.appendChild(completedButton);
    todoDiv.appendChild(trashButton);
  });
}

function removeLocalTodos(todo) {
  // Empty variable made into an empty list or passed data from local storage
  let todos;
  //Check
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  // Get the index of array el.
  const todoIndex = todo.children[0].innerText;
  console.log(todo.children[0]);
  // Splice method to remove specific element from array by index, 1 element
  todos.splice(todos.indexOf(todoIndex), 1);
  // Update array
  localStorage.setItem("todos", JSON.stringify(todos));
}
