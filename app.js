//SELECTORS
const get = (e) => document.querySelector(e);
const getAll = (e) => document.querySelectorAll(e);

const todoInput = get(".todo-input");
const todoButton = get(".todo-button");
const todoList = get(".todo-list");
const filterOption = get(".filter-todo");

//EVENT LISTENERS

todoButton.addEventListener("click", addToDo);
todoList.addEventListener("click", removeToDo);
filterOption.addEventListener("change", filterToDo);
document.addEventListener("DOMContentLoaded", getToDos);

//FUNCTIONS

function addToDo(event) {
  if (todoInput.value === "") {
    alert("please enter an item.");
  } else {
    // prevent page refresh
    event.preventDefault();
    //create todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // create new todo + append
    const newToDo = document.createElement("li");
    newToDo.innerText = todoInput.value;

    newToDo.classList.add("todo-item");
    todoDiv.appendChild(newToDo);
    // add toDo to local storage
    saveLocalToDos(todoInput.value);
    // create new check mark
    const completeButton = document.createElement("button");
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);
    // create delete check mark
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);
    // append all elements to div
    todoList.appendChild(todoDiv);
    todoInput.value = "";
  }
}

function removeToDo(e) {
  const item = e.target;
  const todo = item.parentElement;
  // remove todo;
  removeLocalToDos(todo);
  if (item.classList[0] === "delete-btn") {
    //animate remove function
    todo.classList.add("fall");
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  //mark as completed
  if (item.classList[0] === "complete-btn") {
    todo.classList.toggle("completed");
  }
}

function filterToDo(e) {
  const todos = todoList.childNodes;
  console.log(todos);
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalToDos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getToDos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // create new todo + append
    const newToDo = document.createElement("li");
    newToDo.innerText = todo;

    newToDo.classList.add("todo-item");
    todoDiv.appendChild(newToDo);

    // create new check mark
    const completeButton = document.createElement("button");
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);
    // create delete check mark
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);
    // append all elements to div
    todoList.appendChild(todoDiv);
  });
}

function removeLocalToDos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// localStorage.clear();
