import dayjs from 'dayjs';

const capitalizeFirstLetter = string => {
	return `${string[0].toUpperCase()}${string.slice(1)}`;
};

const capitalizeWords = string => {
	return string
		.split(' ')
		.map(word => capitalizeFirstLetter(word))
		.join(' ');
};

const formatDate = date => {
	const convertedDate = date * 1000;
	return dayjs(convertedDate).format('ddd, MMM DD');
};

export { capitalizeFirstLetter, capitalizeWords, formatDate };
