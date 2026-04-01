import {useNavigate} from 'react-router';
import {useAuth} from '../context/AppContext';
import {ActionButton} from '../components/Buttons';

export default function PendingApprovalPage() {
	const {refreshProfile, profile} = useAuth();
	const navigate = useNavigate();

	const refreshData = () => {
		refreshProfile();
		if (profile.approval_status === 'approved') {
			navigate('/events');
		}
	};

	return (
		<>
			<h1 className="text-2xl font-bold mb-10">
				Weryfikujemy Cię :)
			</h1>
			<ActionButton
				content="Odśwież"
				onClick={() => refreshData()}
				action="button"
			/>
		</>
	);
}
