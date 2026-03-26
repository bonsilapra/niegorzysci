import {Routes, Route, Navigate} from 'react-router';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PendingApprovalPage from './pages/PendingApprovalPage';
import EventsPage from './pages/EventsPage';
import EventDetailsPage from './pages/EventDetailsPage';
import AdminEventFormPage from './pages/AdminEventFormPage';
import {AdminRoute} from './components/routeGuards/AdminRoute';
import {AuthBootstrap} from './components/routeGuards/AuthBootstrap';
import {PendingRoute} from './components/routeGuards/PendingRoute';
import {ProtectedRoute} from './components/routeGuards/ProtectedRoute';
import {PublicOnlyRoute} from './components/routeGuards/PublicOnlyRoute';

function App() {

	return (
		<Routes>
			<Route element={<AuthBootstrap />}>
				<Route element={<PublicOnlyRoute />}>
					<Route path="/" element={<MainPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignupPage />} />
				</Route>

				<Route
					path="/pending"
					element={
						<PendingRoute>
							<PendingApprovalPage />
						</PendingRoute>
					}
				/>

				<Route element={<ProtectedRoute />}>
					<Route path="/events" element={<EventsPage />} />
					<Route path="/events/:id" element={<EventDetailsPage />} />
				</Route>


				<Route element={<AdminRoute />}>
					<Route path="/admin/events/new" element={<AdminEventFormPage />} />
					<Route path="/admin/events/:id/edit" element={<AdminEventFormPage />} />
				</Route>

				<Route path="*" element={<Navigate to="/login" replace />} />
			</Route>
		</Routes>
	);
}

export default App;
