var date = moment().format("ll");
var searchHandler = document.querySelector("#search-form");
var searchBar = document.querySelector("#search-bar");
var responseContainer = document.querySelector("#current-result");
var cityNameEl = document.createElement("span");

// Current temperature variables
var currentTempEl = document.createElement("span");
var humidityEl = document.createElement("span");
var windEl = document.createElement("span");
var uvIndexEl = document.createElement("h4");
var uvValueDisplay = document.createElement("span");

// 5 day forecast variables
var forecastContainer = document.querySelector("#forecast-result");
// var forecastEl = document.createElement("div");


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
            var uvIndexContainer = document.createElement("div");
            uvIndexContainer.setAttribute("id", "uv-value");
            uvIndexContainer.classList = "card-text uv-class";
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
            } else if (uvResponse.value >= 3 && uvResponse.value <= 7) {
                document.querySelector("#uv-index").classList = "uv-result rounded bg-warning";
            } else if (uvResponse.value <= 2) {
                document.querySelector("#uv-index").classList = "uv-result rounded bg-success";
            }

            return fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + uvResponse.lat + "&lon=" + uvResponse.lon + "&appid=c83c5006fffeb4aa44a34ffd6a27f135&units=imperial");
        })
        .then(function(forecastResponse) {
            return forecastResponse.json();
        })
        .then(function (forecastResponse) {
            // log the fetch response
            console.log("forecast test", forecastResponse);

            // for loop to display 5 day forecast
            for (var i = 1; i < 6; i++) {
            var forecastEl = document.createElement("div");
            forecastEl.classList = "card-body rounded-lg border-dark bg-info";
            forecastContainer.appendChild(forecastEl);

            // display date 
            var dateDiv = document.createElement("div");
            dateDiv.classList = "card-title";
            var forecastDate = moment.utc(forecastResponse.daily[i].dt * 1000).format("MM/DD/YYYY");
            console.log(forecastDate);
            dateDiv.innerHTML = "<h5>" + forecastDate + "</h5>";
            forecastEl.appendChild(dateDiv);

            // weather icon
            var iconDiv = document.createElement("div");
            iconDiv.innerHTML = "<img src='http://openweathermap.org/img/w/" + forecastResponse.daily[i].weather[0].icon  + ".png' alt=Current weather icon/>";
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
            
            // removed (moment().format("ll")) from dateDiv.innerHTML

            // use a for loop to display arrays 0-4 and get required data to append to forecastEl div
            // need to make a card div loop
            // for (var i = 1; i < 6; i++) {
            // // forecast date
            // var forecastEl = document.createElement("div");
            // forecastEl.classList = "card-body rounded-lg border-dark bg-info"
            // forecastContainer.appendChild(forecastEl);

            // var dateDiv = document.createElement("div");
            // dateDiv.classList = "card-title";
            // dateDiv.innerHTML = "<h5>" + response.list[i].dt_txt + "</h5>";
            // forecastEl.appendChild(dateDiv);
            // // removed (moment().format("ll")) from dateDiv.innerHTML

            // // weather icon
            // var iconDiv = document.createElement("div");
            // iconDiv.innerHTML = "<img src='http://openweathermap.org/img/w/" 
            // + response.list[i].weather[0].icon + ".png' alt=Weather forecast icon/>";
            // forecastEl.appendChild(iconDiv);

            // // display temperature forecast
            // var tempDiv = document.createElement("div");
            // tempDiv.classList = "card-text";
            // tempDiv.innerHTML = "<h5>Temp: " + response.list[1].main.humidity + "&#176F</h5>";
            // forecastEl.appendChild(tempDiv);

            // // Humidity: %
            // var humidDiv = document.createElement("div");
            // humidDiv.classList = "card-text";
            // humidDiv.innerHTML = "<h5>Humidity: " + response.list[1].main.temp + "%</h5>";
            // forecastEl.appendChild(humidDiv);

            // };

        })
};

var searchEvent = function (event) {
    event.preventDefault();
    // clicking search button submits value and calls weatherRequest function
    var searchValue = searchBar.value.trim();

    
    if (searchValue) {
        weatherRequest(searchValue);
        // forecastRequest(searchValue);
    } else {
        //if search is empty, throw an alert. CHANGE TO A MODAL LATER
        alert("Please enter a city to see its current weather.");
    }

    // save searched city to localStorage


    // clear search bar after clicking search button
    document.querySelector("#search-bar").value = "";
    // call function to remove previously searched weather
    removePrevious();
};

// remove previously searched weather info
var removePrevious = function () {
    cityNameEl.remove();
    uvValueDisplay.remove();
};

searchHandler.addEventListener("submit", searchEvent);