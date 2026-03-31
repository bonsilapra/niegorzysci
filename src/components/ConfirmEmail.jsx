import {useState} from 'react';
import {useNavigate} from 'react-router';
import {supabase} from '../lib/supabase';
import {UserInput} from './Inputs';
import {SubmitButton} from './Buttons';

export const ConfirmEmail = ({email}) => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [confirmEmailCode, setConfirmEmailCode] = useState('');

	const handleConfirm = async(event) => {
		event.preventDefault();
		setIsLoading(true);
		const {data, error} = await supabase.auth.verifyOtp({
			email,
			token: confirmEmailCode,
			type: 'email',
		});
		if (error) {
			alert(error.error_description || error.message);
		}
		if (data.session) {
			navigate('/pending');
		}
		setIsLoading(false);
	};

	return (
		<div>
			<h2 className="text-xl font-bold mt-10 mb-4">Wprowadź kod z emaila</h2>
			<form className="flex flex-col" onSubmit={handleConfirm}>
				<UserInput
					label="Kod:"
					id="kod"
					name="kod"
					placeholder="12345678"
					value={confirmEmailCode}
					required={true}
					onChange={(e) => setConfirmEmailCode(e.target.value)}
					isDisabled={isLoading}
					cssClass="mb-10!"
				/>
				<SubmitButton
					content="Potwierdź"
					isDisabled={isLoading}
					isLoading={isLoading}
				/>
			</form>
		</div>
	);
};
