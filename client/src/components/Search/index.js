import React, { useEffect, useState } from 'react';

export const Search = () => {
	// TODO - refactor to use Context or Redux
	// TODO - implement localstorage setter and getter util functions

	const [searchState, setSearchState] = useState('');

	const handleChange = e => setSearchState(e.target.value);

	const handleSubmit = () => {
		try {
			// TODO - make the fetch request to the weather API
		} catch (err) {
			console.error(err);
		}
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
				<label htmlFor='search-box' class='search-label'>
					Search by City
				</label>
				<input
					type='text'
					id='search-bar'
					name='search-box'
					className='form-control text-input'
					onChange={handleChange}
				/>
				<button
					type='submit'
					form='search-form'
					id='search-button'
					className='btn btn-primary btn-block'
				>
					<i className='fas fa-search'></i>
				</button>
				<button
					type='reset'
					form='search-form'
					id='dlt-btn'
					className='btn btn-danger btn-block'
				>
					<i className='far fa-trash-alt'></i>
				</button>{' '}
			</form>
			<div id='search-history' className='card-body'>
				{/* TODO - searches saved to localStorage will be populated here */}
			</div>
		</section>
	);
};
