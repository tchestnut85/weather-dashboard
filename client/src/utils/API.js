// Fetch the current weather
export const getCurrentWeather = searchTerm => {
	return fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=imperial&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
	);
};

// Fetch the UV index
export const getUVIndex = (lat, lon) => {
	return fetch(
		`https://api.openweathermap.org/data/2.5/uvi?appid=c83c5006fffeb4aa44a34ffd6a27f135&lat=${lat}&lon=${lon}`
	);
};

// Fetch the 5-day forecast
