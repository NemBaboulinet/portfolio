import { ReactNode } from 'react';

interface SectionProps {
	id?: string;
	className?: string;
	children: ReactNode;
}

export default function Section({
	id,
	className = '',
	children,
}: SectionProps) {
	return (
		<section
			id={id}
			className={`h-screen w-full snap-start snap-always flex flex-col justify-center items-center bg-linear-to-r from-black to-lime-700${className}`}
		>
			{children}
		</section>
	);
}
