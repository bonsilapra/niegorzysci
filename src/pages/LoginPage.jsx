import {useState} from 'react';
import {useNavigate} from 'react-router';
import {supabase} from '../lib/supabase';
import {ActionButton, NavButtonSimple} from '../components/Buttons';
import {UserInput} from '../components/Inputs';
import {toast} from '../lib/toasts';

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
			toast({
				content: error.error_description || error.message,
				type: 'error',
			});
			setIsLoading(false);
		} else {
			navigate('/events');
		}
	};

	const isSubmitDisabled = () =>
		isLoading ||
		form.email === '' || form.password === '';

	return (
		<>
			<h1 className="text-2xl font-bold pb-8">Zaloguj się</h1>
			<form className="flex flex-col" onSubmit={handleLogin}>
				<UserInput
					label="Email:"
					id="email"
					type="email"
					name="email"
					placeholder="Twój email"
					value={form.email}
					required={true}
					onChange={handleChange}
					isDisabled={isLoading}
				/>
				<UserInput
					label="Hasło:"
					id="password"
					type="password"
					name="password"
					placeholder="************"
					value={form.password}
					required={true}
					onChange={handleChange}
					isDisabled={isLoading}
					cssClass="mb-10!"
				/>
				<ActionButton
					content="Potwierdź"
					isDisabled={isSubmitDisabled()}
					isLoading={isLoading}
				/>
				<NavButtonSimple
					path="/"
				/>
			</form>
		</>
	);
}
