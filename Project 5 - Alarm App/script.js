console.log("Form Validation using Regular Expressions");

const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

// Flags to check if the data enter by the user is valid or not while submitting
let isHoursValid = false;
let isMinutesValid = false;
let isSecondsValid = false;

// Initialise audio object
let audio = new Audio('alarm.mp3');

// When we clickon the input box and again click outside of it, "blur" event will be triggered
hours.addEventListener("blur", () => {

    const regex = /(^[1-9]([0-9]*)$)|(^\s*$)|(^0+$)/; // Number should not start with 0 or can be an empty field or can contain one or more 0's
    let str = hours.value;

    if (regex.test(str)) {
        console.log("Hours is valid");
        hours.classList.remove("is-invalid");
        isHoursValid = true;
    } else {
        console.log("Hours is invalid");
        hours.classList.add("is-invalid");
        isHoursValid = false;
    }
});

minutes.addEventListener("blur", () => {

    const regex = /(^[1-9]([0-9]*)$)|(^\s*$)|(^0+$)/;
    let str = minutes.value;

    if (regex.test(str)) {
        console.log("Minutes is valid");
        minutes.classList.remove("is-invalid");
        isMinutesValid = true;
    } else {
        console.log("Minutes is invalid");
        minutes.classList.add("is-invalid");
        isMinutesValid = false;
    }
});

seconds.addEventListener("blur", () => {

    const regex = /(^[1-9]([0-9]*)$)|(^\s*$)|(^0+$)/;
    let str = seconds.value;
    // console.log(str.length);

    if (regex.test(str)) {
        console.log("Seconds is valid");
        seconds.classList.remove("is-invalid");
        isSecondsValid = true;
    } else {
        console.log("Seconds is invalid");
        seconds.classList.add("is-invalid");
        isSecondsValid = false;
    }
});

let playAlarmAudio = () => {
    audio.play();
    audio.loop = true; // Adudio will play in loop

    document.getElementById("stopBtn").style.display = "initial"; // Add default display value to the button
}

let stopAlarmAudio = () => {
    audio.pause(); // Pause the audio
    audio.load(); // Reset the audio object to start playing from starting
    document.getElementById("stopBtn").style.display = "none"; // Hides the entire button from DOM
}

// Stop button
document.getElementById("stopBtn").addEventListener("click", () => {
    stopAlarmAudio();
});

submitBtn.addEventListener("click", () => {

    const successAlert = `<div class="alert alert-success alert-dismissible fade show d-flex align-items-center" role="alert">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Success:">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.061.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                        </svg>
                        <div><strong>Success!</strong> Your alarm has been set</div>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>`;

    const dangerAlert = `<div class="alert alert-danger alert-dismissible fade show d-flex align-items-center" role="alert">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Danger:">
                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                        </svg>
                        <div><strong>Error!</strong> One of your hours, minutes or seconds is not valid. Please correct the errors and try again</div>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>`;

    let timeInMiliseconds = 0; // Set the initial value to 0

    // Meaning of below if statement: Number should not start with 0 or can be an empty field or can contain one or more 0's and also atleast one field should be filled with a value which is true
    if ((isHoursValid || isMinutesValid || isSecondsValid) && (Number(hours.value) || Number(minutes.value) || Number(seconds.value))) {
        formAlert.innerHTML = successAlert;

        let hoursValue = Number(hours.value); // "hours" inside the if statement has local scope so we can use the same same
        let minutesValue = Number(minutes.value);
        let secondsValue = Number(seconds.value);

        // converting all values into miliseconds to run the setTimeout function
        timeInMiliseconds += (hoursValue !== 0) ? hoursValueV * 60 * 60 * 1000 : 0; // If the "hours" is not equals 0 then convert it into miliseconds else set the value 0 and add in "timeInMiliseconds" variable
        timeInMiliseconds += (minutesValue !== 0) ? minutesValue * 60 * 1000 : 0;
        timeInMiliseconds += (secondsValue !== 0) ? secondsValue * 1000 : 0;

        document.getElementById("alarmForm").reset();

        setTimeout(() => {
            formAlert.innerHTML = ""; // After 5 second, the the alert will be removed
        }, 5000);

        if (timeInMiliseconds !== 0) {
            setTimeout(() => {
                playAlarmAudio(); // To play the audio in loop and set display property of stop button to default
            }, timeInMiliseconds);
        }

    } else {
        formAlert.innerHTML = dangerAlert;

        setTimeout(() => {
            formAlert.innerHTML = "";
        }, 5000);
    }

});