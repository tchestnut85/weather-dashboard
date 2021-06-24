import {
	CLEAR_CURRENT,
	CLEAR_ERROR,
	SET_CURRENT,
	SET_ERROR,
} from '../../utils/context/actions';
import React, { useState } from 'react';

import { Button } from '../Button';
import { getCurrentWeather } from '../../utils/API';
import { useWeatherContext } from '../../utils/context/WeatherState';

export const Search = () => {
	// TODO - implement localstorage setter and getter util functions
	const [currentState, dispatch] = useWeatherContext();

	const [searchInput, setSearchInput] = useState('');

	const handleError = message => {
		dispatch({ type: SET_ERROR, payload: message });
		setTimeout(() => {
			dispatch({ type: CLEAR_ERROR });
		}, 3000);
	};

	const handleChange = e => setSearchInput(e.target.value);

	const handleSubmit = async e => {
		e.preventDefault();
		dispatch({ type: CLEAR_CURRENT });
		try {
			if (searchInput === '') {
				handleError('Please enter a city to search for.');
				throw Error('Please enter a city to search for.');
			}

			const weatherResponse = await getCurrentWeather(
				searchInput.trim().toLowerCase()
			);

			if (!weatherResponse.ok) {
				handleError(
					`There was an error: ${weatherResponse.statusText} (${weatherResponse.status})`
				);

				throw Error(
					`There was an error: ${weatherResponse.statusText} (${weatherResponse.status})`
				);
			}

			const weatherData = await weatherResponse.json();
			dispatch({ type: SET_CURRENT, payload: weatherData });

			setSearchInput('');
		} catch (err) {
			console.error(err);
		}
		setSearchInput('');
	};

	return (
		<section
			id='search-wrapper'
			className='search-wrap-style card col-lg-3'
		>
			<form
				onSubmit={handleSubmit}
				id='search-form'
				className='text-center text-wrap'
			>
				<label htmlFor='search-box' className='search-label'>
					Search by City
				</label>
				<input
					type='text'
					id='search-bar'
					name='search-box'
					className='form-control text-input'
					value={searchInput}
					onChange={handleChange}
				/>
				<Button
					type='submit'
					id='search-button'
					role='primary'
					icon='fas fa-search'
				/>
				<Button
					type='reset'
					id='dlt-btn'
					role='danger'
					icon='far fa-trash-alt'
				/>
			</form>
			<div id='search-history' className='card-body'>
				{/* TODO - searches saved to localStorage will be populated here */}
			</div>
		</section>
	);
};
