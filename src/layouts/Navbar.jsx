import {useState} from 'react';
import {NavLink, useNavigate} from 'react-router';
import cx from 'classnames';
import {useAuth} from '../context/AppContext';
import {ActionButton} from '../components/Buttons';

const NAV_ITEMS = {
	events: {
		label: 'Rajdy',
		path: '/events',
	},
	add_event: {
		label: 'Dodaj rajd',
		path: '/admin/events/new',
	},
	users: {
		label: 'Użytkownicy',
		path: '/admin/users',
	},
};

export const Navbar = () => {
	const navigate = useNavigate();
	const {signOut, isAdmin, profile, isApproved, isReady} = useAuth();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const handleSignout = async() => {
		try {
			await signOut();
			navigate('/login', {replace: true});
		} catch (error) {
			alert('Coś poszło nie tak! Spróbuj ponownie');
			console.error(error);
		}
	};

	const navLinkClassName = ({isActive}) => cx('text-xl font-medium text-primary-600 underline-offset-8',
		'hover:text-primary-800 hover:underline',
		{'underline decoration-3 font-semibold text-primary-400': isActive},
	);

	return (
		<header className={cx('relative flex items-center bg-primary-0 h-16', {hidden: !isReady})}>
			<NavLink className="mr-auto ml-3 flex items-center" to="/">
				<img
					src="/img/Logo-short.webp"
					alt="Logo"
					className="h-10"
				/>
			</NavLink>
			<nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex gap-7">
				{isApproved &&
					<NavLink to={NAV_ITEMS.events.path} className={navLinkClassName}>
						{NAV_ITEMS.events.label}
					</NavLink>
				}
				{isAdmin && (
					<>
						<NavLink to={NAV_ITEMS.add_event.path} className={navLinkClassName}>
							{NAV_ITEMS.add_event.label}
						</NavLink>
						<NavLink to={NAV_ITEMS.users.path} className={navLinkClassName}>
							{NAV_ITEMS.users.label}
						</NavLink>
					</>
				)}
			</nav>
			<div className="ml-auto mr-3 hidden md:flex items-center">
				<p className="me-2 hidden lg:flex">
					{profile?.email}
				</p>
				<ActionButton
					content="Wyloguj"
					onClick={handleSignout}
					type="secondary"
					cssClass="ms-2! p-2! h-10! min-w-20"
				/>
			</div>
			<BurgerMenu
				isMenuOpen={isMenuOpen}
				setIsMenuOpen={setIsMenuOpen}
				isApproved={isApproved}
				isAdmin={isAdmin}
				profile={profile}
				handleSignout={handleSignout}
			/>
		</header>
	);
};

const BurgerMenu = ({
	isMenuOpen,
	setIsMenuOpen,
	isApproved,
	isAdmin,
	profile,
	handleSignout,
}) => {
	const burgerLinkClassName = ({isActive}) => cx('text-xl font-medium text-primary-600 underline-offset-8',
		'hover:text-primary-800 hover:underline',
		{'underline decoration-3 font-semibold text-primary-400': isActive},
	);

	return (
		<>
			<button
				type="button"
				className="ml-auto flex md:hidden items-center justify-center me-2"
				aria-label={isMenuOpen ? 'Zamknij menu' : 'Otwórz menu'}
				aria-expanded={isMenuOpen}
				onClick={() => setIsMenuOpen((v) => !v)}
			>
				{isMenuOpen
					? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg size-8" viewBox="0 0 16 16">
						<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
					</svg>
					: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list size-8" viewBox="0 0 16 16">
						<path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
					</svg>
				}
			</button>

			{isMenuOpen && (
				<div className="absolute top-16 left-30 sm:left-60 right-0 z-50 border-t-3 border-primary-200 bg-primary-0 shadow-md md:hidden">
					<div className="flex flex-col p-4 gap-4">
						<div className="flex flex-col gap-3">
							{isApproved && (
								<NavLink
									to={NAV_ITEMS.events.path}
									className={burgerLinkClassName}
									onClick={() => setIsMenuOpen(false)}
								>
									{NAV_ITEMS.events.label}
								</NavLink>
							)}
							{isAdmin && (
								<>
									<NavLink
										to={NAV_ITEMS.add_event.path}
										className={burgerLinkClassName}
										onClick={() => setIsMenuOpen(false)}
									>
										{NAV_ITEMS.add_event.label}
									</NavLink>
									<NavLink
										to={NAV_ITEMS.users.path}
										className={burgerLinkClassName}
										onClick={() => setIsMenuOpen(false)}
									>
										{NAV_ITEMS.users.label}
									</NavLink>
								</>
							)}
						</div>
						<div className="border-t border-primary-300 pt-4">
							<p className="mb-3 break-all">
								{profile?.email}
							</p>
							<ActionButton
								content="Wyloguj"
								onClick={handleSignout}
								type="secondary"
								cssClass="p-2! h-10! max-w-25"
							/>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
