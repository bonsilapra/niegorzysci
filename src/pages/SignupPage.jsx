import {useState} from 'react';
import {supabase} from '../lib/supabase';
import {ConfirmEmail} from '../components/ConfirmEmail';
import {UserInput} from '../components/Inputs';
import {Button} from '../components/Button';
import {toast} from '../lib/toasts';
import {isEmpty} from '../lib/isEmpty';

export default function SignupPage() {
	const [isLoading, setIsLoading] = useState(false);
	const [form, setForm] = useState({
		email: '',
		password: '',
		passwordRepeat: '',
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
			toast({
				content: error.error_description || error.message,
				type: 'error',
			});
			setIsConfirmShown(false);
		} else {
			setIsConfirmShown(true);
		}
		setIsLoading(false);
	};

	const isPasswordRepeatedIncorrectly = form.passwordRepeat &&
		form.password !== form.passwordRepeat;

	const isEmailButtonDisabled = isLoading ||
		isConfirmShown ||
		isPasswordRepeatedIncorrectly ||
		isEmpty(form.email) ||
		isEmpty(form.password) ||
		isEmpty(form.nick);

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
					isDisabled={isLoading || isConfirmShown}
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
					isDisabled={isLoading || isConfirmShown}
					cssClass="mb-1!"
				/>
				<small
					className="opacity-50 text-right mb-0">
					Min. 12 znaków
				</small>
				<UserInput
					label="Powtórz Hasło:"
					id="passwordRepeat"
					type="password"
					name="passwordRepeat"
					placeholder="************"
					value={form.passwordRepeat}
					required={true}
					onChange={handleChange}
					isDisabled={isLoading || isConfirmShown}
					cssClass={isPasswordRepeatedIncorrectly && 'border-red-500'}
				/>
				<UserInput
					label="Nick:"
					id="nick"
					name="nick"
					placeholder="Nick"
					value={form.nick}
					required={true}
					onChange={handleChange}
					isDisabled={isLoading || isConfirmShown}
					cssClass="mb-10!"
				/>
				<Button
					content="Wyślij email z kodem potwierdzającym"
					isDisabled={isEmailButtonDisabled}
					isLoading={isLoading}
				/>
			</form>
			{isConfirmShown &&
				<ConfirmEmail email={form.email}/>
			}
			<Button
				path="/"
				simple
			/>
		</>
	);
}
