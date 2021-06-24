import React from 'react';
import { Search } from '../components/Search';
import { WeatherCurrent } from '../components/WeatherCurrent';

export const Dashboard = () => {
	return (
		<main className='main-content container'>
			<div className='content-wrapper row'>
				<Search />
				<WeatherCurrent />
			</div>
		</main>
	);
};
