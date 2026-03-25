import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {supabase} from '../lib/supabase';

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
			<h1 className="text-2xl font-bold">Wprowadź kod z emaila</h1>
			<form className="flex flex-col" onSubmit={handleConfirm}>
				<label htmlFor="email">Kod:</label>
				<input
					id="kod"
					type="text"
					placeholder="12345678"
					value={confirmEmailCode}
					required={true}
					onChange={(e) => setConfirmEmailCode(e.target.value)}
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
	);
};
