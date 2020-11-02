var date = moment().format("ll");
var searchHandler = document.querySelector("#search-form");
var searchBar = document.querySelector("#search-bar");
var responseContainer = document.querySelector("#current-result");
var deleteBtn = document.getElementById("dlt-btn");

// Current temperature variables
const cityTempDiv = document.createElement('div');
const cityDetailsDiv = document.createElement('div');
var cityNameEl = document.createElement("div");
var currentTempEl = document.createElement("div");
var humidityEl = document.createElement("div");
var windEl = document.createElement("div");
var uvIndexContainer = document.createElement("div");
var uvIndexEl = document.createElement("h4");
var uvValueDisplay = document.createElement("div");

// 5 day forecast variables
var forecastContainer = document.querySelector("#forecast-result");

var searchWrapperEl = document.querySelector("#search-wrapper");
var searchHistoryDiv = document.querySelector("#search-history");
var cityCount = 1;

// function to fetch weather api - city is received from searchEvent function as searchValue 
var weatherRequest = function (city) {
    if (!city) {
        return;
    };
    var weatherApi = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=c83c5006fffeb4aa44a34ffd6a27f135";
    // fetch the response
    fetch(weatherApi)
        .then(function (response) {
            if (!response || !response.ok) {
                throw new Error('There was an error');
            };
            return response.json();
        })
        .then(function (response) {
            // div to contain city name and current temperature
            cityTempDiv.classList = 'temp-div';
            responseContainer.appendChild(cityTempDiv);

            // div to contain other details - humidity, wind speed, UV index
            cityDetailsDiv.classList = 'detail-div';
            responseContainer.appendChild(cityDetailsDiv);

            // create element for the city name response   
            cityNameEl.innerHTML = "<h2 class='secondary-text'>Current Weather for <span class='font-weight-bold'>" + response.name
                + "</span></h2><br><img class='icon' src='http://openweathermap.org/img/w/" + response.weather[0].icon
                + ".png' alt=Current weather icon/><br><br><h2 class='font-weight-bold secondary-text'>" + date + "</h2><br>";
            cityTempDiv.appendChild(cityNameEl);

            // create element to display the current temperature
            currentTempEl.innerHTML = "<h3 class='secondary-text'>Current Temperature:<span class='font-weight-bold'>" + " " + Math.round(response.main.temp) + "&#176F</span></h3><br>";
            cityTempDiv.appendChild(currentTempEl);

            // create element to display humidity
            humidityEl.innerHTML = "<h4 class='secondary-text'>Humidity:<span class='font-weight-bold'>" + " " + response.main.humidity + "%</span></h4>";
            cityDetailsDiv.appendChild(humidityEl);

            // create element to display wind speed
            windEl.innerHTML = "<h4 class='secondary-text'>Wind Speed:<span class='font-weight-bold'>" + " " + Math.round(response.wind.speed) + " MPH</span></h4>";
            cityDetailsDiv.appendChild(windEl);


            // fetch UV Index
            return fetch("https://api.openweathermap.org/data/2.5/uvi?appid=c83c5006fffeb4aa44a34ffd6a27f135&lat=" + response.coord.lat + "&lon=" + response.coord.lon);
        })
        .then(function (uvFetch) {
            return uvFetch.json();
        })
        .then(function (uvResponse) {
            // create div to contain UV index
            uvIndexContainer.setAttribute("id", "uv-value");
            uvIndexContainer.classList = "secondary-text uv-class";
            cityDetailsDiv.appendChild(uvIndexContainer);

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
                forecastEl.classList = "forecast-card card-body rounded-lg border-dark bg-info text-light";
                forecastContainer.appendChild(forecastEl);

                // display date 
                var dateDiv = document.createElement("div");
                dateDiv.classList = "secondary-text card-title";
                var forecastDate = moment.utc(forecastResponse.daily[i].dt * 1000).format("dddd, MMM DD");
                dateDiv.innerHTML = "<h5 class='font-weight-bold'>" + forecastDate + "</h5>";
                forecastEl.appendChild(dateDiv);

                // weather icon
                var iconDiv = document.createElement("div");
                iconDiv.innerHTML = "<img src='http://openweathermap.org/img/w/" + forecastResponse.daily[i].weather[0].icon + ".png' class='forecast-icon' alt=Current weather icon/>";
                forecastEl.appendChild(iconDiv);

                // display day temperature forecast
                var tempDiv = document.createElement("div");
                tempDiv.classList = "card-text secondary-text";
                tempDiv.innerHTML = "<h6>Day Temp:<span>" + " " + Math.round(forecastResponse.daily[i].temp.day) + "&#176F</span></h6>" + "<h6>Night Temp:<span>" + " " + Math.round(forecastResponse.daily[i].temp.night) + " &#176F</span></h6>";
                forecastEl.appendChild(tempDiv);

                // display humidity forecast
                var humidDiv = document.createElement("div");
                humidDiv.classList = "card-text secondary-text";
                humidDiv.innerHTML = "<h6>Humidity:<span>" + " " + forecastResponse.daily[i].humidity + "%</span></h6>";
                forecastEl.appendChild(humidDiv);
            }
        })
        .catch(function (error) {
            removePrevious();
            alert(error.message);
            document.querySelector("#search-bar").value = "";
            return;
        });
};

var searchEvent = function (event) {
    event.preventDefault();
    // clicking search button submits value and calls weatherRequest function
    var searchValue = searchBar.value.trim().toUpperCase();

    if (searchValue) {
        // Correct way to implement is to catch any errors happening from weatherRequest and skip createBtn/storeHistory
        weatherRequest(searchValue);
        createBtn(searchValue);
        storeHistory();
        // document.querySelector("#search-bar").value = "";
    } else {

        //if search is empty, throw an alert. CHANGE TO A MODAL LATER
        alert("Please enter a city to see its current weather.");
    };
};

function createBtn(city) {
    // create btns
    var citySearch = document.createElement("button");
    citySearch.textContent = city;
    citySearch.classList = "btn btn-info btn-block";
    citySearch.setAttribute("data-city", city);
    citySearch.setAttribute("type", "submit");
    citySearch.setAttribute("id", "city-" + city);
    searchHistoryDiv.prepend(citySearch);
};

function clearHistory() {
    var searchedCities = JSON.parse(localStorage.getItem("searchedCities"));
    for (var i = 0; i < searchedCities.length; i++) {
        document.getElementById("city-" + searchedCities[i]).remove();
    }
    localStorage.clear("searchedCities");
};

function storeHistory() {
    // variables to store storage keys for if statements
    var userSearch = document.querySelector("#search-bar").value.trim().toUpperCase();

    if (!userSearch) {
        return;
    };

    var previousSearchCity = JSON.parse(localStorage.getItem("searchedCities")) || [];
    previousSearchCity.push(userSearch);
    localStorage.setItem("searchedCities", JSON.stringify(previousSearchCity));

    // clear search bar after clicking search button
    document.querySelector("#search-bar").value = "";

    // call function to remove previously searched weather
    removePrevious();
};

function loadHistory() {
    if (localStorage.getItem("searchedCities")) {
        var previousSearchCity = JSON.parse(localStorage.getItem("searchedCities"));
        for (var i = 0; i < previousSearchCity.length; i++) {
            createBtn(previousSearchCity[i]);
        }
    };


    for (i = 0; i < document.getElementsByClassName("btn").length; i++) {
        document.getElementsByClassName("btn")[i].addEventListener('click', function () {
            var btnClicked = this.getAttribute("data-city");
            weatherRequest(btnClicked);
            console.log(btnClicked);
            removePrevious();
        });
    }
};

// remove previously searched weather info
var removePrevious = function () {
    cityNameEl.remove();
    uvIndexContainer.remove();
    forecastContainer.innerHTML = "";
    currentTempEl.remove();
    humidityEl.remove();
    windEl.remove();
};

searchHandler.addEventListener("submit", searchEvent);
deleteBtn.addEventListener("click", clearHistory);

loadHistory();