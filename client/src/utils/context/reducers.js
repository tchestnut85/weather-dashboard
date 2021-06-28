import {
	CLEAR_DATA,
	CLEAR_ERROR,
	CLEAR_STORAGE,
	LOAD_STORAGE,
	SET_CURRENT,
	SET_ERROR,
	SET_FORECAST,
	SET_STORAGE,
	SET_UV,
} from './actions';
import { clearSearch, getSavedSearches, saveSearch } from '../localStorage';

import { useReducer } from 'react';

const reducer = (state, action) => {
	switch (action.type) {
		case SET_CURRENT:
			return {
				...state,
				currentWeather: action.payload,
			};
		case SET_UV:
			return {
				...state,
				uvIndex: action.payload,
			};
		case SET_FORECAST:
			return {
				...state,
				forecast: action.payload,
			};
		case CLEAR_DATA:
			return {
				...state,
				currentWeather: null,
				uvIndex: null,
				forecast: null,
			};
		case LOAD_STORAGE:
			const savedCities = getSavedSearches();
			return {
				...state,
				savedSearches: [...savedCities],
			};
		case SET_STORAGE:
			saveSearch(state.savedSearches, action.payload);
			return {
				...state,
				savedSearches: [action.payload, ...state.savedSearches],
			};
		case CLEAR_STORAGE:
			clearSearch();
			return {
				...state,
				savedSearches: [],
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
