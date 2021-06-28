const getSavedSearches = () => {
	const savedCities = JSON.parse(localStorage.getItem('saved_cities')) || [];
	return savedCities;
};

const saveSearch = (storageState, searchTerm) => {
	const savedCities = JSON.parse(localStorage.getItem('saved_cities')) || [];

	savedCities.length
		? localStorage.setItem(
				'saved_cities',
				JSON.stringify([searchTerm, ...storageState])
		  )
		: localStorage.setItem('saved_cities', JSON.stringify([searchTerm]));
};

const clearSearch = () => {
	localStorage.removeItem('saved_cities');
};

export { getSavedSearches, saveSearch, clearSearch };
