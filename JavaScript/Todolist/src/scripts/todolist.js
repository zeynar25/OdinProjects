export function renderTodoList(todolist, items) {
  items.forEach((item) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    const title = document.createElement("h3");
    title.textContent = item.title;
    if (item.isDone) {
      title.style.textDecoration = "line-through";
    }
    todoItem.appendChild(title);

    todoItem.dataset.id = item.id;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");
    editBtn.dataset.action = "edit";
    todoItem.appendChild(editBtn);

    const doneBtn = document.createElement("button");
    if (item.isDone) {
      doneBtn.textContent = "Undone";
    } else {
      doneBtn.textContent = "Done";
    }
    doneBtn.classList.add("done-btn");
    doneBtn.dataset.action = "done";
    todoItem.appendChild(doneBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.dataset.action = "delete";
    todoItem.appendChild(deleteBtn);

    todolist.appendChild(todoItem);
  });
}
