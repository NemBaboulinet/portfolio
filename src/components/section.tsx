import { ReactNode } from 'react';

interface SectionProps {
	id?: string;
	className?: string;
	children: ReactNode;
	bgStyle?: string;
}

export default function Section({
	id,
	className = '',
	children,
	bgStyle = '',
}: SectionProps) {
	return (
		<section
			id={id}
			className={`h-screen w-full snap-start snap-always flex flex-col justify-center items-center ${bgStyle || 'bg-linear-to-tr from-black from-50% to-lime-700'}${className}`}
		>
			{children}
		</section>
	);
}
