import { createContext, useContext } from 'react';

import { useWeatherReducer } from './reducers';

const WeatherContext = createContext();
const { Provider } = WeatherContext;

const WeatherProvider = ({ value = [], ...props }) => {
	const [state, dispatch] = useWeatherReducer({
		// initial value of weather state
		currentWeather: null,
		uvIndex: null,
		forecast: null,
		savedSearches: [],
		error: null,
	});

	return <Provider value={[state, dispatch]} {...props} />;
};

const useWeatherContext = () => {
	return useContext(WeatherContext);
};

export { WeatherProvider, useWeatherContext };
