import {createContext, useContext} from 'react';
import {useUsersData} from '../hooks/useUsersData';

const UsersContext = createContext(null);

export function UsersProvider({children}) {
	const value = useUsersData();

	return <UsersContext.Provider value={value}>
		{children}
	</UsersContext.Provider>;
}

export function useUsers() {
	const context = useContext(UsersContext);

	if (!context) {
		throw new Error('useUsers musi być użyty wewnątrz UsersProvider');
	}

	return context;
}
