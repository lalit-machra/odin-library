class Library {
  static myLibrary = [];

  static displayAllBooks() {
    const tbody = document.querySelector("tbody");
    let tr, td, deleteBtn, readStatusBtn, trToDelete;
    const allFields = ["author", "title", "numOfPages", "readStatus"];

    for (let i = 0; i < this.myLibrary.length; i++) {
      tr = document.createElement("tr");

      for (let j = 0; j <= allFields.length; j++) {
        td = document.createElement("td");

        // delete button
        if (j === allFields.length) {
          deleteBtn = document.createElement("button");
          deleteBtn.innerText = "Delete";
          deleteBtn.classList.add(`book${i + 1}`, "deleteBtn");
          td.appendChild(deleteBtn);

          // Add event listener for handling deletion of books
          deleteBtn.addEventListener("click", () => {
            Library.myLibrary[i].deleteFromLibrary();
            trToDelete = document.querySelector("tbody > tr > td[class=`book${i + 1}`]").parentElement;
            trToDelete.remove();
          });
        }

        // read status toggle button
        else if (j === (allFields.length - 1)) {
          readStatusBtn = document.createElement("button");
          // We have different styling for button depending upon whether book read or not
          if (Library.myLibrary[i].readStatus === "read") {
            readStatusBtn.classList.add("read-status-button", "book-read");
          }
          else if (Library.myLibrary[i].readStatus === "unread") {
            readStatusBtn.classList.add("read-status-button", "book-unread");
          }
          td.appendChild(readStatusBtn);

          // Add event listener for handling change of read status
          readStatusBtn.addEventListener("click", () => {
            if (e.target.classList.contains("book-read")) {
              e.target.classList.remove("book-read");
              e.target.classList.add("book-unread");
              this.myLibrary[i]["readStatus"] = "unread";
            }
            else {
              e.target.classList.remove("book-unread");
              e.target.classList.add("book-read");
              this.myLibrary[i]["readStatus"] = "read";
            }
          });
        }

        else {
          td.innerText = Library.myLibrary[i][allFields[j]];
        }

        td.classList.add(`book${i + 1}`);
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }
  }
}

class Book extends Library{
  constructor(author, title, numOfPages, readStatus) {
    super();
    this.author = author;
    this.title = title;
    this.numOfPages = numOfPages;
    this.readStatus = readStatus;
  }

  addToLibrary() {
    Library.myLibrary.push(this);
  }

  deleteFromLibrary() {
    let index = Library.myLibrary.indexOf(this);
    Library.myLibrary.splice(index, 1);
  }
}

const book1 = new Book("author1", "title1", 234, "unread");
const book2 = new Book("author2", "title2", 489, "read"); 
const book3 = new Book("author3", "title3", 900, "unread");
book1.addToLibrary();
book2.addToLibrary();
book3.addToLibrary();



function displayBooks() {
  for (let i = 0; i < Library.myLibrary.length; i++) {
    tr = document.createElement("tr");
  
    td1 = document.createElement("td");
    td1.innerText = Library.myLibrary[i].author;
    td1.classList.add(`book${i + 1}`);
    tr.appendChild(td1);
  
    td2 = document.createElement("td");
    td2.innerText = Library.myLibrary[i].title;
    td2.classList.add(`book${i + 1}`);
    tr.appendChild(td2);
  
    td3 = document.createElement("td");
    td3.innerText = Library.myLibrary[i].numOfPages;
    td3.classList.add(`book${i + 1}`);
    tr.appendChild(td3);
  
    td4 = document.createElement("td");
    readStatusBtn = document.createElement("button");
 
    td4.appendChild(readStatusBtn);
    tr.appendChild(td4);

    // Add an event listener to readSatusBtn to toggle between read and unread
    readStatusBtn.addEventListener("click", (e) => {
      if (e.target.classList[2] === "book-read") {
        e.target.classList.remove("book-read");
        e.target.classList.add("book-unread");
      }
      else {
        e.target.classList.remove("book-unread");
        e.target.classList.add("book-read");
      }
    })

    td5 = document.createElement("td");
    deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.classList.add(`book${i + 1}`, "deleteBtn");
    td5.appendChild(deleteBtn);
    tr.appendChild(td5);

    // Add an event listener to deleteBtn to handle deletes
    deleteBtn.addEventListener("click", (e) => {
      // Remove the deleted object from array
      let bookClass = e.target.classList[0];
      let bookTitle = document.getElementsByClassName(`${bookClass}`)[1].innerText;
      
      // Iterate Library.myLibrary array to find the object using title name and delete it
      for (let j = 0; j < Library.myLibrary.length; j++) {
        if (Library.myLibrary[j]["title"] === bookTitle) {
          Library.myLibrary.splice(j, 1);
        }
      }
      
      // Remove the entire row from table
      let deleteTr = e.target.parentNode.parentNode;
      deleteTr.remove();
    });
  
    tbody.appendChild(tr);
  }
}

// Delete all elements from table
function emptyTable() {
  tbody.innerHTML = "";
}

// Add new book using dialog box
const addNewBtn = document.querySelector(".addNewBtn");
const newBookDialog = document.querySelector(".newBookDialog");
const closeDialog = document.querySelector("dialog .close-dialog");

addNewBtn.addEventListener("click", () => {
  newBookDialog.showModal();
});
closeDialog.addEventListener("click", () => {
  newBookDialog.close();
});

const author = document.querySelector("#author");
const title = document.querySelector("#title");
const numOfPages = document.querySelector("#numOfPages")
const readingStatus = document.querySelector("#readingStatus");

const formSubmitBtn = document.querySelector("form > button");

formSubmitBtn.addEventListener("click", () => {
  let newBook = {};
  newBook["author"] = author.value;
  newBook["title"] = title.value;
  newBook["numOfPages"] = numOfPages.value;
  newBook["readStatus"] = readingStatus.value;

  addToLibrary(newBook);
  emptyTable();
  displayBooks();
});

Library.displayAllBooks();