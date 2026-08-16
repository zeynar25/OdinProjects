export function renderNav(nav, projects, activeProjectId = projects[0]?.id) {
  projects.forEach((project) => {
    const button = document.createElement("button");
    button.type = "button";
    button.classList.add("nav-button");
    button.textContent = project.name;
    button.value = project.id;

    const isActive = project.id === activeProjectId;
    button.classList.toggle("active", isActive);

    if (isActive) {
      console.log(`Active project: ${project.name} (ID: ${project.id})`);
    }

    nav.appendChild(button);
  });
}
