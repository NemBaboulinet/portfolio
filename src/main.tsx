import App from './App';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import layout from './components/Layout';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
