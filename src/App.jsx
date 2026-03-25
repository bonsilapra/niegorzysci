import {Routes, Route, Navigate} from 'react-router';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PendingApprovalPage from './pages/PendingApprovalPage';
import EventsPage from './pages/EventsPage';
import EventDetailsPage from './pages/EventDetailsPage';
import AdminEventFormPage from './pages/AdminEventFormPage';

function App() {

	return (
		<Routes>
			<Route path="/" element={<MainPage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/signup" element={<SignupPage />} />
			<Route path="/pending" element={<PendingApprovalPage />} />
			<Route path="/events" element={<EventsPage />} />
			<Route path="/events/:id" element={<EventDetailsPage />} />
			<Route path="/admin/events/new" element={<AdminEventFormPage />} />
			<Route path="/admin/events/:id/edit" element={<AdminEventFormPage />} />
			<Route path="*" element={<Navigate to="/login" replace />} />
		</Routes>
	);
}

export default App;
