import {useNavigate} from 'react-router';
import {useAuth} from '../context/AppContext';

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
		<div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
			<div className="w-full max-w-md rounded-2xl bg-white p-8 shadow">
				<h1 className="text-2xl font-bold">Weryfikujemy Cię :)</h1>
				<button
					role="button"
					onClick={() => refreshData()}
				>
					Odśwież
				</button>
			</div>
		</div>
	);
}
