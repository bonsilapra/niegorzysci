import {Navigate} from 'react-router';
import {useAuth} from '../context/AppContext';

export const AdminRoute = ({children}) => {
	const {user, profile, isLoading} = useAuth();

	if (isLoading) {
		return <div className="p-6">Ładowanie...</div>;
	}

	if (!user) {
		return <Navigate to="/login" replace />;
	}

	if (!profile) {
		return <Navigate to="/login" replace />;
	}

	if (profile.role !== 'admin') {
		return <Navigate to="/events" replace />;
	}

	return children;
};


