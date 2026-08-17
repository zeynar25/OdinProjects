import Project from "./scripts/classes/Project.js";
import { renderNav } from "./scripts/nav.js";
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
const nameInput = document.querySelector("#project-input-name");
const addProjectBtn = document.querySelector("#add-project-btn");
addProjectBtn.addEventListener("click", () => {
  projectFormContainer.style.display = "flex";
  nameInput.focus();
});

const closeProjectFormBtn = document.querySelector("#close-project-form-btn");
closeProjectFormBtn.addEventListener("click", () => {
  projectFormContainer.style.display = "none";
});

const projectForm = document.querySelector("#project-form");
projectForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newProject = new Project(nameInput.value);
  projects.push(newProject);
  refreshProjectNav();

  projectFormContainer.style.display = "none";
  projectForm.reset();
});

const todoFormContainer = document.querySelector("#todo-form-container");
const addTodoBtn = document.querySelector("#add-todo-btn");
addTodoBtn.addEventListener("click", () => {
  addTodoBtn.style.display = "none";
  todoFormContainer.style.display = "flex";
});

const closeTodoFormBtn = document.querySelector("#close-todo-form-btn");
closeTodoFormBtn.addEventListener("click", () => {
  addTodoBtn.style.display = "block";
  todoFormContainer.style.display = "none";
});

refreshProjectNav();
