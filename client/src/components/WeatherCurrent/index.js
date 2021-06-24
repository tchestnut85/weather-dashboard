import React from 'react';
import { WeatherUV } from '../WeatherUV';
import { useWeatherContext } from '../../utils/context/WeatherState';

export const WeatherCurrent = () => {
	const [currentState, dispatch] = useWeatherContext();
	const { currentWeather } = currentState;

	// TODO - install dayjs to format the date given with the weather data
	const date = new Date();
	const dateFormatted = `${
		date.getMonth() + 1
	}/${date.getDate()}/${date.getFullYear()}`;

	return (
		<section id='result-wrapper' className='results col-lg-9 card'>
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
								<img
									className='icon'
									src={`http://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`}
									alt='Current weather icon'
								/>
								<br />
								<br />
								<h2 className='font-weight-bold secondary-text'>
									{dateFormatted}
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
		</section>
	);
};
