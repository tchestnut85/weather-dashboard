import { CLEAR_ERROR, SET_ERROR, SET_UV } from '../../utils/context/actions';
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
		// eslint-disable-next-line
	}, [currentState.currentWeather]);

	// Change the background color of the UV Index div depending on its value
	const handleUVColor = value => {
		if (value > 7) {
			return 'bg-danger';
		} else if (value > 2 && value <= 7) {
			return 'bg-warning';
		} else {
			return 'bg-success';
		}
	};

	return (
		<>
			{uvIndex && (
				<div id='uv-value' className='secondary-text uv-class'>
					<h4>UV Index: {}</h4>
					<div
						id='uv-index'
						className={`uv-result rounded ${handleUVColor(
							uvIndex.value
						)}`}
					>
						{uvIndex.value}
					</div>
				</div>
			)}
		</>
	);
};
