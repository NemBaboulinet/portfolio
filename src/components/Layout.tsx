import React from 'react';
import Antigravity from './Antigravity';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className="relative min-h-screen w-full flex flex-col overflow-hidden bg-gray-950 text-green">
			{/* Arrière-plan interactif Antigravity */}
			<div className="absolute inset-0 overflow-hidden">
				<Antigravity
					count={150}
					magnetRadius={30}
					ringRadius={12}
					waveSpeed={0.4}
					waveAmplitude={1}
					particleSize={0.5}
					lerpSpeed={0.1}
					color="#49ff00"
					autoAnimate={false}
					particleVariance={1}
					rotationSpeed={0}
					depthFactor={1}
					pulseSpeed={3}
					particleShape="sphere"
					fieldStrength={10}
				/>
			</div>

			<header className="relative z-10 w-full">
				<nav className="flex flex-row items-center justify-between p-6 max-w-7xl mx-auto text-amber-200 font-medium">
					<div>Kevin Bytebier</div>
					<div className="text-sm opacity-70">test Cedric</div>
				</nav>
			</header>

			<main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
				{children}
			</main>
		</div>
	);
};

export default Layout;
