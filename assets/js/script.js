var searchHandler = document.querySelector("#search-form");
var searchBar = document.querySelector("#search-bar");
var responseContainer = document.querySelector("#current-result");
var cityNameEl = document.createElement("span");

// Make function to get weather api
var weatherRequest = function (city) {
    var weatherApi = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=c83c5006fffeb4aa44a34ffd6a27f135";
    // fetch the response
    fetch(weatherApi)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            // log the fetch response
            console.log(response);
            // grab the id of the element the weather data will be displayed
            // create element for the weather response
            
            // set the element's attribute to the json data path
            // cityNameEl.setAttribute("src", response.name);
            cityNameEl.innerHTML = "<h2>" + response.name + "</h2>";
            console.log(response.name);
            // append the element to html
            responseContainer.appendChild(cityNameEl);

            // handle any errors
            // .catch(function(error) {
            //     console.log(error)
            //     alert("Something went wrong!")
            // });
        });
};

var searchEvent = function (event) {
    event.preventDefault();
    // clicking search button submits value and calls weatherRequest function
    var searchValue = searchBar.value.trim();
    if (searchValue) {
        console.log(searchValue);
        weatherRequest(searchValue);
    } else {
        //if search is empty, throw an alert. CHANGE TO A MODAL LATER
        alert("Please enter a city to see its current weather.");
    }

    // clear search bar after clicking search button
    document.querySelector("#search-bar").value = "";
    // call function to remove previously searched weather
    removePrevious();
};

// remove previously searched weather info
var removePrevious = function() {
    cityNameEl.remove();
    
};

searchHandler.addEventListener("submit", searchEvent);

// weatherRequest();