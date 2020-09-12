var searchHandler = document.querySelector("#search-form");
var searchBar = document.querySelector("#search-bar");
var responseContainer = document.querySelector("#current-result");
var cityNameEl = document.createElement("span");
var currentTempEl = document.createElement("span");

// function to fetch weather api - city is received from searchEvent function as searchValue 
var weatherRequest = function(city) {
    var weatherApi = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=c83c5006fffeb4aa44a34ffd6a27f135";
    // fetch the response
    fetch(weatherApi)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            // log the fetch response
            console.log(response);

            // create element for the city name response   
            cityNameEl.innerHTML = "<h2>" + response.name + "</h2>";
            console.log(response.name);
            responseContainer.appendChild(cityNameEl);

            // create element to display the current temperature
            currentTempEl.innerHTML = "<h3>Current Temperature: " + response.main.temp + " &#176F</h3>";
            console.log(response.name);
            responseContainer.appendChild(currentTempEl);

            // handle any errors
            // .catch(function(error) {
            //     console.log(error)
            //     alert("Something went wrong!")
            // });
        });
};

var searchEvent = function(event) {
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