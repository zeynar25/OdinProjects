export function renderTodoList(todolist, items) {
  items.forEach((item) => {
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

    todolist.appendChild(todoItem);
  });
}
