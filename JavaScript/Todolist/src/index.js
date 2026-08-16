import Project from "./scripts/classes/Project.js";
import { renderNav } from "./scripts/nav.js";
import "./styles.css";

console.log("Todo List App");

const projects = [new Project("Default", "The default project")];

const projectNav = document.querySelector("#project-nav");
renderNav(projectNav, projects);
