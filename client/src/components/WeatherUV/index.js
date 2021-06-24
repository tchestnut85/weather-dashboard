import {
	CLEAR_ERROR,
	CLEAR_UV,
	SET_ERROR,
	SET_UV,
} from '../../utils/context/actions';
import React, { useEffect } from 'react';

import { getUVIndex } from '../../utils/API';
import { useWeatherContext } from '../../utils/context/WeatherState';

export const WeatherUV = ({ lat, lon }) => {
	const [currentState, dispatch] = useWeatherContext();
	const { uvIndex } = currentState;

	const handleError = message => {
		dispatch({ type: SET_ERROR, payload: message });
		setTimeout(() => {
			dispatch({ type: CLEAR_ERROR });
		}, 3000);
	};

	const getUVData = async () => {
		dispatch({ type: CLEAR_UV });

		try {
			const uvResponse = await getUVIndex(lat, lon);

			if (!uvResponse.ok) {
				handleError(
					`There was an error: ${uvResponse.statusText} (${uvResponse.status})`
				);

				throw Error(
					`There was an error: ${uvResponse.statusText} (${uvResponse.status})`
				);
			}

			const uvData = await uvResponse.json();
			dispatch({ type: SET_UV, payload: uvData });
		} catch (err) {
			console.error(err);
		}
	};

	// Invoke the getUVData function when currentState updates
	useEffect(() => {
		getUVData();
	}, [currentState.currentWeather]);

	// Change the background color of the UV Index div depending on its value
	const handleUVColor = value => {
		switch (value) {
			case value <= 2:
				return 'uv-result rounded bg-success';
			case value > 2 && value <= 7:
				return 'uv-result rounded bg-warning';
			default:
				return 'uv-result rounded bg-danger';
		}
	};

	return (
		<>
			{uvIndex && (
				<div id='uv-value' className='secondary-text uv-class'>
					<h4>UV Index: {}</h4>
					<div id='uv-index' className={handleUVColor(uvIndex.value)}>
						{uvIndex.value}
					</div>
				</div>
			)}
		</>
	);
};
