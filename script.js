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
let tr, td1, td2, td3, td4, td5, deleteBtn;


function displayBooks() {
  for (let i = 0; i < myLibrary.length; i++) {
    tr = document.createElement("tr");
  
    td1 = document.createElement("td");
    td1.innerText = myLibrary[i].author;
    td1.classList.add(`book${i + 1}`);
    tr.appendChild(td1);
  
    td2 = document.createElement("td");
    td2.innerText = myLibrary[i].title;
    td2.classList.add(`book${i + 1}`);
    tr.appendChild(td2);
  
    td3 = document.createElement("td");
    td3.innerText = myLibrary[i].numOfPages;
    td3.classList.add(`book${i + 1}`);
    tr.appendChild(td3);
  
    td4 = document.createElement("td");
    td4.innerText = myLibrary[i].readStatus;
    td4.classList.add(`book${i + 1}`);
    tr.appendChild(td4);

    td5 = document.createElement("td");
    deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.classList.add(`book${i + 1}`);
    td5.appendChild(deleteBtn);
    tr.appendChild(td5);

    // Add an event listener to delete button to handle deletes
    deleteBtn.addEventListener("click", (e) => {
      // Remove the deleted object from array
      let bookClass = e.target.classList[0];
      let bookTitle = document.getElementsByClassName(`${bookClass}`)[1].innerText;
      
      // Iterate myLibrary array to find the object using title name and delete it
      for (let j = 0; j < myLibrary.length; j++) {
        if (myLibrary[j]["title"] === bookTitle) {
          myLibrary.splice(j, 1);
        }
      }
      
      // Remove the entire row from table
      let deleteTr = e.target.parentNode.parentNode;
      console.log(deleteTr);
      deleteTr.remove();
    });
  
    tbody.appendChild(tr);
  }
}

// Add new book using dialog box
const addNewBook = document.querySelector(".addNewBook");
const newBookDialog = document.querySelector(".newBookDialog");

addNewBook.addEventListener("click", () => {
  newBookDialog.showModal();
});

const author = document.querySelector("#author");
const title = document.querySelector("#title");
const numOfPages = document.querySelector("#numOfPages")
const readingStatus = document.querySelector("readingStatus");

const formSubmitBtn = document.querySelector("form > button");

formSubmitBtn.addEventListener("click", () => {
  let newBook = {};
  newBook["author"] = author.value;
  newBook["title"] = title.value;
  newBook["numOfPages"] = numOfPages.value;
  newBook["readingStatus"] = readingStatus.value;

  addToLibrary(newBook);
});

displayBooks();