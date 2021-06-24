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
		case SET_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case CLEAR_ERROR:
			return { ...state, error: null };

		default:
			return state;
	}
};

export function useWeatherReducer(initialState) {
	return useReducer(reducer, initialState);
}
