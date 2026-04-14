const getFileExtension = (file) => {
	const ext = file.name.split('.').pop()?.toLowerCase();

	if (!ext || !['png', 'jpg', 'jpeg', 'webp'].includes(ext)) {
		throw new Error('Błąd dodawania obrazu: zły format pliku');
	}

	return ext;
};

export const buildEventImagePath = (eventId, kind, file) => {
	const ext = getFileExtension(file);

	return `${eventId}/${kind}.${ext}`;
};
