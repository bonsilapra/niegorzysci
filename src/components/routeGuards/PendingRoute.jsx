import {Navigate} from 'react-router';
import {useAuth} from '../../context/AppContext';

export function PendingRoute({children}) {
	const {isLoggedIn, isApproved, isAdmin} = useAuth();

	if (!isLoggedIn) {
		return <Navigate to="/login" replace />;
	}

	if (isApproved || isAdmin) {
		return <Navigate to="/events" replace />;
	}

	return children;
}
