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

  refreshTodoList();
});

refreshProjectNav();
