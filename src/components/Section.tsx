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
			className={`min-h-dvh w-full pt-14 pb-4 md:py-0 snap-start snap-always flex flex-col justify-center items-center ${bgStyle} ${className}`}
		>
			{children}
		</section>
	);
}
