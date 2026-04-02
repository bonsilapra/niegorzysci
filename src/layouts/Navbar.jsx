import {NavLink, useNavigate} from 'react-router';
import cx from 'classnames';
import {useAuth} from '../context/AppContext';
import {ActionButton} from '../components/Buttons';

export const Navbar = () => {
	const navigate = useNavigate();
	const {signOut, isAdmin, profile, isApproved, isReady} = useAuth();

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
			<div className="mr-auto ml-3 flex items-center">
				<img
					src="/img/Logo-short.webp"
					alt="Logo"
					className="h-10"
				/>
			</div>
			<nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex gap-7">
				{isApproved &&
					<NavLink to="/events" className={navLinkClassName}>
						Rajdy
					</NavLink>
				}
				{isAdmin && (
					<>
						<NavLink to="/admin/events/new" className={navLinkClassName}>
							Dodaj rajd
						</NavLink>
						<NavLink to="/admin/users" className={navLinkClassName}>
							Użytkownicy
						</NavLink>
					</>
				)}
			</nav>
			<div className="ml-auto mr-3 flex items-center">
				<p className="me-2">
					{profile?.email}
				</p>
				<ActionButton
					content="Wyloguj"
					onClick={handleSignout}
					type="secondary"
					cssClass="p-2! h-10!"
				/>
			</div>
		</header>
	);
};
