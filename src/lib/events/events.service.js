import {supabase} from '../supabase';
import {buildEventImagePath} from '../../lib/uploadImgHelper';

export const fetchDrafts = async() => {
	const {data, error} = await supabase
		.from('events')
		.select('id, title, event_begin, event_end, content, logo_path, cover_path, updated_at')
		.eq('status', 'draft')
		.order('updated_at', {ascending: false});

	if (error) {
		throw new Error(error.message);
	}

	return data ?? [];
};

export const fetchDraft = async(draftId) => {
	const {data, error} = await supabase
		.from('events')
		.select('title, event_begin, event_end, content, logo_path, cover_path')
		.eq('id', draftId)
		.single();

	if (error) {
		throw new Error(error.message);
	}

	return data ?? [];
};

export const addDraft = async({draft, author}) => {
	const {data: event, error: insertError} = await supabase
		.from('events')
		.insert({
			title: draft.title,
			event_begin: draft.begin,
			event_end: draft.end,
			content: draft.content,
			status: 'draft',
			created_by: author,
		})
		.select('id')
		.single();

	if (insertError) {
		throw new Error(insertError.message);
	}

	let logoPath = null;
	let coverPath = null;

	if (draft.logoFile) {
		logoPath = await uploadEventImage(event.id, 'logo', draft.logoFile);
	}

	if (draft.coverFile) {
		coverPath = await uploadEventImage(event.id, 'cover', draft.coverFile);
	}

	if (logoPath || coverPath) {
		const {error: updateError} = await supabase
			.from('events')
			.update({
				logo_path: logoPath,
				cover_path: coverPath,
			})
			.eq('id', event.id);

		if (updateError) {
			throw new Error(updateError.message);
		}
	}

	return;
};

export const deleteDraft = async({eventId, paths}) => {
	await deleteImages({paths: paths, eventId});

	const {error} = await supabase
		.from('events')
		.delete()
		.eq('status', 'draft')
		.eq('id', eventId);

	if (error) {
		throw new Error(error.message);
	}

	return;
};

export const deleteImages = async({paths, eventId}) => {
	const {error: storageError} = await supabase.storage
		.from('event-images')
		.remove(paths);

	if (storageError) {
		throw new Error(storageError.message);
	}

	let imageToRemove;

	if (paths.length === 2) {
		// when event is deleted there is no point to delete paths from columns
		// since the whole row will be removed
		return;
	} else if (paths[0].includes('cover')) {
		imageToRemove = {cover_path: null};
	} else if (paths[0].includes('logo')) {
		imageToRemove = {logo_path: null};
	} else {
		return;
	}

	const {error: updateError} = await supabase
		.from('events')
		.update(imageToRemove)
		.eq('id', eventId);

	if (updateError) {
		throw new Error(updateError.message);
	}

};

const uploadEventImage = async(eventId, kind, file) => {
	let path;
	try {
		path = buildEventImagePath(eventId, kind, file);
	} catch (error) {
		throw new Error(error.message);
	}

	const {error} = await supabase.storage
		.from('event-images')
		.upload(path, file, {
			upsert: true,
			contentType: file.type,
		});

	if (error) {
		throw new Error(error.message);
	}

	return path;
};

export const getEventsImage = async(path) => {
	const imgUrl = await path
		? supabase.storage.from('event-images').getPublicUrl(path).data.publicUrl
		: null;
	return imgUrl;
};
