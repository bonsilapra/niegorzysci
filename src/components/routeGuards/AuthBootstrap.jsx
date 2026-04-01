import {Outlet} from 'react-router';
import {useAuth} from '../../context/AppContext';
import {Loader} from '../Loader';

export function AuthBootstrap() {
	const {isReady} = useAuth();

	if (!isReady) {
		return <Loader type="full-page" />;
	}

	return <Outlet />;
}
