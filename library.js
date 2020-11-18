let library = (JSON.parse(localStorage.getItem("library") || "[]")).map(book => Object.assign(new Book(), book));
let books = document.querySelector("#books");
let showFormButton = document.querySelector("#new-book-button");
let form = document.querySelector("#new-book-form");
const addBookButton = document.querySelector("#add-book-button");

showFormButton.addEventListener("click", displayForm);
addBookButton.addEventListener("click", addBookToLibrary);

function displayForm() {
  if (form.style.display === "flex") {
    form.style.display = "none";
    showFormButton.textContent = "+ New Book"
    showFormButton.id = "new-book-button";
  } else {
    form.style.display = "flex";
    showFormButton.textContent = "- Hide";
    showFormButton.id = "hide-button";
  };
};

function Book(title, author, numOfPages, readStatus) {
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;
  this.readStatus = readStatus;
};

Book.prototype.changeReadStatus = function() {
  if (this.readStatus === true) {
    this.readStatus = false;
  } else {
    this.readStatus = true;
  };
};

function addBookToLibrary() {
  let title = form.title.value;
  let author = form.author.value;
  let numOfPages = form.numofpages.value;
  let readStatus = form.readstatus.checked;
  if (readStatus === true) {
    readStatus = true;
  } else {
    readStatus = false;
  };
  let book = new Book(title, author, numOfPages, readStatus);
  library.push(book);
  localStorage.setItem("library", JSON.stringify(library));
  displayForm();
  displayBooks();
};

function displayBooks() {
  books.innerHTML = ""
  library.forEach((book, id) => {
    let bookDiv = document.createElement("div");
    bookDiv.className = "book";
    bookDiv.dataset.id = id
    let title = document.createElement("p");
    let titleNode = document.createTextNode("Title: " + book.title);
    title.appendChild(titleNode);
    let author = document.createElement("p");
    let authorNode = document.createTextNode("Author: " + book.author);
    author.appendChild(authorNode);
    let numOfPages = document.createElement("p");
    let numOfPagesNode = document.createTextNode("Number of Pages: " + book.numOfPages);
    numOfPages.appendChild(numOfPagesNode);
    bookDiv.appendChild(title);
    bookDiv.appendChild(author);
    bookDiv.appendChild(numOfPages);
    let readStatusButton = document.createElement("button");
    if (book.readStatus === true) {
      readStatusButton.id = "read-status-true";
      readStatusButton.textContent = "Read";
    } else {
      readStatusButton.id = "read-status-false";
      readStatusButton.textContent = "Not Read Yet";
    };
    readStatusButton.addEventListener("click", toggleReadStatus);
    let deleteButton = document.createElement("button");
    bookDiv.appendChild(readStatusButton);
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", deleteBook);
    bookDiv.appendChild(deleteButton);
    books.appendChild(bookDiv);
  });
};

function toggleReadStatus() {
  library[this.parentElement.dataset.id].changeReadStatus();
  localStorage.setItem("library", JSON.stringify(library));
  if (this.id === "read-status-true") {
    this.id = "read-status-false";
    this.textContent = "Not Read Yet";
  } else {
    this.id = "read-status-true"
    this.textContent = "Read"
  };
};

function deleteBook() {
  library.splice(this.parentElement.dataset.id, 1);
  localStorage.setItem("library", JSON.stringify(library));
  displayBooks();
};

displayBooks();