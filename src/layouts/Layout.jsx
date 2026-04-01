import cx from 'classnames';
import {useAuth} from '../context/AppContext';
import {Navbar} from './Navbar';

export const Layout = ({children}) => {
	const {isLoggedIn} = useAuth();

	const backgroundStyle = isLoggedIn
		? 'bg-secondary-200'
		: 'bg-[url(/img/background.webp)]';

	const beforeLoginContainer = 'w-2/3 max-w-md rounded-2xl bg-primary-0 flex flex-col p-6 shadow-xl text-primary-600 text-xl';
	const afterLoginContainer = 'w-3/4 max-w-md';

	return (
		<div className={`${backgroundStyle} min-h-screen bg-cover bg-center`}>
			{isLoggedIn &&
				<Navbar />
			}
			<main className="min-h-screen flex flex-col items-center justify-center">
				<div className={cx('text-primary-600 text-xl', {
					[afterLoginContainer]: isLoggedIn,
					[beforeLoginContainer]: !isLoggedIn,
				})}>
					{children}
				</div>
			</main>
		</div>
	);
};
