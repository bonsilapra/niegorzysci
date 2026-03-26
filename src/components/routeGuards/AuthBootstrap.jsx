import {Outlet} from 'react-router';
import {useAuth} from '../../context/AppContext';

export function AuthBootstrap() {
	const {isReady} = useAuth();

	if (!isReady) {
		return <div>Loading...</div>;
	}

	return <Outlet />;
}
