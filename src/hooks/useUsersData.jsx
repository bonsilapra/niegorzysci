import {useState, useCallback, useEffect} from 'react';
import {fetchAllUsers, approveUser, rejectUser} from '../lib/users/users.service';
import {toast} from '../lib/toasts';

export const useUsersData = () => {
	const [users, setUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [updatingUserId, setUpdatingUserId] = useState(null);

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

	const handleApproveUser = useCallback(async(userId) => {
		try {
			setUpdatingUserId(userId);
			await approveUser(userId);

			setUsers((prevUsers) =>
				prevUsers.map((user => {
					return user.id === userId
						? {...user, approval_status: 'approved'}
						: user;
				}
				)));
		} catch (error) {
			console.error(error);
			toast({
				content: 'Nie można aktywować użytkownika',
				type: 'error',
			});
		} finally {
			setUpdatingUserId(null);
		}
	}, []);

	const handleRejectUser = useCallback(async(userId) => {
		try {
			setUpdatingUserId(userId);
			await rejectUser(userId);

			setUsers((prevUsers) =>
				prevUsers.map((user => {
					return user.id === userId
						? {...user, approval_status: 'rejected'}
						: user;
				}
				)));
		} catch (error) {
			console.error(error);
			toast({
				content: 'Nie można deaktywować użytkownika',
				type: 'error',
			});
		} finally {
			setUpdatingUserId(null);
		}
	}, []);

	return {
		users,
		isLoading,
		updatingUserId,
		approveUser: handleApproveUser,
		rejectUser: handleRejectUser,
		reloadUsers: loadUsers,
	};
};
