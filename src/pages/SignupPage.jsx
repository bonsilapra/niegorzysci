import {useState} from 'react';
import {supabase} from '../lib/supabase';
import {ConfirmEmail} from '../components/ConfirmEmail';
import {UserInput} from '../components/Inputs';
import {SubmitButton, NavButtonSimple} from '../components/Buttons';

export default function SignupPage() {
	const [isLoading, setIsLoading] = useState(false);
	const [form, setForm] = useState({
		email: '',
		password: '',
		nick: '',
	});
	const [isConfirmShown, setIsConfirmShown] = useState(false);

	const handleChange = (event) => {
		const {name, value} = event.target;
		setForm((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSignup = async(event) => {
		event.preventDefault();
		setIsLoading(true);
		const {error} = await supabase.auth.signUp({
			email: form.email,
			password: form.password,
			options: {
				data: {
					nick: form.nick,
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
		<>
			<h1 className="text-2xl font-bold pb-8">Zarejestruj się</h1>
			<form className="flex flex-col" onSubmit={handleSignup}>
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
					cssClass="mb-1!"
				/>
				<small
					className="opacity-50 text-right mb-0">
					Min. 12 znaków
				</small>
				<UserInput
					label="Nick:"
					id="nick"
					name="nick"
					placeholder="Nick"
					value={form.nick}
					required={true}
					onChange={handleChange}
					isDisabled={isLoading}
					cssClass="mb-10!"
				/>
				<SubmitButton
					content="Wyślij email z kodem potwierdzającym"
					isDisabled={isLoading || isConfirmShown}
					isLoading={isLoading}
				/>
			</form>
			{isConfirmShown &&
				<ConfirmEmail email={form.email}/>
			}
			<NavButtonSimple
				path="/"
			/>
		</>
	);
}
