
// Make function to get weather api
var weatherRequest = function(city) {
    var weatherApi =  "https://api.openweathermap.org/data/2.5/weather?q=" + "philadelphia" + "&appid=c83c5006fffeb4aa44a34ffd6a27f135";
    // fetch the response
    fetch(weatherApi)
    .then(function(response) {
        return response.json();
    })
    // grab the id of the element the weather data will be displayed
    .then(function(response) {
        console.log(response);
    
        var responseContainer = document.querySelector("current-result");
        // create element for the weather response
        var weatherImg = document.createElement("img");
        // set the element's attribute to the json data path
        // weatherImg.setAttribute("src", response.???);

        // append the element to html
        responseContainer.appendChild(weatherImg);

    })
    // handle any errors
    .catch(function(error) {
        console.log(error)
        alert("Something went wrong!")
    });
};

weatherRequest();