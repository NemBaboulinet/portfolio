import React, { useRef } from 'react';
import Antigravity from './Antigravity';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	return (
		<div
			ref={containerRef}
			className="relative min-h-screen w-full flex flex-col overflow-hidden bg-gray-950 text-green"
		>
			{/* Arrière-plan interactif Antigravity */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
				<Antigravity
					eventSource={containerRef}
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

			<header className="absolute w-full shrink-0 z-30"></header>

			<main className="relative z-10 flex-1 w-full overflow-y-auto snap-y snap-mandatory scroll-smooth bg-linear-to-tr from-black from-50% to-lime-700 bg-fixed">
				{children}
			</main>
		</div>
	);
};

export default Layout;
