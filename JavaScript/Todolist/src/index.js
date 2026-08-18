import Project from "./scripts/classes/Project.js";
import TodoItem from "./scripts/classes/TodoItem.js";
import { renderNav } from "./scripts/nav.js";
import { renderTodoList } from "./scripts/todolist.js";
import "./styles.css";

console.log("Todo List App");

const projects = [new Project("Default", "The default project")];
let activeProjectId = projects[0].id;

const projectNav = document.querySelector("#project-nav");

function refreshProjectNav() {
  projectNav.innerHTML = "";
  renderNav(projectNav, projects, activeProjectId);
}

// monitors the click event on the project nav
// updates the active project id when a button is clicked
projectNav.addEventListener("click", (event) => {
  const button = event.target.closest(".nav-button");
  if (!button) return;

  activeProjectId = button.value;
  refreshProjectNav();
});

const projectFormContainer = document.querySelector("#project-form-container");
const projectNameInput = document.querySelector("#project-input-name");
const addProjectBtn = document.querySelector("#add-project-btn");
addProjectBtn.addEventListener("click", () => {
  projectFormContainer.style.display = "flex";
  projectNameInput.focus();
});

const closeProjectFormBtn = document.querySelector("#close-project-form-btn");
closeProjectFormBtn.addEventListener("click", () => {
  projectFormContainer.style.display = "none";
});

const projectForm = document.querySelector("#project-form");
projectForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newProject = new Project(projectNameInput.value);
  projects.push(newProject);
  refreshProjectNav();

  projectFormContainer.style.display = "none";
  projectForm.reset();
});

const todoInputName = document.querySelector("#todo-input-name");
const todoFormContainer = document.querySelector("#todo-form-container");
const addTodoBtn = document.querySelector("#add-todo-btn");
addTodoBtn.addEventListener("click", () => {
  addTodoBtn.style.display = "none";
  todoFormContainer.style.display = "flex";
  todoInputName.focus();
});

const closeTodoFormBtn = document.querySelector("#close-todo-form-btn");
closeTodoFormBtn.addEventListener("click", () => {
  addTodoBtn.style.display = "block";
  todoFormContainer.style.display = "none";
});

const todoList = [];

const todoListContainer = document.querySelector("#todo-list");
function refreshTodoList() {
  todoListContainer.innerHTML = "";
  renderTodoList(todoListContainer, todoList);
}

const todoInputDueDate = document.querySelector("#todo-input-due-date");
todoInputDueDate.value = new Date().toISOString().split("T")[0];

const todoForm = document.querySelector("#todo-form");
todoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const todoInputDescription = document.querySelector(
    "#todo-input-description",
  );

  const todoInputPriority = document.querySelector("#todo-input-priority");

  const newTodo = new TodoItem(
    todoInputName.value,
    todoInputDescription.value,
    todoInputDueDate.value,
    parseInt(todoInputPriority.value, 10),
  );

  todoList.push(newTodo);

  console.log(`adding ${newTodo.title} item`);
  console.log(todoList);

  todoFormContainer.style.display = "none";
  todoForm.reset();
  todoInputDueDate.value = new Date().toISOString().split("T")[0];

  addTodoBtn.style.display = "block";

  refreshTodoList();
});

const todoEditFormContainer = document.querySelector(
  "#todo-edit-form-container",
);

const closeTodoEditFormBtn = document.querySelector(
  "#close-todo-edit-form-btn",
);
closeTodoEditFormBtn.addEventListener("click", () => {
  todoEditFormContainer.style.display = "none";
});

const todoEditForm = document.querySelector("#todo-edit-form");
todoEditForm.addEventListener("submit", (event) => {
  event.preventDefault();

  todoEditFormContainer.style.display = "none";

  const index = todoEditFormContainer.dataset.index;
  if (todoList[index] === undefined) {
    console.error("Item not found in todoList");
    return;
  }

  if (todoList[index].title !== todoEditInputName.value) {
    todoList[index].title = todoEditInputName.value;
  }

  if (todoList[index].description !== todoEditInputDescription.value) {
    todoList[index].description = todoEditInputDescription.value;
  }
  if (todoList[index].dueDate !== todoEditInputDueDate.value) {
    todoList[index].dueDate = todoEditInputDueDate.value;
  }
  if (todoList[index].priority !== parseInt(todoEditInputPriority.value, 10)) {
    todoList[index].priority = parseInt(todoEditInputPriority.value, 10);
  }
  refreshTodoList();
});

const todoEditInputName = document.querySelector("#todo-edit-input-name");
const todoEditInputDescription = document.querySelector(
  "#todo-edit-input-description",
);
const todoEditInputDueDate = document.querySelector(
  "#todo-edit-input-due-date",
);
const todoEditInputPriority = document.querySelector(
  "#todo-edit-input-priority",
);

const editFields = [
  todoEditInputName,
  todoEditInputDescription,
  todoEditInputDueDate,
  todoEditInputPriority,
];

const submitEditFormButton = todoEditForm.querySelector(
  "#submit-edit-form-btn",
);

// check if the value of the input has changed from the previous value
editFields.forEach((field) => {
  field.addEventListener("input", (event) => {
    if (field.value !== field.dataset.previousValue) {
      submitEditFormButton.disabled = false;
    } else {
      submitEditFormButton.disabled = true;
    }
  });
});

todoListContainer.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const todoItem = event.target.closest(".todo-item");
  if (!todoItem) return;

  const action = button.dataset.action;
  const id = todoItem.dataset.id;
  const index = todoList.findIndex((item) => item.id === id);

  if (index === -1) {
    console.log(`Item with id ${id} not found in todoList`);
  }

  if (action === "edit") {
    console.log(`editing ${id} item`);
    todoEditFormContainer.dataset.index = index;
    todoEditFormContainer.style.display = "flex";

    todoEditInputName.value = todoList[index].title;
    todoEditInputName.dataset.previousValue = todoList[index].title;

    todoEditInputDescription.value = todoList[index].description;
    todoEditInputDescription.dataset.previousValue =
      todoList[index].description;

    todoEditInputDueDate.value = todoList[index].dueDate;
    todoEditInputDueDate.dataset.previousValue = todoList[index].dueDate;

    todoEditInputPriority.value = todoList[index].priority;
    todoEditInputPriority.dataset.previousValue = todoList[index].priority;
  } else if (action === "done") {
    console.log(`marking ${id} item as done`);
    todoList[index].isDone = !todoList[index].isDone;
    refreshTodoList();
  } else if (action === "delete") {
    console.log(`deleting ${id} item`);
    todoList.splice(index, 1);
    refreshTodoList();
  } else {
    console.log(`clicked on ${todoItem.dataset.id} item`);
  }
});

refreshProjectNav();
