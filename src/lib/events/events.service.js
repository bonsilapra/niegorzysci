import {supabase} from '../supabase';

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

export const addDraft = async({draft, author}) => {
	const {error} = await supabase
		.from('events')
		.insert({
			title: draft.title,
			event_begin: draft.begin,
			event_end: draft.end,
			content: draft.content,
			status: 'draft',
			created_by: author,
		});

	if (error) {
		throw new Error(error.message);
	}

	return;
};

export const deleteDraft = async(eventId) => {
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
