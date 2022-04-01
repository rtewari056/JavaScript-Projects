console.log("This is notes taking app");

// Function to show elements from local storage
let showNotes = () => {
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = []; // If nothing stored in the local storage then create an empty array
  } else {
    notesObj = JSON.parse(notes); // If anything is stored in the local storage then convert it into an array
  }

  let html = ""; // Create an empty string to store HTML elements

  // Using loop to itereate over the "notesObj" array and insert each element of the array inside below HTML template 
  notesObj.forEach((element, index) => {
    html += `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">${element.text}</p>
                    <button class="btn btn-primary" onclick="deleteNote(${index})">Delete Note</button>
                </div>
              </div>`;
  });

  let notesElement = document.getElementById("notes"); // Targeting the id="notes" container 

  if (notesObj.length != 0) {
    notesElement.innerHTML = html; // If the "notesObj" array is not empty then add the "html" string inside the "notesElement" container
  } else {
    notesElement.innerText = "Nothing to show! Use \"Add a note\" section above to add notes"; // If the "notesObj" array is empty then show this string
  }
};

showNotes(); // Clalling the function to display notes after reopening the page

// If user adds a note, add it to the local storage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", (e) => {
  let addText = document.getElementById("addText"); // Targeting the textarea element
  let addTitle = document.getElementById("addTitle"); // Targeting the title element
  let notes = localStorage.getItem("notes"); // Getting the value from the local storage using "notes" key

  if (notes == null) {
    notesObj = []; // If nothing stored in the local storage then create an empty array
  } else {
    notesObj = JSON.parse(notes); // If anything is stored in the local storage then convert it into an array
  }

  // Creating object to store title and note both
  let myObj ={
    title: addTitle.value,
    text: addText.value
  }

  notesObj.push(myObj); // Push the value stored inside the textarea element into the array
  localStorage.setItem("notes", JSON.stringify(notesObj)); // Now update the local storage by converting the array into a string
  addTitle.value = ""; // After all the above operations, clear the title element
  addText.value = ""; // After all the above operations, clear the textarea element

//   console.log(notesObj); // Juct for debugging

  showNotes(); // Calling the function to show updated notes on the page
});

// Function to delete a note
let deleteNote = (index) => {
    // console.log("I am deleting", index); // Just for debugging
    let notes = localStorage.getItem("notes"); // Getting the value from the local storage using "notes" key
    if (notes == null) {
        notesObj = []; // If nothing stored in the local storage then create an empty array
    } else {
        notesObj = JSON.parse(notes); // If anything is stored in the local storage then convert it into an array
    }

    notesObj.splice(index, 1); // Will remove 1 element from index
    localStorage.setItem("notes", JSON.stringify(notesObj)); // Now we have to again update the local storage by converting the array into a string

    showNotes(); // Clalling the function again to display notes after removing element
};

// Searching notes
searchText = document.getElementById("searchText"); // Targeting the search box
searchText.addEventListener("input", () => {
    let inputValue = searchText.value; // Store the value of id="searchText" element inside "inputValue" variable
    // console.log("Input Event Fired", inputValue); // Just For debugging

    let noteCards = document.getElementsByClassName("noteCard"); // Get all the elements with class="noteCard"
    Array.from(noteCards).forEach((element) => {
        let cardText = element.getElementsByTagName("p")[0].innerText; // Getting the "p" tag of each element and setting the 0'th element of it else it will show an html collection

        if(cardText.includes(inputValue)){
            element.style.display = "block"; // Set style.display = "block" of the current element if it contains the text inside "inputValue"
        }else{
            element.style.display = "none"; // Else Set style.display = "none"
        }
        // console.log(cardText); // Just For debugging
    });
});
