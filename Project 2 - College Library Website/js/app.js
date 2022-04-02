console.log("This script is written using the concept of prototype");

// Constructor to create book objects
function Book(name, author, type) {
  this.name = name;
  this.author = author;
  this.type = type;
}

// Display constructor
function Display() {}

// Add methods to display prototypes
Display.prototype.add = function(book){
  let tableBody = document.getElementById("tableBody");
  let uiString = `<tr>
                    <td>${book.name}</td>
                    <td>${book.author}</td>
                    <td>${book.type}</td>
                  </tr>`;
  
  tableBody.innerHTML += uiString;
}

// Implementing clear function
Display.prototype.clear = function(){
  let libraryForm = document.getElementById("libraryForm");
  libraryForm.reset(); // Will clear the fields of form
}

// Implementing validate function
Display.prototype.validate = function(book){
  if(book.name.length < 2 || book.author.length < 2){
    return false;
  }else{
    return true;
  }
}

// Implementing show function
Display.prototype.show = function(type, displayMessage){
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
}

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

  let book = new Book(name, author, type); // Create an object using "Book" constructor

  let display = new Display(); // Create an object using "Display" constructor
  if(display.validate(book)){
    display.add(book); // Add the book
    display.clear(); // Clear the form
    display.show("success", "Your book is successfully added");
  }else{
    // Show error to the user
    display.show("danger", "Sorry You cannot add this book");
  }
  
  e.preventDefault(); // The page will not reload while submitting
});
