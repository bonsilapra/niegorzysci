import {useUsers} from '../hooks/useUsers';
import {Loader} from '../components/Loader';
import {UsersTable} from '../components/UsersTable';

export default function AdminUsersPage() {
	const {users, isLoading} = useUsers();

	if (isLoading) {
		return <Loader type="full-page" />;
	}

	return (
		<>
			<h1 className="text-2xl font-bold">Użytkownicy</h1>
			<UsersTable
				users={users}
			/>
		</>
	);
}
