class Book {
  constructor(title, author, pages) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false;
  }

  info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "read" : "not read yet"}`;
  }

  updateReadStatus() {
    this.read = !this.read;
  }
}

class Library {
  constructor(libraryContent) {
    this.libraryContent = libraryContent;
    this.storage = [];
  }

  addBook(title, author, pages, preAdded = false) {
    const book = new Book(title, author, pages);
    console.log(`${book.title} by ${book.author} created.`);

    this.storage.push(book);
    console.log(`Book added to library: ${book.title}`);

    if (!preAdded) {
      alert(`"${book.title}" added to library`);
    }

    this.storage.sort((a, b) => a.title.localeCompare(b.title));
    this.#updateDisplay();

    return book;
  }

  findBook(bookId) {
    return this.storage.find((book) => book.id === bookId);
  }

  removeBook(bookId) {
    console.log(
      `Attempting to remove a book with ID "${bookId}" from library.`,
    );
    const book = this.findBook(bookId);

    if (book) {
      this.storage.splice(this.storage.indexOf(book), 1);
      this.#updateDisplay();
      console.log(`"${book.title}" removed from library.`);
    } else {
      alert(`Book with id "${bookId}" not found in library.`);
    }
  }

  #updateDisplay() {
    this.libraryContent.innerHTML = ""; // Clear the existing content

    this.storage.forEach((book) => {
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
      this.libraryContent.appendChild(row);
    });

    this.#attachButtonListeners();
  }

  #attachButtonListeners() {
    const removeButtons = this.libraryContent.querySelectorAll(".removeButton");
    removeButtons.forEach((removeBtn) => {
      removeBtn.addEventListener("click", (event) => {
        const bookId = event.currentTarget.value;
        this.removeBook(bookId);
      });
    });

    const updateReadButtons =
      this.libraryContent.querySelectorAll(".updateReadButton");
    updateReadButtons.forEach((updateBtn) => {
      updateBtn.addEventListener("click", (event) => {
        const bookId = event.currentTarget.value;
        const book = this.findBook(bookId);

        if (book) {
          book.updateReadStatus();
          console.log(
            `"${book.title}" read status updated to: ${book.read ? "Read" : "Not Read"}`,
          );
          this.#updateDisplay();
        } else {
          console.log(`Book with ID "${bookId}" not found in library.`);
        }
      });
    });
  }
}

const libraryContent = document.getElementById("libraryContent");

const library = new Library(libraryContent);
library.addBook("The Hobbit", "J.R.R. Tolkien", 295, true);
library.addBook("1984", "George Orwell", 328, true);
library.addBook("To Kill a Mockingbird", "Harper Lee", 281, true);
library.addBook("Pride and Prejudice", "Jane Austen", 432, true);
library.addBook("The Great Gatsby", "F. Scott Fitzgerald", 180, true);
library.addBook("Moby-Dick", "Herman Melville", 635, true);
library.addBook("Brave New World", "Aldous Huxley", 311, true);
library.addBook("The Catcher in the Rye", "J.D. Salinger", 277, true);
library.addBook("Fahrenheit 451", "Ray Bradbury", 249, true);
library.addBook("The Lord of the Rings", "J.R.R. Tolkien", 1178, true);
library.addBook("Jane Eyre", "Charlotte Bronte", 500, true);

const bookForm = document.getElementById("bookForm");
bookForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const titleInput = document.getElementById("bookTitle");
  const authorInput = document.getElementById("bookAuthor");
  const pagesInput = document.getElementById("bookPages");

  library.addBook(
    titleInput.value,
    authorInput.value,
    parseInt(pagesInput.value),
  );
});
