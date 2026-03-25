import {Routes, Route, Navigate} from 'react-router';
import LoginPage from './pages/LoginPage';
import EventsPage from './pages/EventsPage';
import EventDetailsPage from './pages/EventDetailsPage';
import AdminEventFormPage from './pages/AdminEventFormPage';

function App() {

	return (
		<Routes>
			<Route path="/login" element={<LoginPage />} />
			<Route path="/events" element={<EventsPage />} />
			<Route path="/events/:id" element={<EventDetailsPage />} />
			<Route path="/admin/events/new" element={<AdminEventFormPage />} />
			<Route path="/admin/events/:id/edit" element={<AdminEventFormPage />} />
			<Route path="*" element={<Navigate to="/login" replace />} />
		</Routes>
	);
}

export default App;
