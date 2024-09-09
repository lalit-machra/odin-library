// Constructor to create new book objects
function Book(author, title, numOfPages, readStatus) {
  this.author = author;
  this.title = title;
  this.numOfPages = numOfPages;
  this.readStatus = readStatus;
}

// Array to store all the objects
let myLibrary = [];

// Add a book to the library
function addToLibrary(book) {
  myLibrary.push(book);
}

const book1 = new Book("author1", "title1", 234, "not read");
const book2 = new Book("author2", "title2", 274, "not read");
addToLibrary(book1);
addToLibrary(book2);

const tbody = document.querySelector("tbody");
let tr, td1, td2, td3, t4;

// Display books
for (let i = 0; i < myLibrary.length; i++) {
  tr = document.createElement("tr");

  td1 = document.createElement("td");
  td1.innerText = myLibrary[i].author;
  tr.appendChild(td1);

  td2 = document.createElement("td");
  td2.innerText = myLibrary[i].title;
  tr.appendChild(td2);

  td3 = document.createElement("td");
  td3.innerText = myLibrary[i].numOfPages;
  tr.appendChild(td3);

  td4 = document.createElement("td");
  td4.innerText = myLibrary[i].readStatus;
  tr.appendChild(td4);

  tbody.appendChild(tr);
}