export function renderHome(page) {
  const heading = document.createElement("h1");
  heading.classList.add("home-heading");
  heading.textContent = "Welcome to Coffee Cafe!";

  const description = document.createElement("p");
  description.classList.add("home-description");
  description.textContent =
    "Experience the finest dining with our exquisite menu and exceptional service.";

  page.appendChild(heading);
  page.appendChild(description);
}
