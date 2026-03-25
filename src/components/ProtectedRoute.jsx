import {Navigate} from 'react-router';
import {useAuth} from '../context/AppContext';

export const ProtectedRoute = ({children}) => {
	const {user, isLoading} = useAuth();

	if (isLoading) {
		return <div className="p-6">Ładowanie...</div>;
	}

	if (!user) {
		return <Navigate to="/login" replace />;
	}

	return children;
};


