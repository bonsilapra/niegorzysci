import {useState} from 'react';
import {useNavigate} from 'react-router';
import {supabase} from '../lib/supabase';
import {SubmitButton} from '../components/Buttons';

export default function LoginPage() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [form, setForm] = useState({
		email: '',
		password: '',
	});

	const handleChange = (event) => {
		const {name, value} = event.target;
		setForm((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleLogin = async(event) => {
		event.preventDefault();
		setIsLoading(true);
		const {error} = await supabase.auth.signInWithPassword({
			email: form.email,
			password: form.password,
		});
		if (error) {
			alert(error.error_description || error.message);
			setIsLoading(false);
		}
		navigate('/events');
	};

	const isSubmitDisabled = () =>
		isLoading ||
		form.email === '' || form.password === '';

	return (
		<>
			<h1 className="text-2xl font-bold pb-4">Zaloguj się</h1>
			<form className="flex flex-col" onSubmit={handleLogin}>
				<label htmlFor="email">Email:</label>
				<input
					id="email"
					type="email"
					name="email"
					placeholder="Twój email"
					value={form.email}
					required={true}
					onChange={handleChange}
				/>
				<label htmlFor="password">Hasło:</label>
				<input
					id="password"
					type="password"
					name="password"
					placeholder="************"
					value={form.password}
					required={true}
					onChange={handleChange}
				/>
				<SubmitButton
					content="Potwierdź"
					isDisabled={isSubmitDisabled()}
					isLoading={isLoading}
				/>
			</form>
		</>
	);
}
