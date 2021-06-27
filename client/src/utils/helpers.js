import dayjs from 'dayjs';

export const capitalizeFirstLetter = string => {
	return `${string[0].toUpperCase()}${string.slice(1)}`;
};

export const capitalizeWords = string => {
	return string
		.split(' ')
		.map(word => capitalizeFirstLetter(word))
		.join(' ');
};

export const formatDate = date => {
	const convertedDate = date * 1000;
	return dayjs(convertedDate).format('ddd, MMM DD');
};
