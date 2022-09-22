const books = [];
const RENDER_EVENT = 'render-book';
 
document.addEventListener('DOMContentLoaded', function () {
  const submitForm = document.getElementById('inputBook');
  submitForm.addEventListener('submit', function (event) {
    event.preventDefault();
    input_section();
  });
});
 
function input_section() {
  const textBook = document.getElementById('inputBookTitle').value;
  const textAuthor = document.getElementById('inputBookAuthor').value;
  const textYear = document.getElementById('inputBookYear').value;
  const isComplete = document.getElementById('inputBookIsComplete').checked;
  const generatedID = generateId();
  const bookObject = generateBookObject(generatedID, textBook, textAuthor, textYear, isComplete);
  books.push(bookObject);
 
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}
 
function generateId() {
  return +new Date();
}
 
function generateBookObject(id, title, author, year, isComplete) {
  return {
    id,
    title,
    author,
    year,
    isComplete
  }
}
 
document.addEventListener(RENDER_EVENT, function () {
  console.log(books);
});
 
function inputBook(bookObject) {
  const textTitle = document.createElement('h3');
  textTitle.innerText = bookObject.title;
 
  const textAuthor = document.createElement('p');
  textAuthor.innerText = 'Penulis : ' + bookObject.author;
 
  const textYear = document.createElement('p');
  textYear.innerText = 'Tahun : ' + bookObject.year;
 
 
  const textButton = document.createElement('div');
  textButton.classList.add('action');
 
  const container = document.createElement('article');
  container.classList.add('book_item');
  container.append(textTitle, textAuthor, textYear, textButton);
  container.setAttribute('id', `book-${bookObject.id}`);
 
 
  if (bookObject.isComplete) {
    const undoButton = document.createElement('button');
    undoButton.classList.add('green');
    undoButton.innerText = 'Belum Selesai Dibaca';
 
    undoButton.addEventListener('click', function () {
      undoTaskFromCompleted(bookObject.id);
    });
 
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('red');
    deleteButton.innerText = 'Hapus Buku';
 
    deleteButton.addEventListener('click', function () {
      removeTaskFromCompleted(bookObject.id);
    });
 
    textButton.append(undoButton, deleteButton);
 
  } else {
    const checkButton = document.createElement('button');
    checkButton.classList.add('green');
    checkButton.innerText = 'Selesai Dibaca';
 
    checkButton.addEventListener('click', function () {
      addTaskToCompleted(bookObject.id);
    });
 
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('red');
    deleteButton.innerText = 'Hapus Buku';
 
    deleteButton.addEventListener('click', function () {
      removeTaskFromCompleted(bookObject.id);
    });
 
    textButton.append(checkButton, deleteButton);
  }
 
  return container;
}
 
function checkButton() {
  const checkBox = document.querySelector("#inputBookIsComplete");
  checkBox.addEventListener("checked", function () {
    if (checkBox == isComplete) addBookToComplete(id);
  });
}
 
function addBook() {
  const title = document.getElementById("inputBookTitle").value;
  const author = document.getElementById("inputBookAuthor").value;
  const year = document.getElementById("inputBookYear").value;
  const isComplete = document.getElementById('inputBookIsComplete').checked;
  const generatedID = generateId();
  const bookObject = generateBookObject(
    generatedID,
    title,
    author,
    year,
    isComplete
  )
};
 
 
 
 
function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}
 
const SAVED_EVENT = 'saved-book';
const STORAGE_KEY = 'BOOKSHELF_APPS';
 
function isStorageExist() /* boolean */ {
  if (typeof (Storage) === undefined) {
    alert('Browser kamu tidak mendukung local storage');
    return false;
  }
  return true;
}
 
 
 
function addTaskToCompleted(bookId) {
  const bookTarget = findBook(bookId);
 
  if (bookTarget == null) return;
 
  bookTarget.isComplete = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}
 
function findBook(bookId) {
  for (const bookItem of books) {
    if (bookItem.id === bookId) {
      return bookItem;
    }
  }
  return null;
}
 
function removeTaskFromCompleted(bookId) {
  const bookTarget = findBookIndex(bookId);
 
  if (bookTarget === -1) return;
 
  books.splice(bookTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}
 
 
function undoTaskFromCompleted(bookId) {
  const bookTarget = findBook(bookId);
 
  if (bookTarget == null) return;
 
  bookTarget.isComplete = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}
 
function findBookIndex(bookId) {
  for (const index in books) {
    if (books[index].id === bookId) {
      return index;
    }
  }
 
  return -1;
}
 
function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);
 
  if (data !== null) {
    for (const todo of data) {
      books.push(todo);
    }
  }
 
  document.dispatchEvent(new Event(RENDER_EVENT));
}
 
document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("inputBook");
 
  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
  });
 
  if (isStorageExist()) {
    loadDataFromStorage();
  }
});
 
document.addEventListener(RENDER_EVENT, function () {
  const uncompletedBookList = document.getElementById('incompleteBookshelfList');
  uncompletedBookList.innerHTML = '';
 
  const completedBookList = document.getElementById('completeBookshelfList');
  completedBookList.innerHTML = '';
 
  for (const bookItem of books) {
    const bookElement = inputBook(bookItem);
    if (!bookItem.isComplete)
      uncompletedBookList.append(bookElement);
    else
      completedBookList.append(bookElement);
  }
});
 
document.addEventListener(SAVED_EVENT, function () {
  console.log(localStorage.getItem(STORAGE_KEY));
});
 
document.getElementById('searchBook').addEventListener('submit', function (event) {
  event.preventDefault();
  const searchBook = document.getElementById('searchBookTitle').value.toLowerCase();
  const bookList = document.querySelectorAll('.book_item > h3');
  for (const book of bookList) {
    if (book.innerText.toLowerCase().includes(searchBook)) {
      book.parentElement.style.display = "block";
    } else {
      book.parentElement.style.display = "none";
    }
  }
});