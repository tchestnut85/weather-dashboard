import React from 'react';

export const Button = ({ type, id, role, icon }) => {
	return (
		<button
			form='search-form'
			type={type}
			id={id}
			className={`btn btn-${role} btn-block`}
		>
			<i className={icon}></i>
		</button>
	);
};
