function Book(title, author, pages) {
  if (!new.target) {
    throw Error(
      "You must use the 'new' operator to call the Book constructor.",
    );
  }

  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = false;

  this.info = function () {
    console.log(
      `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "read" : "not read yet"}`,
    );
  };
}

const hobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295);
console.log(hobbit.info());
