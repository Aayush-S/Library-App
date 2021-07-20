let myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

Book.prototype.didRead = function() {
  this.read = !this.read;
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
  displayBooks();
  updateLocalStorage();
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
      console.log(myLibrary);
      (myLibrary[e.target.parentElement.dataset.key]).didRead();
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
      updateLocalStorage();
    });
    card.appendChild(remove);

    container.appendChild(card);
  });
}

const newBookBtn = document.querySelector('#new-book-btn');
newBookBtn.addEventListener('click', () => {
  addBookToLibrary(document.getElementById('book-title').value,
    document.getElementById('book-author').value,
    document.getElementById('book-pages').value,
    document.getElementById('book-read').checked);
});

function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

function loadLocalStorage() {
  // fetch from localStorage if available
  // set myLibrary to fetched value
  if (storageAvailable('localStorage')) {
    let fetchedLibrary = JSON.parse(localStorage.getItem('library'));
    myLibrary = (fetchedLibrary === null) ? [] : fetchedLibrary;
    myLibrary = myLibrary.map(book => new Book(book.title, book.author, book.pages, book.read));
    displayBooks();
  }
  else {
    alert("Local Storage not available. Content will not save on page reload.");
  }
}

function updateLocalStorage() {
  // Set variable in local storage to the current 'myLibrary' array
  localStorage.setItem('library', JSON.stringify(myLibrary));
}

loadLocalStorage();