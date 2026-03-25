import {NavLink} from 'react-router';

export default function MainPage() {

	return (
		<div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
			<div className="w-full max-w-md rounded-2xl bg-white p-8 shadow">
				<NavLink to="/login">Zaloguj się</NavLink>
			</div>
			<div className="w-full max-w-md rounded-2xl bg-white p-8 shadow">
				<NavLink to="/signup">Zarejestruj się</NavLink>
			</div>
		</div>
	);
}
