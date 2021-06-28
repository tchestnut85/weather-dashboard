import {
	CLEAR_DATA,
	CLEAR_ERROR,
	CLEAR_STORAGE,
	LOAD_STORAGE,
	SET_CURRENT,
	SET_ERROR,
	SET_STORAGE,
} from '../../utils/context/actions';
import React, { useEffect, useState } from 'react';

import { Button } from '../Button';
import { capitalizeFirstLetter } from '../../utils/helpers';
import { getCurrentWeather } from '../../utils/API';
import { useWeatherContext } from '../../utils/context/WeatherState';

export const Search = () => {
	const [state, dispatch] = useWeatherContext();
	const savedCities = state.savedSearches;

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
		dispatch({ type: CLEAR_DATA });
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
			dispatch({ type: SET_STORAGE, payload: searchInput });

			const weatherData = await weatherResponse.json();
			dispatch({ type: SET_CURRENT, payload: weatherData });
			setSearchInput('');
		} catch (err) {
			console.error(err);
		}
		setSearchInput('');
	};

	// On page load, check for saved searches in localstorage and load them into the Context state and the search box
	useEffect(() => {
		dispatch({ type: LOAD_STORAGE });
	}, []);

	// Delete saved items from localstorage, Context state and the search box
	const clearSavedCities = () => {
		dispatch({ type: CLEAR_STORAGE });
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
					clearSavedCities={clearSavedCities}
				/>
			</form>
			<div id='search-history' className='card-body'>
				{savedCities.length
					? savedCities.map(city => (
							<button
								className='btn btn-info btn-block'
								key={city}
							>
								{capitalizeFirstLetter(city)}
							</button>
					  ))
					: null}
			</div>
		</section>
	);
};
