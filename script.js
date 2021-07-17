let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.read = read
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
}

function displayBooks() {
  const container = document.querySelector('#container');
  let element;
  myLibrary.forEach(book => {
    element = document.createElement('p');
    element.textContent = `${book.title} by ${book.author}. It has ${book.pages} pages. Read: ${book.read}`;
    container.appendChild(element);
  });
}

addBookToLibrary("1984", "George Orwell", 325, false);
addBookToLibrary("testbook", "authorname", 43, true);
displayBooks();
