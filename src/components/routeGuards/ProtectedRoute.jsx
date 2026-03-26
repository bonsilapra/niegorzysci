import {Navigate, Outlet, useLocation} from 'react-router';
import {useAuth} from '../../context/AppContext';

export function ProtectedRoute() {
	const {isLoggedIn, isApproved} = useAuth();
	const location = useLocation();

	if (!isLoggedIn) {
		return <Navigate to="/" replace state={{from: location}} />;
	}

	if (!isApproved && location.pathname !== '/pending') {
		return <Navigate to="/pending" replace />;
	}

	return <Outlet />;
}
