var date = moment().format("ll");
var searchHandler = document.querySelector("#search-form");
var searchBar = document.querySelector("#search-bar");
var responseContainer = document.querySelector("#current-result");
var cityNameEl = document.createElement("span");

// Current temperature variables
var currentTempEl = document.createElement("span");
var humidityEl = document.createElement("span");
var windEl = document.createElement("span");
var uvIndexContainer = document.createElement("div");
var uvIndexEl = document.createElement("h4");
var uvValueDisplay = document.createElement("span");

// 5 day forecast variables
var forecastContainer = document.querySelector("#forecast-result");

var searchWrapperEl = document.querySelector("#search-wrapper")
var searchHistoryDiv = document.querySelector("#search-history");
var cityCount = 1;
// var citiesArray = [cityOne, cityTwo, cityThree, cityFour, cityFive]

// function to fetch weather api - city is received from searchEvent function as searchValue 
var weatherRequest = function (city) {
    var weatherApi = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=c83c5006fffeb4aa44a34ffd6a27f135";
    // fetch the response
    fetch(weatherApi)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            // log the fetch response
            // console.log(response);

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
            return fetch("https://api.openweathermap.org/data/2.5/uvi?appid=c83c5006fffeb4aa44a34ffd6a27f135&lat=" + response.coord.lat + "&lon=" + response.coord.lon);
        })
        .then(function (uvFetch) {
            return uvFetch.json();
        })
        .then(function (uvResponse) {
            // create div to contain UV index
            uvIndexContainer.setAttribute("id", "uv-value");
            uvIndexContainer.classList = "card-body uv-class";
            responseContainer.appendChild(uvIndexContainer);

            // set uvValue
            var uvValue = uvResponse.value;
            uvIndexEl.innerHTML = "UV Index: ";

            uvValueDisplay.setAttribute("id", "uv-index");
            uvValueDisplay.innerHTML = uvValue;
            uvIndexContainer.appendChild(uvIndexEl);
            uvIndexContainer.appendChild(uvValueDisplay);

            if (uvResponse.value > 7) {
                document.querySelector("#uv-index").classList = "uv-result rounded bg-danger";
            } else if (uvResponse.value >= 2 && uvResponse.value <= 7) {
                document.querySelector("#uv-index").classList = "uv-result rounded bg-warning";
            } else if (uvResponse.value <= 2) {
                document.querySelector("#uv-index").classList = "uv-result rounded bg-success";
            }

            return fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + uvResponse.lat + "&lon=" + uvResponse.lon + "&appid=c83c5006fffeb4aa44a34ffd6a27f135&units=imperial");
        })
        .then(function (forecastResponse) {
            return forecastResponse.json();
        })
        .then(function (forecastResponse) {
            // for loop to display 5 day forecast
            for (var i = 1; i < 6; i++) {
                var forecastEl = document.createElement("div");
                forecastEl.classList = "margin card-body rounded-lg border-dark bg-info";
                forecastContainer.appendChild(forecastEl);

                // display date 
                var dateDiv = document.createElement("div");
                dateDiv.classList = "card-title";
                var forecastDate = moment.utc(forecastResponse.daily[i].dt * 1000).format("dddd, MMM DD");
                dateDiv.innerHTML = "<h5>" + forecastDate + "</h5>";
                forecastEl.appendChild(dateDiv);

                // weather icon
                var iconDiv = document.createElement("div");
                iconDiv.innerHTML = "<img src='http://openweathermap.org/img/w/" + forecastResponse.daily[i].weather[0].icon + ".png' alt=Current weather icon/>";
                forecastEl.appendChild(iconDiv);

                // display day temperature forecast
                var tempDiv = document.createElement("div");
                tempDiv.classList = "card-text";
                tempDiv.innerHTML = "<h6>Day Temp: " + forecastResponse.daily[i].temp.day + "&#176F</h6>" + "<h6>Night Temp: " + forecastResponse.daily[i].temp.night + " &#176F</h6>";
                forecastEl.appendChild(tempDiv);

                // display humidity forecast
                var humidDiv = document.createElement("div");
                humidDiv.classList = "card-text";
                humidDiv.innerHTML = "<h6>Humidity: " + forecastResponse.daily[i].humidity + "%</h6>";
                forecastEl.appendChild(humidDiv);

            }
        })
};

// localstorage variables
// var searchValue = searchBar.value.trim().toUpperCase();

var searchEvent = function (event) {
    event.preventDefault();
    // clicking search button submits value and calls weatherRequest function
    var searchValue = searchBar.value.trim().toUpperCase();

    if (searchValue) {
        weatherRequest(searchValue);
    } else {
        //if search is empty, throw an alert. CHANGE TO A MODAL LATER
        alert("Please enter a city to see its current weather.");
    }

    storeHistory();
};

function storeHistory() {
    // variables to store storage keys for if statements
    var cityOne = localStorage.getItem("city-1");
    var cityTwo = localStorage.getItem("city-2");
    var cityThree = localStorage.getItem("city-3");
    var cityFour = localStorage.getItem("city-4");
    var cityFive = localStorage.getItem("city-5");

    // check if localstorage city-1 through city-5 exist
    if (cityOne === null || cityTwo === null || cityThree === null || cityFour === null || cityFive === null) {
        var searchValue = searchBar.value.trim().toUpperCase();
        var citySearch = document.createElement("button");
        console.log(searchValue);
        citySearch.textContent = searchValue;
        citySearch.classList = "btn btn-info btn-block";
        citySearch.setAttribute("data-city", searchValue);
        citySearch.setAttribute("type", "submit");
        citySearch.setAttribute("id", "city-" + cityCount++);
        searchHistoryDiv.prepend(citySearch);
        storageValue = citySearch.dataset.city;
        cityIdValue = citySearch.id;
        console.log("ID", cityIdValue);
        console.log("DATA", storageValue);
        localStorage.setItem(cityIdValue, storageValue);

        // if any exist/are true, set localStorage and call loadHistory function
    } else if (cityOne || cityTwo || cityThree || cityFour || cityFive) {
        var searchValue = searchBar.value.trim().toUpperCase();
        console.log(searchValue);
        var citySearch = document.createElement("button");
        citySearch.textContent = searchValue;
        citySearch.classList = "btn btn-info btn-block";
        citySearch.setAttribute("data-city", searchValue);
        citySearch.setAttribute("type", "submit");
        citySearch.setAttribute("id", "city-" + cityCount++);
        searchHistoryDiv.prepend(citySearch);
        storageValue = citySearch.dataset.city;
        cityIdValue = citySearch.id;
        console.log("ID", cityIdValue);
        console.log("DATA", storageValue);
        localStorage.setItem(cityIdValue, storageValue);

        loadHistory();
    }

    // clear search bar after clicking search button
    document.querySelector("#search-bar").value = "";

    // call function to remove previously searched weather
    removePrevious();
};


function loadHistory() {
    var cityOne = localStorage.getItem("city-1");
    var cityTwo = localStorage.getItem("city-2");
    var cityThree = localStorage.getItem("city-3");
    var cityFour = localStorage.getItem("city-4");
    var cityFive = localStorage.getItem("city-5");
    var citiesArray = [cityOne, cityTwo, cityThree, cityFour, cityFive];

    for (var i = 0; i < citiesArray.length; i++) {
        // create buttons using localstorage values
        if (citiesArray[i] === null) {
        
            var citySearch = document.createElement("button");
            citySearch.textContent = localStorage.getItem("city-" + [i]);
            citySearch.classList = "btn btn-info btn-block";
            citySearch.setAttribute("data-city", [i]);
            citySearch.setAttribute("type", "submit");
            citySearch.setAttribute("id", "city-" + [i]);
            searchHistoryDiv.prepend(citySearch);
        } else if (cityOne === null || cityTwo === null || cityThree === null || cityFour === null || cityFive === null) {
            return;
        }
    }
};

// remove previously searched weather info
var removePrevious = function () {
    cityNameEl.remove();
    uvIndexContainer.remove();
    // forecastContainer.remove();
};

searchHandler.addEventListener("submit", searchEvent);

loadHistory();