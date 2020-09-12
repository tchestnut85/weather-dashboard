var date = moment().format("ll");
var searchHandler = document.querySelector("#search-form");
var searchBar = document.querySelector("#search-bar");
var responseContainer = document.querySelector("#current-result");
var cityNameEl = document.createElement("span");
var currentTempEl = document.createElement("span");
var humidityEl = document.createElement("span");
var windEl = document.createElement("span");
var uvIndexEl = document.createElement("span");


// function to fetch weather api - city is received from searchEvent function as searchValue 
var weatherRequest = function(city) {
    var weatherApi = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=c83c5006fffeb4aa44a34ffd6a27f135";
    // fetch the response
    fetch(weatherApi)
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        // log the fetch response
        console.log(response);
        
        // create element for the city name response   
            cityNameEl.innerHTML = "<h2>" + response.name + " (" + date + ") " + "<img class='icon' src='http://openweathermap.org/img/w/" + response.weather[0].icon + ".png' alt=Current weather icon/></h2>";
            // console.log(response.name + " " + response.timezone);
            responseContainer.appendChild(cityNameEl);

            // create element to display the current temperature
            currentTempEl.innerHTML = "<h3>Current Temperature: " + response.main.temp + " &#176F</h3>";
            responseContainer.appendChild(currentTempEl);

            // create element to display humidity
            humidityEl.innerHTML = "<h4>Humidity: " + response.main.humidity + "%</h4>";
            responseContainer.appendChild(humidityEl);

            // create element to display wind speed
            windEl.innerHTML = "<h4>Wind Speed: " + response.wind.speed + "MPH</h4>";
            responseContainer.appendChild(windEl);   

            // fetch UV Index
            return fetch("http://api.openweathermap.org/data/2.5/uvi?appid=c83c5006fffeb4aa44a34ffd6a27f135&lat=" + response.coord.lat + "&lon=" + response.coord.lon);
        })
        .then(function(uvFetch) {
            return uvFetch.json();
        })
        .then(function(uvResponse) {
            // display UV index
            uvIndexEl.innerHTML = "<h4>UV Index: " + uvResponse.value + "</h4>";
            responseContainer.appendChild(uvIndexEl);
            console.log(uvResponse);
            console.log(uvResponse.value);
        
            if (uvResponse.value <= 2) {
                uvIndexEl.addClass("btn-success");
            } else if (uvResponse.value === 3 || uvResponse.value === 4 || uvResponse.value === 5) {
                uvIndexEl.addClass("btn-warning");
            } else if (uvResponse.value >= 6) {
                uvIndexEl.addClass("btn-danger");
            }
        })
        // handle any errors
        .catch(function(error) {
            console.log(error);
            alert("Something went wrong!")
        });
    };

var searchEvent = function(event) {
    event.preventDefault();
    // clicking search button submits value and calls weatherRequest function
    var searchValue = searchBar.value.trim();
    if (searchValue) {
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