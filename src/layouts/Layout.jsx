import {useAuth} from '../context/AppContext';
import {Navbar} from './Navbar';

export const Layout = ({children}) => {
	const {isLoggedIn} = useAuth();

	const backgroundStyle = isLoggedIn
		? 'bg-main'
		: 'bg-[url(/img/background.webp)]';

	const beforeLoginContainer = 'w-2/3 max-w-md rounded-2xl bg-light flex flex-col p-6 shadow text-dark text-xl';
	const afterLoginContainer = 'w-3/4 max-w-md text-dark text-xl';

	return (
		<div className={`${backgroundStyle} min-h-screen bg-cover bg-center`}>
			{isLoggedIn &&
				<Navbar />
			}
			<main className="min-h-screen flex flex-col items-center justify-center">
				<div className={isLoggedIn
					? afterLoginContainer
					: beforeLoginContainer
				}>
					{children}
				</div>
			</main>
		</div>
	);
};
