import React from 'react';

export const Button = ({ type, id, role, icon, clearSavedCities }) => {
	return (
		<button
			form='search-form'
			type={type}
			id={id}
			className={`btn btn-${role} btn-block`}
			onClick={clearSavedCities}
		>
			<i className={icon}></i>
		</button>
	);
};
