// Library class
class Library {
  static myLibrary = [];

  static displayAllBooks() {
    const tbody = document.querySelector("tbody");
    let tr, td, deleteBtn, readStatusBtn, trToDelete;
    const allFields = ["author", "title", "numOfPages", "readStatus"];

    for (let i = 0; i < this.myLibrary.length; i++) {
      // If the user is adding a new book, then only add it to the DOM
      if (Book.addingNewBook === true) {
        i = this.myLibrary.length - 1;
      }

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
          deleteBtn.addEventListener("click", (e) => {
            // Get the index of tr at the current state of myLibrary array
            let currentIndex = Array.from(tbody.children).indexOf(e.target.parentElement.parentElement);
            Library.myLibrary[currentIndex].deleteFromLibrary();
            trToDelete = e.target.parentElement.parentElement;
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
          readStatusBtn.addEventListener("click", (e) => {
            let currentIndex = Array.from(tbody.children).indexOf(e.target.parentElement.parentElement);
            if (e.target.classList.contains("book-read")) {
              e.target.classList.remove("book-read");
              e.target.classList.add("book-unread");
              Library.myLibrary[currentIndex]["readStatus"] = "unread";
            }
            else {
              e.target.classList.remove("book-unread");
              e.target.classList.add("book-read");
              Library.myLibrary[currentIndex]["readStatus"] = "read";
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


// Book class
class Book extends Library{
  constructor(author, title, numOfPages, readStatus) {
    super();
    this.author = author;
    this.title = title;
    this.numOfPages = numOfPages;
    this.readStatus = readStatus;
  }

  static addingNewBook = false;

  addToLibrary() {
    Library.myLibrary.push(this);
  }

  deleteFromLibrary() {
    let index = Library.myLibrary.indexOf(this);
    Library.myLibrary.splice(index, 1);
  }

  static newBook() {
    // Add new book using dialog box
    
    const newBookDialog = document.querySelector(".newBookDialog");
    newBookDialog.showModal();
    const closeDialog = document.querySelector("dialog .close-dialog");
    closeDialog.addEventListener("click", () => {
      newBookDialog.close();
    });

    const author = document.querySelector("#author");
    author.value = '';
    const title = document.querySelector("#title");
    title.value = '';
    const numOfPages = document.querySelector("#numOfPages")
    numOfPages.value = '';
    const readingStatus = document.querySelector("#readingStatus");
    readingStatus.value = '';

    const form = document.querySelector(".newBookForm");

    form.addEventListener("submit", () => {
      let myNewBook = new Book(author.value, title.value, numOfPages.value, readingStatus.value);
      myNewBook.addToLibrary();
      Book.addingNewBook = true;
      Library.displayAllBooks();
      console.log("form was submitted");
    });
  }
}

// Inititalize with some books already present in library
const book1 = new Book("author1", "title1", 234, "unread");
const book2 = new Book("author2", "title2", 489, "read"); 
const book3 = new Book("author3", "title3", 900, "unread");
book1.addToLibrary();
book2.addToLibrary();
book3.addToLibrary();

// When user wants to add new book
const addNewBtn = document.querySelector(".addNewBtn");
addNewBtn.addEventListener("click", () => Book.newBook());

Library.displayAllBooks();