import React from 'react';
import { Search } from '../components/Search';
import { WeatherCurrent } from '../components/WeatherCurrent';
import { WeatherForecast } from '../components/WeatherForecast';

export const Dashboard = () => {
	return (
		<main className='main-content container'>
			<div className='content-wrapper row'>
				<Search />
				<section id='result-wrapper' className='results col-lg-9 card'>
					<WeatherCurrent />
					<WeatherForecast />
				</section>
			</div>
		</main>
	);
};
