// Fetch the current weather
const getCurrentWeather = searchTerm => {
	return fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=imperial&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
	);
};

// Fetch the UV index
const getUVIndex = (lat, lon) => {
	return fetch(
		`https://api.openweathermap.org/data/2.5/uvi?appid=${process.env.REACT_APP_WEATHER_API_KEY}&lat=${lat}&lon=${lon}`
	);
};

// Fetch the 5-day forecast
const getForecast = (lat, lon) => {
	return fetch(
		`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=imperial`
	);
};

export { getForecast, getUVIndex, getCurrentWeather };
