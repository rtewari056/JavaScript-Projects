const getData = async () => {
    const response = await fetch("data.json"); // Suppose we are using an API to fetch some data
    const data = await response.json();
    return data;
}

const apiData = getData();

apiData.then((data) => {
    // CV iterator
    let cvIterator = (profiles) => {
        let nextIndex = 0;
        return {
            next: () => {
                // Using ternary operator
                return nextIndex < profiles.length ? { value: profiles[nextIndex++], done: false } : { done: true };
            }
        };
    }

    // Button listener for next button
    const candidates = cvIterator(data);

    let nextCV = () => {
        const currentCandidate = candidates.next().value;

        let image = document.getElementById("image");
        let profile = document.getElementById("profile");

        if(currentCandidate != undefined){
            image.innerHTML = `<img src="${currentCandidate.image}">`;
            profile.innerHTML = `<ul class="list-group">
                                <li class="list-group-item">${currentCandidate.name}</li>
                                <li class="list-group-item">${currentCandidate.age} years old</li>
                                <li class="list-group-item">Lives in${currentCandidate.city}</li>
                                <li class="list-group-item">Primarily works on ${currentCandidate.language}</li>
                                <li class="list-group-item">with ${currentCandidate.framework}</li>
                            </ul>`;
        }else{
            alert("End of candidate applications");
            window.location.reload(); // Reload the window
        }

        
    }

    nextCV();

    const next = document.getElementById("next");
    next.addEventListener("click", nextCV);
});

