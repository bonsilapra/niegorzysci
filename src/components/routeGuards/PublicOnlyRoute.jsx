import {Navigate, Outlet, useLocation} from 'react-router';
import {useAuth} from '../../context/AppContext';

export function PublicOnlyRoute() {
	const {isLoggedIn, isApproved} = useAuth();
	const location = useLocation();

	if (!isLoggedIn) {
		return <Outlet />;
	}

	if (!isApproved) {
		return <Navigate to="/pending" replace state={{from: location}} />;
	}

	return <Navigate to="/events" replace state={{from: location}} />;
}
