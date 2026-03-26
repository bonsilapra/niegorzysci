import {Routes, Route, Navigate} from 'react-router';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PendingApprovalPage from './pages/PendingApprovalPage';
import EventsPage from './pages/EventsPage';
import EventDetailsPage from './pages/EventDetailsPage';
import AdminEventFormPage from './pages/AdminEventFormPage';
import {ApprovedRoute} from './components/ApprovedRoute';
import {ProtectedRoute} from './components/ProtectedRoute';
import {AdminRoute} from './components/AdminRoute';
import {RedirectWhenUser} from './components/RedirectWhenUser';

function App() {

	return (
		<Routes>
			<Route
				path="/"
				element={
					<RedirectWhenUser>
						<MainPage />
					</RedirectWhenUser>
				}
			/>
			<Route
				path="/login"
				element={
					<RedirectWhenUser>
						<LoginPage />
					</RedirectWhenUser>
				}
			/>
			<Route
				path="/signup"
				element={
					<RedirectWhenUser>
						<SignupPage />
					</RedirectWhenUser>
				}
			/>
			<Route
				path="/pending"
				element={
					<ProtectedRoute>
						<PendingApprovalPage />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/events"
				element={
					<ApprovedRoute>
						<EventsPage />
					</ApprovedRoute>
				} />
			<Route
				path="/events/:id"
				element={
					<ApprovedRoute>
						<EventDetailsPage />
					</ApprovedRoute>
				} />
			<Route
				path="/admin/events/new"
				element={
					<AdminRoute>
						<AdminEventFormPage />
					</AdminRoute>
				}
			/>
			<Route
				path="/admin/events/:id/edit"
				element={
					<AdminRoute>
						<AdminEventFormPage />
					</AdminRoute>
				}
			/>
			<Route path="*" element={<Navigate to="/login" replace />} />
		</Routes>
	);
}

export default App;
