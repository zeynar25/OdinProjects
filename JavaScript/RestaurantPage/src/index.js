import "./styles.css";
import { body } from "./scripts/bg.js";
import { header } from "./scripts/header.js";

import { renderHome } from "./scripts/pages/home.js";
import { renderMenu } from "./scripts/pages/menu.js";
import { renderAbout } from "./scripts/pages/about.js";

const content = document.getElementById("content");

const navButtons = document.querySelectorAll(".nav-button");

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    navButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const page = button.value;
    console.log(`Navigating to ${page} page...`);

    displayPage(page);
  });
});

function displayPage(page) {
  content.innerHTML = "";

  if (page === "home") {
    renderHome(content);
  } else if (page === "menu") {
    renderMenu(content);
  } else if (page === "about") {
    renderAbout(content);
  } else {
    console.error(`Unknown page: ${page}`);
  }
}

renderHome(content);
