console.log("Form Validation using Regular Expressions");

const username = document.getElementById("username");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const submitBtn = document.getElementById("submitBtn");
const formAlert = document.getElementById("formAlert");

// Flags to check if the data enter by the user is valid or not while submitting
let isUsernameValid = false;
let isPhoneValid = false;
let isEmailValid = false;

// When we clickon the input box and again click outside of it, "blur" event will be triggered
username.addEventListener("blur", () => {
    // Validate name here
    const regex = /^[a-z]([0-9a-z]){7,9}$/; // Test whether the string is composed of between 8 and 10 characters and must start with a to z letter and ends with 0 to 9 or a-z
    let str = username.value;

    if (regex.test(str)) {
        console.log("Username is valid");
        username.classList.remove("is-invalid");
        isUsernameValid = true;
    } else {
        console.log("Username is invalid");
        username.classList.add("is-invalid");
        isUsernameValid = false;
    }
});

phone.addEventListener("blur", () => {
    // Validate email here
    const regex = /^[0-9]{10}$/; // Test whether the string is composed of 10 characters and must start and end with 0 to 9
    let str = phone.value;

    if (regex.test(str)) {
        console.log("Phone is valid");
        phone.classList.remove("is-invalid");
        isPhoneValid = true;
    } else {
        console.log("Phone is invalid");
        phone.classList.add("is-invalid");
        isPhoneValid = false;
    }
});

email.addEventListener("blur", () => {
    // Validate email here
    const regex = /^[a-z][0-9a-z]*(@)[a-z]+(\.)[a-z]+$/; // Test whether the string starts with atleast one character along with zero or more character and digit after that "@" symbol along with one or more character after that "." along with one or more character
    let str = email.value;

    if (regex.test(str)) {
        console.log("Email is valid");
        email.classList.remove("is-invalid");
        isEmailValid = true;
    } else {
        console.log("Email is invalid");
        email.classList.add("is-invalid");
        isEmailValid = false;
    }
});

submitBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent page from reloading

    const successAlert = `<div class="alert alert-success alert-dismissible fade show d-flex align-items-center" role="alert">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Success:">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.061.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                        </svg>
                        <div><strong>Success!</strong> Your travel request has been successfully submitted</div>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>`;

    const dangerAlert = `<div class="alert alert-danger alert-dismissible fade show d-flex align-items-center" role="alert">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Danger:">
                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                        </svg>
                        <div><strong>Error!</strong> Your username, phone number or email is not valid. Please correct the errors and try again</div>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>`;

    if (isUsernameValid && isPhoneValid && isEmailValid) {
        formAlert.innerHTML = successAlert;

        setTimeout(() => {
            formAlert.innerHTML = ""; // After 5 second, the the alert will be removed
        }, 5000);
    } else {
        formAlert.innerHTML = dangerAlert;

        setTimeout(() => {
            formAlert.innerHTML = "";
        }, 5000);
    }

});
