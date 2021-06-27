import { capitalizeWords, formatDate } from '../../utils/helpers';

import React from 'react';
import { WeatherUV } from '../WeatherUV';
import { useWeatherContext } from '../../utils/context/WeatherState';

export const WeatherCurrent = () => {
	const [currentState] = useWeatherContext();
	const { currentWeather } = currentState;

	return (
		<>
			<div
				id='current-result'
				className='current-style card-body border-secondary'
			>
				{currentWeather && (
					<>
						<div className='temp-div'>
							<div>
								<h2 className='secondary-text'>
									Current Weather for{' '}
									<span className='font-weight-bold'>
										{currentWeather.name}
									</span>
								</h2>
								<br />
								<figure>
									<img
										className='icon'
										src={`http://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`}
										alt={`Current weather icon for ${currentWeather.weather[0].description}`}
									/>
									<figcaption className='secondary-text'>
										Current Condition:{' '}
										{capitalizeWords(
											currentWeather.weather[0]
												.description
										)}
									</figcaption>
								</figure>
								<br />
								<br />
								<h2 className='font-weight-bold secondary-text'>
									{formatDate(currentWeather.dt)}
								</h2>
								<br />
							</div>
							<h3 className='secondary-text'>
								Current Temperature:{' '}
								<span className='font-weight-bold'>
									{`${Math.round(
										currentWeather.main.temp
									)}°F`}
								</span>
							</h3>
							<br />
						</div>
						<div className='detail-div'>
							<div>
								<h4 className='secondary-text'>
									Low Temp:{' '}
									<span className='font-weight-bold'>{`${Math.round(
										currentWeather.main.temp_min
									)}°F`}</span>
								</h4>
							</div>
							<div>
								<h4 className='secondary-text'>
									High Temp:{' '}
									<span className='font-weight-bold'>{`${Math.round(
										currentWeather.main.temp_max
									)}°F`}</span>
								</h4>
							</div>
							<div>
								<h4 className='secondary-text'>
									Humidity:{' '}
									<span className='font-weight-bold'>
										{`${currentWeather.main.humidity}%`}
									</span>
								</h4>
							</div>
							<div>
								<h4 className='secondary-text'>
									Wind Speed:{' '}
									<span className='font-weight-bold'>
										{`${Math.round(
											currentWeather.wind.speed
										)} MPH`}
									</span>
								</h4>
							</div>
							<div>
								<WeatherUV
									lat={currentWeather.coord.lat}
									lon={currentWeather.coord.lon}
								/>
							</div>
						</div>
					</>
				)}
			</div>
			{/* Forecast Section here */}
		</>
	);
};
