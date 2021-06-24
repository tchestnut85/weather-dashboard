import {
	CLEAR_CURRENT,
	CLEAR_ERROR,
	CLEAR_FORECAST,
	CLEAR_STORAGE,
	CLEAR_UV,
	SET_CURRENT,
	SET_ERROR,
	SET_FORECAST,
	SET_STORAGE,
	SET_UV,
} from './actions';

import { useReducer } from 'react';

const reducer = (state, action) => {
	switch (action.type) {
		case SET_CURRENT:
			return {
				...state,
				currentWeather: action.payload,
			};
		case CLEAR_CURRENT:
			return {
				...state,
				currentWeather: null,
			};
		default:
			return state;
	}
};

export function useWeatherReducer(initialState) {
	return useReducer(reducer, initialState);
}
