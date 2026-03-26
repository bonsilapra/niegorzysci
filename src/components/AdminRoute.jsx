import {Navigate} from 'react-router';
import {useAuth} from '../context/AppContext';

export const AdminRoute = ({children}) => {
	const {user, profile, isAuthReady, isProfileReady} = useAuth();

	if (isAuthReady) {
		return <div className="p-6">Ładowanie...</div>;
	}

	if (!user) {
		return <Navigate to="/login" replace />;
	}

	if (isProfileReady) {
		return <div className="p-6">Ładowanie profilu...</div>;
	}

	if (!profile) {
		return <Navigate to="/login" replace />;
	}

	if (profile.role !== 'admin') {
		return <Navigate to="/events" replace />;
	}

	return children;
};


