import {UsersProvider, useUsers} from '../context/UsersContext';
import {Loader} from '../components/Loader';
import {UsersTable} from '../components/UsersTable';
import {Button} from '../components/Button';

export default function AdminUsersPage() {
	return (
		<UsersProvider>
			<AdminUsersPageContent />
		</UsersProvider>
	);
}

function AdminUsersPageContent() {
	const {users, isLoading, reloadUsers} = useUsers();

	if (isLoading) {
		return <Loader type="full-page" />;
	}

	return (
		<>
			<h1 className="text-2xl font-bold">Użytkownicy</h1>
			<div className="flex justify-end">
				<Button
					content="Odśwież"
					size="small"
					isDisabled={isLoading}
					onClick={reloadUsers}
					cssClass="w-25! mb-3"
				/>
			</div>
			<UsersTable users={users} />
		</>
	);
}
