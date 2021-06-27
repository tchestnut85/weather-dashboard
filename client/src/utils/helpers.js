export const capitalizeFirstLetter = string => {
	return `${string[0].toUpperCase()}${string.slice(1)}`;
};

export const capitalizeWords = string => {
	return string
		.split(' ')
		.map(word => capitalizeFirstLetter(word))
		.join(' ');
};
