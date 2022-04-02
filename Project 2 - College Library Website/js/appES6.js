console.log("This script is written using the ES6 classes");

let showBooks = () => {
  let books = localStorage.getItem("books");

  if (books == null) {
    booksListArray = []; // If nothing stored in the local storage then create an empty array
  } else {
    booksListArray = JSON.parse(books); // If anything is stored in the local storage then convert it into an array
  }

  let uiString = "";

  booksListArray.forEach((element, index) => {
    uiString += `<tr>
                    <th scope="row">${index + 1}</th>
                    <td>${element.name}</td>
                    <td>${element.author}</td>
                    <td>${element.type}</td>
                    <td><button type="button" class="btn btn-danger" onclick="deleteBook(${index})">Delete</button></td>
                  </tr>`;
  });

  let tableBody = document.getElementById("tableBody");
  tableBody.innerHTML += uiString;

  if (booksListArray.length != 0) {
    tableBody.innerHTML = uiString; // If the "notesObj" array is not empty then add the "html" string inside the "notesElement" container
  } else {
    tableBody.innerText =
      'Nothing to show! Use "Add book" section above to add books'; // If the "notesObj" array is empty then show this string
  }
};

showBooks();

class Book {
  // Constructor to create book objects
  constructor(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
  }
}

// Implementing clear function
let clear = () => {
  let libraryForm = document.getElementById("libraryForm");
  libraryForm.reset(); // Will clear the fields of form
};

// Implementing validate function
let validate = (book) => {
  if (
    book.name.length < 2 ||
    book.author.length < 2 ||
    book.type === undefined
  ) {
    return false;
  } else {
    return true;
  }
};

// Implementing show function
let show = (type, displayMessage) => {
  let alertMessage = document.getElementById("alertMessage");

  let boldText;

  if (type === "success") {
    boldText = "Success";
  } else {
    boldText = "Error";
  }

  alertMessage.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${boldText}!</strong> ${displayMessage}
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                              </div>`;
  setTimeout(() => {
    alertMessage.innerHTML = ``; // Ater 5 sec, set the innter HTML to blank string
  }, 5000);
};

// Implementing deleteBook function
let deleteBook = (index) => {
  console.log("I am deleting", index);

  let books = localStorage.getItem("books");

  let booksListArray = JSON.parse(books);
  booksListArray.splice(index, 1);
  localStorage.setItem("books", JSON.stringify(booksListArray));

  showBooks();
};

// Add submit event listener to libraryForm
let libraryForm = document.getElementById("libraryForm");

libraryForm.addEventListener("submit", (e) => {
  // Getting value from the input box
  let name = document.getElementById("bookName").value;
  let author = document.getElementById("author").value;

  // Getting value from the radio buttons
  let action = document.getElementById("action");
  let computer = document.getElementById("computer");
  let mystery = document.getElementById("mystery");

  let type; // To store value from the checked radio buttons

  // If any of the three button is ckecked, store the value inside "type"
  if (action.checked) {
    type = action.value;
  } else if (computer.checked) {
    type = computer.value;
  } else if (mystery.checked) {
    type = mystery.value;
  }

  let books = localStorage.getItem("books");

  if (books == null) {
    booksListArray = []; // If nothing stored in the local storage then create an empty array
  } else {
    booksListArray = JSON.parse(books); // If anything is stored in the local storage then convert it into an array
  }

  let book = new Book(name, author, type); // Create an object using "Book" class

  if (validate(book)) {
    booksListArray.push(book);
    localStorage.setItem("books", JSON.stringify(booksListArray));
    showBooks(); // Add the book
    clear(); // Clear the form
    show("success", "Your book is successfully added");
  } else {
    // Show error to the user
    show("danger", "Sorry You cannot add this book");
  }

  e.preventDefault(); // The page will not reload while submitting
});
