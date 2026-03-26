import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router';
import App from './App.jsx';
import {AuthProvider} from './context/AppContext.jsx';
import {Layout} from './layouts/Layout.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<Layout>
					<App />
				</Layout>
			</AuthProvider>
		</BrowserRouter>
	</StrictMode>,
);
