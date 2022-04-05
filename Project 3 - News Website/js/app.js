// Website: https://newsapi.org/s/india-news-api
// Email: noqubina@labworld.org
// Password: bekGkZh%e^BUJ9q#

// Function to send API request and populate the response on the page
function populateNews(apiURL) {
    // Grab the news container
    let newsCard = document.getElementById("newsCard");
  
    // Create a AJAX GET request
    const xhr = new XMLHttpRequest();
  
    xhr.open("GET", apiURL, true); // Please un-comment
  
    xhr.onload = function () {
      if (this.status === 200) {
        let newsObject = JSON.parse(this.responseText);
  
        let newsStr = "";
        for (const key in newsObject.articles) {
          newsStr += `<p>
                          <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#newsCard${key}" aria-expanded="false"aria-controls="newsCard${key}">
                          ${newsObject.articles[key].title}
                          </button>
                      </p>
  
                      <div class="collapse" id="newsCard${key}">
                          <div class="card border-dark text-dark bg-light mb-3">
                          <div class="card-header">By ${newsObject.articles[key].source.name}</div>
                              <div class="card-body">
                                  <p class="card-text">${newsObject.articles[key].description}</p>
                                  <a href="${newsObject.articles[key].url}" target="_blank" class="btn btn-outline-primary btn-sm">Read more</a>
                              </div>
                          </div>
                      </div>
                      <hr>`;
  
          document.getElementById("news").innerHTML = newsStr;
        }
      } else {
        console.error("An error occured");
      }
    };
  
    xhr.send();
  }

// It's a good practice to store API key and other parameters inside a variable
const country = "in";
const apiKey = "95a1932962814593a37f42c357e22595";
let apiURL = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`;
populateNews(apiURL);

// Adding filter
const categoryBtn = document.querySelectorAll('input[name="type"]');

categoryBtn.forEach(element => {
    element.addEventListener("click", () => {
        if (element.value === "all") {
          apiURL = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`;
          populateNews(apiURL);
        } else {
          apiURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${element.value}&apiKey=${apiKey}`;
          populateNews(apiURL);
        }
      });
});

