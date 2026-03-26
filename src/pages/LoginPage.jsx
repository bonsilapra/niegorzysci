import {useState} from 'react';
import {useNavigate} from 'react-router';
import {supabase} from '../lib/supabase';

export default function LoginPage() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async(event) => {
		event.preventDefault();
		setIsLoading(true);
		const {error} = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		if (error) {
			alert(error.error_description || error.message);
			setIsLoading(false);
		}
		navigate('/events');
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
			<div className="w-full max-w-md rounded-2xl bg-white p-8 shadow">
				<h1 className="text-2xl font-bold">Zaloguj się</h1>
				<form className="flex flex-col" onSubmit={handleLogin}>
					<label htmlFor="email">Email:</label>
					<input
						id="email"
						type="email"
						placeholder="Twój email"
						value={email}
						required={true}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<label htmlFor="password">Hasło:</label>
					<input
						id="password"
						type="password"
						placeholder="************"
						value={password}
						required={true}
						onChange={(e) => setPassword(e.target.value)}
					/>

					<button
						disabled={isLoading}
					>
						{isLoading
							? <span>Ładowanie</span>
							: <span>Potwierdź</span>}
					</button>
				</form>
			</div>
		</div>
	);
}
