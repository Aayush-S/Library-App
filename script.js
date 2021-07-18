let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  displayed = false;
}

Book.prototype.didRead = function() {
  this.read = !this.read;
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
  displayBooks();
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function displayBooks() {
  const container = document.querySelector('#container');
  removeAllChildNodes(container);
  let card;
  myLibrary.forEach((book, index) => {
    
    card = document.createElement('div');
    card.dataset.key = index;
    card.classList.add('card');

    let title = document.createElement('h3');
    title.textContent = book.title;
    card.appendChild(title);

    let author = document.createElement('p');
    author.textContent = book.author;
    card.appendChild(author);

    let pages = document.createElement('p');
    pages.textContent = book.pages + " pages";
    card.appendChild(pages);

    let read = document.createElement('button');
    read.classList.add('read-btn');
    read.textContent = book.read ? "Read" : "Not Read";
    book.read ? card.classList.add('card-completed') : card.classList.remove('card-completed');

    read.addEventListener('click', function(e) {
      myLibrary[e.target.parentElement.dataset.key].didRead();
      read.textContent = book.read ? "Read" : "Not Read";
      book.read ? e.target.parentElement.classList.add('card-completed') : e.target.parentElement.classList.remove('card-completed');
    });
    card.appendChild(read);

    let remove = document.createElement('button');
    remove.textContent = "Remove";
    remove.classList.add('remove-btn');
    remove.addEventListener('click', function (e) {
      let removed = myLibrary.splice(e.target.parentElement.dataset.key, 1);
      displayBooks();
    });
    card.appendChild(remove);

    container.appendChild(card);
  });
}

const newBookBtn = document.querySelector('#new-book-btn');
newBookBtn.addEventListener('click', () => {
  console.log(document.getElementById('book-title').textContent);
  addBookToLibrary(document.getElementById('book-title').value,
    document.getElementById('book-author').value,
    document.getElementById('book-pages').value,
    document.getElementById('book-read').checked);
});
