const form = document.querySelector(".newBookForm");
const author = document.querySelector("#author");
const title = document.querySelector("#title");
const numOfPages = document.querySelector("#numOfPages");
const readingStatus = document.querySelector("#readingStatus");
const submitBtn = document.querySelector(".submitBtn");
const newBookBtn = document.querySelector(".addNewBtn");

// Validate author
author.addEventListener("focusout", (event) => {
  valueMissingChecker(author);
});

title.addEventListener("focusout", (event) => {
  valueMissingChecker(title);
});

numOfPages.addEventListener("focusout", (event) => {
  valueMissingChecker(numOfPages);
});

readingStatus.addEventListener("focusout", (event) => {
  valueMissingChecker(readingStatus);
});

submitBtn.addEventListener("click", (event) => {
  if (valueMissingChecker(author)
    || valueMissingChecker(title)
    || valueMissingChecker(numOfPages)
    || valueMissingChecker(readingStatus)
  ) {
    event.preventDefault();
  }
});

newBookBtn.addEventListener("click", () => {
  errorRemover(author);
  errorRemover(title);
  errorRemover(numOfPages);
  errorRemover(readingStatus);
})

function valueMissingChecker(field) {
  errorField = document.querySelector(`#${field.id} + .error`);
  if (field.validity.valueMissing) {
    errorField.innerText = 'Required field';
    return true;
  } else {
    errorField.innerText = '';
    return false;
  }
}

function errorRemover(field) {
  errorField = document.querySelector(`#${field.id} + .error`);
  errorField.innerText = '';
}
