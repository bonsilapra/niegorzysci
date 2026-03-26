import {Navigate} from 'react-router';
import {useAuth} from '../context/AppContext';

export const RedirectWhenUser = ({children}) => {
	const {user, profile, isAuthReady, isProfileReady} = useAuth();

	if (!isAuthReady) {
		return <div className="p-6">Ładowanie...</div>;
	}

	if (!user) {
		return children;
	}

	if (!isProfileReady) {
		return <div className="p-6">Ładowanie profilu...</div>;
	}

	if (profile?.approval_status === 'approved') {
		return <Navigate to="/events" replace />;
	}

	return <Navigate to="/pending" replace />;
};

