import {useState, useCallback, useEffect} from 'react';
import {fetchAllUsers} from '../lib/users/users.service';
import {toast} from '../lib/toasts';

export const useUsers = () => {
	const [users, setUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const loadUsers = useCallback(async() => {
		try {
			setIsLoading(true);
			const data = await fetchAllUsers();
			setUsers(data);
		} catch (error) {
			console.error(error);
			toast({
				content: 'Nie można pobrać użytkowników',
				type: 'error',
			});
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		loadUsers();
	}, [loadUsers]);

	return {
		users,
		isLoading,
	};
};
