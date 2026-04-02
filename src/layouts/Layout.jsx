import cx from 'classnames';
import {useLocation} from 'react-router';
import {useAuth} from '../context/AppContext';
import {Navbar} from './Navbar';

export const Layout = ({children}) => {
	const {isLoggedIn, isApproved} = useAuth();
	const location = useLocation();

	const isMainPage = location.pathname === '/';

	const backgroundStyle = isLoggedIn && isApproved
		? 'bg-linear-to-b from-primary-0 to-primary-300'
		: 'bg-[url(/img/background.webp)] relative';

	const beforeLoginContainer = 'w-full md:w-2/3 max-w-md rounded-2xl bg-primary-0 flex flex-col p-6 shadow-xl text-primary-600 text-xl my-2';
	const afterLoginContainer = 'flex-1 w-full md:w-7/8 max-w-5xl';

	return (
		<div className={`${backgroundStyle} flex flex-col min-h-screen bg-cover bg-center`}>
			{isMainPage &&
				<div className="absolute top-20 w-full flex items-center justify-center">
					<img
						src="/img/Logo-full-white.webp"
						alt="Logo"
						className="max-h-40 min-h-20 px-6"
					/>
				</div>
			}
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
