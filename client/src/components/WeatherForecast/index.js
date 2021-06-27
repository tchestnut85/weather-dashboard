import {
	CLEAR_ERROR,
	SET_ERROR,
	SET_FORECAST,
} from '../../utils/context/actions';
import React, { useEffect } from 'react';
import { capitalizeWords, formatDate } from '../../utils/helpers';

import { getForecast } from '../../utils/API';
import { useWeatherContext } from '../../utils/context/WeatherState';

export const WeatherForecast = () => {
	const [currentState, dispatch] = useWeatherContext();
	console.log('currentState:', currentState);
	const { forecast } = currentState;
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
		if (currentState.currentWeather) getForecastData();
		// eslint-disable-next-line
	}, [currentState.currentWeather]);

	return (
		<section>
			<div id='forecast-wrapper' className='forecast-wrap card'>
				<div
					id='forecast-result'
					className='forecast-class card-body border-secondary'
				>
					{forecast &&
						forecast.daily
							.map(day => (
								<div
									className='forecast-card card-body rounded-lg border-dark bg-info text-light'
									key={day.dt}
								>
									<div className='secondary-text card-title'>
										<h5 className='font-weight-bold'>
											{formatDate(day.dt)}
										</h5>
									</div>
									<div>
										<figure>
											<img
												className='forecast-icon'
												src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`}
												alt={capitalizeWords(
													day.weather[0].description
												)}
											/>
											<figcaption className='secondary-text'>
												{capitalizeWords(
													day.weather[0].description
												)}
											</figcaption>
										</figure>
									</div>
									<div className='card-text secondary-text'>
										<h6>
											Low:{' '}
											<span>{`${Math.round(
												day.temp.min
											)}°F`}</span>
										</h6>
										<h6>
											High:{' '}
											<span>{`${Math.round(
												day.temp.max
											)}°F`}</span>
										</h6>
									</div>
									<div className='card-text secondary-text'>
										<h6>
											Humidity:{' '}
											<span>{`${Math.round(
												day.humidity
											)}%`}</span>
										</h6>
									</div>
								</div>
							))
							.filter((day, i) => i >= 1 && i <= 5)}
				</div>
			</div>
		</section>
	);
};
