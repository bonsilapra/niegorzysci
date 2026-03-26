import {NavLink, useNavigate} from 'react-router';
import {useAuth} from '../context/AppContext';

export const Navbar = () => {
	const navigate = useNavigate();
	const {signOut, isAdmin, profile} = useAuth();

	const handleSignout = async() => {
		try {
			await signOut();
			navigate('/login', {replace: true});
		} catch (error) {
			alert('Coś poszło nie tak! Spróbuj ponownie');
			console.error(error);
		}
	};

	const navLinkClassName = ({isActive}) =>
		[
			isActive ? 'text-red' : 'text-black',
		].join(' ');

	return (
		<header className="bg-primary">
			<nav className="flex items-center gap-2">
				<NavLink to="/events" className={navLinkClassName}>
					Rajdy
				</NavLink>
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
			<div>
				<p>
					{profile?.nick}
					{profile?.email}
				</p>
				<button
					type="button"
					onClick={handleSignout}
				>
					Wyloguj
				</button>
			</div>
		</header>
	);
};
