var searchButton = document.querySelector("#search-button");
var searchBar = document.querySelector("#search-bar");
var searchValue = searchBar.value;
console.log(searchValue);


// Make function to get weather api
var weatherRequest = function(city) {
    var weatherApi =  "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=c83c5006fffeb4aa44a34ffd6a27f135";
    // fetch the response
    fetch(weatherApi)
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        // log the fetch response
        console.log(response);
        // grab the id of the element the weather data will be displayed
        var responseContainer = document.querySelector("#current-result");
        // create element for the weather response
        var cityName = document.createElement("span");
        // set the element's attribute to the json data path
        cityName.setAttribute("src", response.name);
        console.log(cityName);
        // append the element to html
        responseContainer.appendChild(cityName);
        
        // handle any errors
        // .catch(function(error) {
        //     console.log(error)
        //     alert("Something went wrong!")
        // });
    });  
};

var searchEvent = function() {
    // clicking search button submits value and calls weatherRequest function
    console.log("test");
    // event.target.querySelector("#search-button");
    weatherRequest();
};

searchButton.addEventListener("click", searchEvent);

// weatherRequest();