import {Navigate, Outlet, useLocation} from 'react-router';
import {useAuth} from '../../context/AppContext';

export function AdminRoute() {
	const {isLoggedIn, isApproved, isAdmin} = useAuth();
	const location = useLocation();

	if (!isLoggedIn) {
		return <Navigate to="/login" replace state={{from: location}} />;
	}

	if (!isApproved) {
		return <Navigate to="/pending" replace />;
	}

	if (!isAdmin) {
		return <Navigate to="/events" replace />;
	}

	return <Outlet />;
}
