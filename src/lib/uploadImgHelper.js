const checkFileExtension = (file) => {
	const ext = file.name.split('.').pop()?.toLowerCase();

	if (!ext || !['png', 'jpg', 'jpeg', 'webp'].includes(ext)) {
		throw new Error('Błąd dodawania obrazu: zły format pliku');
	}
};

export const buildEventImagePath = (eventId, file) => {
	checkFileExtension(file);

	return `${eventId}/${file.name}`;
};
