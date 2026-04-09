import {useState, useCallback, useEffect} from 'react';
import {fetchDrafts, fetchDraft, addDraft, deleteDraft} from '../lib/events/events.service';
import {toast} from '../lib/toasts';

export const useDrafts = () => {
	const [drafts, setDrafts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingDraft, setIsLoadingDraft] = useState(false);

	const loadDrafts = useCallback(async() => {
		try {
			setIsLoading(true);
			const data = await fetchDrafts();
			setDrafts(data);
		} catch (error) {
			console.error(error);
			toast({
				content: 'Nie można pobrać szkiców',
				type: 'error',
			});
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		loadDrafts();
	}, [loadDrafts]);

	const loadDraft = useCallback(async(draftId) => {
		if (!draftId) {
			return;
		}

		try {
			setIsLoadingDraft(true);
			const draft = await fetchDraft(draftId);
			return draft;
		} catch (error) {
			console.error(error);
			toast({
				content: 'Coś poszło nie tak, spróbuj ponownie',
				type: 'error',
			});
			return null;
		} finally {
			setIsLoadingDraft(false);
		}
	}, []);

	const handleAddDraft = async({draft, author}) => {
		try {
			await addDraft({draft, author});

		} catch (error) {
			console.error(error);
			toast({
				content: 'Nie można dodać szkicu',
				type: 'error',
			});
		}
	};

	const handleDeleteDraft = async(eventId) => {
		try {
			await deleteDraft(eventId);
			loadDrafts();

		} catch (error) {
			console.error(error);
			toast({
				content: 'Nie można usunąć szkicu',
				type: 'error',
			});
		}
	};

	return {
		drafts,
		isLoading,
		loadDraft,
		isLoadingDraft,
		handleDeleteDraft,
		handleAddDraft,
	};
};
