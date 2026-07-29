import App from './App';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Layout from '../src/components/Layout.tsx';
import { Analytics } from '@vercel/analytics/react';

createRoot(document.getElementById('root')!).render(
	<>
		<StrictMode>
			<Layout>
				<App />
			</Layout>
		</StrictMode>
		<Analytics />
	</>,
);
