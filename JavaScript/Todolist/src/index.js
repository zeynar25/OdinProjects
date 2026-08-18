import Project from "./scripts/classes/Project.js";
import TodoItem from "./scripts/classes/TodoItem.js";
import { renderNav } from "./scripts/nav.js";
import { renderTodoList } from "./scripts/todolist.js";
import "./styles.css";

const STORAGE_KEY = "todolist.appState.v1";

const projects = [new Project("Default")];
let activeProjectId = projects[0].id;
let activeYear = new Date().getFullYear();
let activeMonth = new Date().toLocaleString("default", { month: "long" });

let yearsList = [activeYear];
const monthsList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getDefaultMonthName() {
  return monthsList[new Date().getMonth()];
}

function buildSerializableState() {
  return {
    projects: projects.map((project) => ({
      id: project.id,
      name: project.name,
    })),
    todoList: todoList.map((todo) => ({
      id: todo.id,
      projectId: todo.projectId,
      title: todo.title,
      description: todo.description ?? "",
      dueDate: todo.dueDate,
      priority: Number(todo.priority) || 3,
      isDone: Boolean(todo.isDone),
    })),
    activeProjectId,
    activeYear,
    activeMonth,
    yearsList: [...new Set(yearsList)],
  };
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(buildSerializableState()));
  } catch (error) {
    console.error("Failed to save app state:", error);
  }
}

function loadState() {
  const defaultMonth = getDefaultMonthName();

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      activeMonth = defaultMonth;
      return;
    }

    const parsed = JSON.parse(raw);

    const loadedProjects = Array.isArray(parsed.projects)
      ? parsed.projects
          .filter((project) => project && typeof project.id === "string")
          .map((project) => ({
            id: project.id,
            name: String(project.name ?? "Untitled Project"),
          }))
      : [];

    if (loadedProjects.length === 0) {
      const fallback = new Project("Default");
      loadedProjects.push({
        id: fallback.id,
        name: fallback.name,
      });
    }

    projects.splice(0, projects.length, ...loadedProjects);

    const loadedTodos = Array.isArray(parsed.todoList)
      ? parsed.todoList
          .filter((todo) => todo && typeof todo.id === "string")
          .map((todo) => ({
            id: todo.id,
            projectId: String(todo.projectId ?? projects[0].id),
            title: String(todo.title ?? ""),
            description: String(todo.description ?? ""),
            dueDate: String(todo.dueDate ?? ""),
            priority: Number(todo.priority) || 3,
            isDone: Boolean(todo.isDone),
          }))
      : [];

    todoList.splice(0, todoList.length, ...loadedTodos);

    const currentYear = new Date().getFullYear();
    const yearsFromTodos = todoList
      .map((todo) => new Date(todo.dueDate).getFullYear())
      .filter((year) => Number.isInteger(year) && !Number.isNaN(year));

    const persistedYears = Array.isArray(parsed.yearsList)
      ? parsed.yearsList
          .map((year) => Number(year))
          .filter((year) => Number.isInteger(year))
      : [];

    const mergedYears = [
      ...new Set([currentYear, ...persistedYears, ...yearsFromTodos]),
    ].sort((a, b) => a - b);

    yearsList.splice(0, yearsList.length, ...mergedYears);

    const hasActiveProject = projects.some(
      (project) => project.id === parsed.activeProjectId,
    );
    activeProjectId = hasActiveProject
      ? parsed.activeProjectId
      : projects[0].id;

    const persistedYear = Number(parsed.activeYear);
    activeYear = yearsList.includes(persistedYear)
      ? persistedYear
      : currentYear;

    activeMonth = monthsList.includes(parsed.activeMonth)
      ? parsed.activeMonth
      : defaultMonth;
  } catch (error) {
    console.error("Failed to load app state:", error);
    activeMonth = defaultMonth;
  }
}

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
  refreshTodoListByYearMonth(activeYear, activeMonth);
  saveState();
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
  saveState();

  projectFormContainer.style.display = "none";
  projectForm.reset();
});

const closeTodoListDateBtn = document.querySelector(
  "#close-todo-list-date-btn",
);
closeTodoListDateBtn.addEventListener("click", () => {
  todoListDateBtn.dataset.year = "";
  todoListDateBtn.dataset.month = "";
  todoListMonths.style.display = "none";
  todoListYears.style.display = "flex";
  todoListDate.style.display = "none";
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
const todoListDateBtn = document.querySelector("#todo-list-date-btn");
const todoListDate = document.querySelector("#todo-list-date");

todoListDateBtn.addEventListener("click", () => {
  todoListDate.style.display = "flex";
});

const todoListMonths = document.querySelector("#todo-list-months");
todoListMonths.innerHTML = "";
monthsList.forEach((month) => {
  const monthBtn = document.createElement("button");
  monthBtn.addEventListener("click", () => {
    todoListDateBtn.dataset.month = month;
    activeMonth = month;
    activeYear = parseInt(todoListDateBtn.dataset.year, 10);

    todoListYears.style.display = "flex";
    todoListMonths.style.display = "none";
    todoListDate.style.display = "none";

    refreshTodoListByYearMonth(activeYear, activeMonth);
    saveState();
  });
  monthBtn.textContent = month;
  monthBtn.classList.add("todo-list-month");
  todoListMonths.appendChild(monthBtn);
});

function refreshTodoListByYearMonth(year, month) {
  todoListDateBtn.textContent = `${month} ${year}`;
  todoListContainer.innerHTML = "";

  const filteredTodoList = todoList.filter((todo) => {
    if (todo.projectId !== activeProjectId) {
      return false;
    }

    const todoDate = new Date(todo.dueDate);

    return (
      todoDate.getFullYear() === year &&
      monthsList[todoDate.getMonth()] === month
    );
  });

  const sortedAndFilteredTodoList = filteredTodoList.sort((a, b) => {
    const dateA = new Date(a.dueDate).getDate();
    const dateB = new Date(b.dueDate).getDate();

    if (dateA === dateB) {
      return a.priority - b.priority;
    }
    return dateA - dateB;
  });

  renderTodoList(todoListContainer, sortedAndFilteredTodoList);
}

function renderTodoYears() {
  todoListYears.innerHTML = "";
  yearsList.sort((a, b) => a - b);
  yearsList.forEach((year) => {
    const yearBtn = document.createElement("button");
    yearBtn.classList.add("todo-list-year");
    yearBtn.addEventListener("click", () => {
      todoListYears.style.display = "none";
      todoListMonths.style.display = "flex";
      todoListDateBtn.dataset.month = "";
      todoListDateBtn.dataset.year = year;
    });
    yearBtn.textContent = year;
    todoListYears.appendChild(yearBtn);
  });
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
    activeProjectId,
    todoInputName.value,
    todoInputDescription.value,
    todoInputDueDate.value,
    parseInt(todoInputPriority.value, 10),
  );

  todoList.push(newTodo);

  console.log(`adding ${newTodo.title} item`);

  const todoYear = new Date(newTodo.dueDate).getFullYear();
  if (!yearsList.includes(todoYear)) {
    yearsList.push(todoYear);
    renderTodoYears();
  }

  todoFormContainer.style.display = "none";
  todoForm.reset();
  todoInputDueDate.value = new Date().toISOString().split("T")[0];

  addTodoBtn.style.display = "block";

  refreshTodoListByYearMonth(activeYear, activeMonth);
  saveState();
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
  refreshTodoListByYearMonth(activeYear, activeMonth);
  saveState();
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
    refreshTodoListByYearMonth(activeYear, activeMonth);
    saveState();
  } else if (action === "delete") {
    console.log(`deleting ${id} item`);
    todoList.splice(index, 1);
    refreshTodoListByYearMonth(activeYear, activeMonth);
    saveState();
  } else {
    console.log(`clicked on ${todoItem.dataset.id} item`);
  }
});

const todoListYears = document.querySelector("#todo-list-years");

loadState();
refreshProjectNav();
renderTodoYears();
refreshTodoListByYearMonth(activeYear, activeMonth);
