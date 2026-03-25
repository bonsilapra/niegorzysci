import {useState} from 'react';
import {supabase} from '../lib/supabase';
import {ConfirmEmail} from '../components/ConfirmEmail';

export default function SignupPage() {
	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [nick, setNick] = useState('');
	const [isConfirmShown, setIsConfirmShown] = useState(false);

	const handleSignup = async(event) => {
		event.preventDefault();
		setIsLoading(true);
		const {error} = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: {
					nick,
				},
			},
		});
		if (error) {
			alert(error.error_description || error.message);
			setIsConfirmShown(false);
		} else {
			setIsConfirmShown(true);
		}
		setIsLoading(false);
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
			<div className="w-full max-w-md rounded-2xl bg-white p-8 shadow">
				<h1 className="text-2xl font-bold">Zarejestruj się</h1>
				<form className="flex flex-col" onSubmit={handleSignup}>
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
					<label htmlFor="nick">Nick:</label>
					<input
						id="nick"
						type="text"
						placeholder="Nick"
						value={nick}
						required={true}
						onChange={(e) => setNick(e.target.value)}
					/>
					<button
						disabled={isLoading}
					>
						{isLoading
							? <span>Ładowanie</span>
							: <span>Wyślij email z kodem potwierdzającym</span>}
					</button>
				</form>
				{isConfirmShown &&
					<ConfirmEmail email={email}/>
				}
			</div>
		</div>
	);
}
