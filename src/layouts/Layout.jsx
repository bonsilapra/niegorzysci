import cx from 'classnames';
import {useAuth} from '../context/AppContext';
import {Navbar} from './Navbar';

export const Layout = ({children}) => {
	const {isLoggedIn, isApproved} = useAuth();

	const backgroundStyle = isLoggedIn && isApproved
		? 'bg-linear-to-b from-primary-0 to-primary-300'
		: 'bg-[url(/img/background.webp)]';

	const beforeLoginContainer = 'w-full md:w-2/3 max-w-md rounded-2xl bg-primary-0 flex flex-col p-6 shadow-xl text-primary-600 text-xl';
	const afterLoginContainer = 'w-3/4 max-w-md p-6';

	return (
		<div className={`${backgroundStyle} flex flex-col min-h-screen bg-cover bg-center`}>
			{isLoggedIn &&
				<Navbar />
			}
			<main className="flex flex-1 flex-col items-center justify-center px-4">
				<div className={cx('text-primary-600 text-xl', {
					[afterLoginContainer]: isLoggedIn && isApproved,
					[beforeLoginContainer]: !isLoggedIn || !isApproved,
				})}>
					{children}
				</div>
			</main>
		</div>
	);
};
