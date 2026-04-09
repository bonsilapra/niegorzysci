import {useState, useCallback, useEffect} from 'react';
import {fetchDrafts, addDraft, deleteDraft} from '../lib/events/events.service';
import {toast} from '../lib/toasts';

export const useDrafts = () => {
	const [drafts, setDrafts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

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
		handleDeleteDraft,
		handleAddDraft,
	};
};
