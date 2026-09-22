import { ReactNode } from 'react';

interface TextStyleProps {
	children: ReactNode;
	className?: string;
}

export function H2({ children, className = '' }: TextStyleProps) {
	return (
		<h2
			className={`text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl font-bold text-white ${className}`}
		>
			{children}
		</h2>
	);
}

export function H3({ children, className = '' }: TextStyleProps) {
	return (
		<h3
			className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white ${className}`}
		>
			{children}
		</h3>
	);
}

export function Citation({ children, className = '' }: TextStyleProps) {
	return (
		<p
			className={`text-xl sm:text-2xl md:text-3xl italic  text-white/40 ${className}`}
		>
			{children}
		</p>
	);
}

export function TextContent({ children, className = '' }: TextStyleProps) {
	return (
		<p className={`max-w-2xl text-white/60 leading-relaxed ${className}`}>
			{children}
		</p>
	);
}
