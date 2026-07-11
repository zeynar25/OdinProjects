function Book(title, author, pages) {
  if (!new.target) {
    throw Error(
      "You must use the 'new' operator to call the Book constructor.",
    );
  }

  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = false;

  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "read" : "not read yet"}`;
  };
}

function updateLibraryDisplay() {
  libraryContent.innerHTML = ""; // Clear the existing content

  library.forEach((book) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td>${book.read ? "Read" : "Not Read"}</td>
      <td>
        <button class="removeButton" value="${book.id}">Remove</button>
      </td>
      <td>
        <button class="updateReadButton" value="${book.id}">
          ${book.read ? "Mark as Unread" : "Mark as Read"}
        </button>
      </td>
    `;
    libraryContent.appendChild(row);
  });

  attachButtonListeners();
}

function attachButtonListeners() {
  const removeButtons = libraryContent.querySelectorAll(".removeButton");
  removeButtons.forEach((removeBtn) => {
    removeBtn.addEventListener("click", function (event) {
      const bookId = event.target.value;
      removeFromLibrary(bookId);
    });
  });

  const updateReadButtons =
    libraryContent.querySelectorAll(".updateReadButton");
  updateReadButtons.forEach((updateBtn) => {
    updateBtn.addEventListener("click", function (event) {
      const bookId = event.target.value;
      updateBookStatus(bookId);
    });
  });
}

function addToLibrary(title, author, pages, preAdded = false) {
  const book = new Book(title, author, pages);
  console.log(`${book.title} by ${book.author} created.`);

  library.push(book);
  console.log(`Book added to library: ${book.title}`);

  if (!preAdded) {
    alert(`"${book.title}" added to library`);
  }

  library.sort((a, b) => a.title.localeCompare(b.title));
  updateLibraryDisplay();

  return book;
}

function findFromLibrary(bookId) {
  return library.find((book) => book.id === bookId);
}

function removeFromLibrary(bookId) {
  console.log(`Attempting to remove a book with ID "${bookId}" from library.`);
  const book = findFromLibrary(bookId);

  if (book) {
    library.splice(library.indexOf(book), 1);
    updateLibraryDisplay();
    console.log(`"${book.title}" removed from library.`);
  } else {
    alert(`Book with id "${bookId}" not found in library.`);
  }
}

function updateBookStatus(bookId) {
  const book = findFromLibrary(bookId);

  if (book) {
    book.read = !book.read;
    console.log(
      `"${book.title}" read status updated to "${book.read ? "Read" : "Not Read"}"`,
    );
    updateLibraryDisplay();
  } else {
    alert("Book not found in library.");
  }
}

const libraryContent = document.getElementById("libraryContent");

const library = [];
addToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addToLibrary("1984", "George Orwell", 328, true);
addToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true);
addToLibrary("Pride and Prejudice", "Jane Austen", 432, true);
addToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, true);
addToLibrary("Moby-Dick", "Herman Melville", 635, true);
addToLibrary("Brave New World", "Aldous Huxley", 311, true);
addToLibrary("The Catcher in the Rye", "J.D. Salinger", 277, true);
addToLibrary("Fahrenheit 451", "Ray Bradbury", 249, true);
addToLibrary("The Lord of the Rings", "J.R.R. Tolkien", 1178, true);
addToLibrary("Jane Eyre", "Charlotte Bronte", 500, true);

const bookForm = document.getElementById("bookForm");
bookForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const titleInput = document.getElementById("bookTitle");
  const authorInput = document.getElementById("bookAuthor");
  const pagesInput = document.getElementById("bookPages");

  addToLibrary(titleInput.value, authorInput.value, parseInt(pagesInput.value));
});
