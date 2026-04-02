export const isEmpty = (value) => {
	if (value === '') {
		return true;
	} else if (value === null) {
		return true;
	} else if (Array.isArray(value) && value.length === 0) {
		return true;
	} else return false;
};
