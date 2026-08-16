import Project from "./scripts/classes/Project.js";
import { renderNav } from "./scripts/nav.js";
import "./styles.css";

console.log("Todo List App");

const projects = [new Project("Default", "The default project")];

const projectNav = document.querySelector("#project-nav");

function refreshNav() {
  projectNav.innerHTML = "";
  renderNav(projectNav, projects);
}

refreshNav();

const projectFormContainer = document.querySelector("#project-form-container");
const nameInput = document.querySelector("#project-input-name");
const addProjectBtn = document.querySelector("#add-project-btn");
addProjectBtn.addEventListener("click", () => {
  projectFormContainer.style.display = "flex";
  nameInput.focus();
});

const closeFormBtn = document.querySelector("#close-form-btn");
closeFormBtn.addEventListener("click", () => {
  projectFormContainer.style.display = "none";
});

const projectForm = document.querySelector("#project-form");
projectForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newProject = new Project(nameInput.value);
  projects.push(newProject);
  refreshNav();

  projectFormContainer.style.display = "none";
  projectForm.reset();
});
