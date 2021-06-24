import React, { useEffect, useState } from 'react';

import { Button } from '../Button';
import { getCurrentWeather } from '../../utils/API';

export const Search = () => {
	// TODO - refactor to use Context or Redux
	// TODO - implement localstorage setter and getter util functions

	const [searchInput, setSearchInput] = useState('');

	const handleChange = e => setSearchInput(e.target.value);

	const handleSubmit = async e => {
		e.preventDefault();

		try {
			if (searchInput === '') {
				console.error('Please enter a city to search for.');
				throw Error('Please enter a city to search for.');
			}

			const weatherResponse = await getCurrentWeather(
				searchInput.trim().toLowerCase()
			);

			if (!weatherResponse.ok) {
				console.error(
					`There was an error: ${weatherResponse.statusText} (${weatherResponse.status})`
				);
				throw Error(
					`There was an error: ${weatherResponse.statusText} (${weatherResponse.status})`
				);
			}

			const weatherData = await weatherResponse.json();
			console.log('weatherData:', weatherData);

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
