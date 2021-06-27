import {
	CLEAR_ERROR,
	SET_ERROR,
	SET_FORECAST,
} from '../../utils/context/actions';
import React, { useEffect } from 'react';

import { getForecast } from '../../utils/API';
import { useWeatherContext } from '../../utils/context/WeatherState';

export const WeatherForecast = () => {
	const [currentState, dispatch] = useWeatherContext();
	console.log('forecast.js currentState:', currentState);
	const coords = currentState?.currentWeather?.coord;

	const handleError = message => {
		dispatch({ type: SET_ERROR, payload: message });
		setTimeout(() => {
			dispatch({ type: CLEAR_ERROR });
		}, 3000);
	};

	const getForecastData = async () => {
		try {
			const forecastResult = await getForecast(coords.lat, coords.lon);

			if (!forecastResult.ok) {
				handleError(
					`There was an error: ${forecastResult.statusText} (${forecastResult.status})`
				);

				throw Error(
					`There was an error: ${forecastResult.statusText} (${forecastResult.status})`
				);
			}

			const forecastData = await forecastResult.json();
			dispatch({ type: SET_FORECAST, payload: forecastData });
		} catch (err) {
			console.error(err);
		}
	};

	// Invote the getForecastData function when currentState updates
	useEffect(() => {
		getForecastData();
		// eslint-disable-next-line
	}, [currentState.currentWeather]);

	return (
		<section>
			<div id='forecast-wrapper' className='forecast-wrap card'>
				<div
					id='forecast-result'
					className='forecast-class card-body border-secondary'
				>
					{}
				</div>
			</div>
		</section>
	);
};
