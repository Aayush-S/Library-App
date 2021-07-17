let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.read = read
  displayed = false;
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
}

function displayBooks() {
  const container = document.querySelector('#container');
  let card;
  myLibrary.forEach(book => {
    if (!book.displayed) {
      card = document.createElement('div');
      card.classList.add('card')

      let title = document.createElement('h3');
      title.textContent = book.title;
      card.appendChild(title);

      let author = document.createElement('p');
      author.textContent = book.author;
      card.appendChild(author);

      let pages = document.createElement('p');
      pages.textContent = book.pages + " pages";
      card.appendChild(pages);

      let read = document.createElement('p');
      read.textContent = book.read ? "Read" : "Not Read";
      card.appendChild(read);

      container.appendChild(card);
      book.displayed = true;
    }
  });
}

addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("testbook", "authorname", 43, true);
displayBooks();

addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("testbook", "authorname", 43, true);

addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("testbook", "authorname", 43, true);

displayBooks();

