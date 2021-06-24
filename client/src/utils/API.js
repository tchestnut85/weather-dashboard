// Fetch the current weather
export const getCurrentWeather = searchTerm => {
	return fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=imperial&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
	);
};

// Fetch the UV index

// Fetch the 5-day forecast
