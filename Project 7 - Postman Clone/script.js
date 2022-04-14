// Initialise variables
let parametersRadio = document.getElementById("parametersRadio");
let jsonRadio = document.getElementById("jsonRadio");
let parameterBox = document.getElementById("parameterBox");
let jsonRequestBox = document.getElementById("jsonRequestBox");
let parameters = document.getElementById("parameters");
let addParameter = document.getElementById("addParameter");

let addedParameterCount = 0;

// Hide the parameter box initially
parameterBox.style.display = "none";

// If the user clicks on parameter box, hide the JSON box
parametersRadio.addEventListener("click", () => {
    jsonRequestBox.style.display = "none";
    parameterBox.style.display = ""; // Set it to a empty string as it is breaking the format
});

// If the user clicks on JSON box, hide the parameter box
jsonRadio.addEventListener("click", () => {
    parameterBox.style.display = "none";
    jsonRequestBox.style.display = "";
});

// If the user clicks on "Add" button, add more parameters
addParameter.addEventListener("click", () => {
    let str = "";
    str = `<div class="row align-items-center">
                <div class="col-sm-2 mb-4">
                    Parameter ${addedParameterCount + 2}
                </div>
                <div class="col-sm-10 mb-4">
                    <div class="row">
                        <div class="col">
                            <input type="text" id="parameterkey${addedParameterCount + 2}" class="form-control" placeholder="Enter Parameter ${addedParameterCount + 2} key" aria-label="Enter Parameter ${addedParameterCount + 2} key">
                        </div>
                        <div class="col">
                            <input type="text" id="parameterValue${addedParameterCount + 2}" class="form-control" placeholder="Enter Parameter ${addedParameterCount + 2} value" aria-label="Enter Parameter ${addedParameterCount + 2} value">
                        </div>
                        <div class="col">
                            <button type="button" class="btn btn-primary deleteParameter">Delete</button>
                        </div>
                    </div>
                </div>
            </div>`;

    parameters.innerHTML += str;

    // Add an event listener to remove the parameter on clicking (Button)
    let deleteParameter = document.getElementsByClassName("deleteParameter");
    for (const item of deleteParameter) {
        item.addEventListener("click", (e) => {
            if(confirm("Are you sure you want to delete this parameter?") === true){
                e.target.parentElement.parentElement.parentElement.parentElement.remove(); // Deleting the parent element which contains parameters
            }
        });
    }

    addedParameterCount++; // Increase by 1 in every click
});

// If the user clicks on submit button
let submit = document.getElementById("submit");
submit.addEventListener("click", () => {
    // Show: Please wait in the response box to request patience from the user
    document.getElementById("responsePrism").innerHTML = "Please wait... Fetching response...";

    // Fetch all the values user has entered
    let urlField = document.getElementById("urlField").value;
    let requestType = document.querySelector(`input[name="requestType"]:checked`).value; // Get the value of checked element with id="requestType"
    let contentType = document.querySelector(`input[name="contentType"]:checked`).value;

    // If user use "Custom parameters" option instead of "JSON", collect all the parameters in an object
    if(contentType == "parameters"){
        data = {};

        // i<addedParameterCount+1 is used because we want to run the loop atleast 1 time if no parameters were added 
        for(i=0; i<addedParameterCount+1; i++){
            // Check if a parameter is undefied
            if(document.getElementById("parameterkey" + (i+1)) != undefined){
                let key = document.getElementById("parameterkey" + (i+1)).value;
                let value = document.getElementById("parameterValue" + (i+1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data); // Convert into JSON string after for loop exit
    } else {
        data = document.getElementById("jsonRequestText").value;
    }

    // Log all the values in the console for debugging
    console.log("URL : ", urlField);
    console.log("requestType : ", requestType);
    console.log("contentType : ", contentType);
    console.log("data : ", data);

    // If the request type is POST, invoke fetch API to create a post request
    if(requestType == "GET"){
        fetch(urlField, {
            method: "GET"
        })
        .then(response => response.text())
        .then((text) => {
            document.getElementById("responsePrism").innerHTML = text;
            Prism.highlightAll(); // Highlight the JSON with colors
        })
    } else {
        fetch(urlField, {
            method: "POST",
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then(response => response.text())
        .then((text) => {
            document.getElementById("responsePrism").innerHTML = text;
            Prism.highlightAll();
        })
    }
});