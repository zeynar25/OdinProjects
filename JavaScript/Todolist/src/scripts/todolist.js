export function renderTodoList(todolist, items) {
  if (items.length === 0) {
    todolist.appendChild(document.createElement("hr"));
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No tasks to display.";
    emptyMessage.classList.add("empty-message");
    todolist.appendChild(emptyMessage);
    return;
  }

  const overdueCount = findOverdueItemCount(items);

  const overdueItems = items.slice(0, overdueCount);
  if (overdueItems.length > 0) {
    todolist.appendChild(document.createElement("hr"));
    const overdueContainer = document.createElement("div");
    overdueContainer.classList.add("overdue-container");
    todolist.appendChild(overdueContainer);

    const overdueHeader = document.createElement("h3");
    overdueHeader.textContent = "Overdue Tasks";
    overdueContainer.appendChild(overdueHeader);

    overdueItems.forEach((item) => {
      overdueContainer.appendChild(renderItem(item, true));
    });
  }

  let currentDay = null;

  items.slice(overdueCount).forEach((item) => {
    const thisDate = new Date(item.dueDate);
    const thisDay = thisDate.getDate();

    const monthInText = thisDate.toLocaleString("default", {
      month: "long",
    });

    if (currentDay === null || currentDay !== thisDay) {
      todolist.append(document.createElement("hr"));
      const container = document.createElement("div");
      container.classList.add("todo-container");
      todolist.appendChild(container);

      const header = document.createElement("h3");
      if (thisDay === new Date().getDate()) {
        header.textContent = `${monthInText} ${thisDay} (Today)`;
      } else {
        header.textContent = `${monthInText} ${thisDay}`;
      }
      container.appendChild(header);
      container.appendChild(renderItem(item));
      currentDay = thisDay;
    } else {
      const container = todolist.lastElementChild;
      container.appendChild(renderItem(item));
    }
  });
}

function findOverdueItemCount(items) {
  if (items.length === 0) return 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Returns the first non-overdue index (also equals number of overdue items).
  let left = 0;
  let right = items.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    const due = new Date(items[mid].dueDate);
    due.setHours(0, 0, 0, 0);

    if (due < today) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left;
}

function renderItem(item, overdue = false) {
  const todoItem = document.createElement("div");
  todoItem.classList.add("todo-item");

  todoItem.dataset.id = item.id;

  const doneBtn = document.createElement("button");
  if (item.isDone) {
    doneBtn.textContent = "/";
  } else {
    doneBtn.textContent = "\u00A0";
  }
  doneBtn.classList.add("done-btn");
  doneBtn.dataset.action = "done";
  todoItem.appendChild(doneBtn);

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-btn");
  editBtn.dataset.action = "edit";
  todoItem.appendChild(editBtn);

  const title = document.createElement("h3");
  title.textContent = item.title;
  if (item.isDone) {
    title.style.textDecoration = "line-through";
  }
  editBtn.appendChild(title);

  if (overdue) {
    const date = document.createElement("p");
    const monthInText = new Date(item.dueDate).toLocaleString("default", {
      month: "long",
    });
    const day = new Date(item.dueDate).getDate();

    date.textContent = `${monthInText} ${day}`;
    editBtn.appendChild(date);
  }

  const description = document.createElement("p");
  description.textContent = item.description;
  editBtn.appendChild(description);
  todoItem.appendChild(editBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.dataset.action = "delete";
  todoItem.appendChild(deleteBtn);

  todoItem.dataset.priority = item.priority;
  if (item.priority === 1) {
    todoItem.classList.add("high-priority");
  } else if (item.priority === 2) {
    todoItem.classList.add("medium-priority");
  } else if (item.priority === 3) {
    todoItem.classList.add("low-priority");
  } else {
    console.log(`Unknown priority: ${item.priority}`);
  }
  return todoItem;
}
