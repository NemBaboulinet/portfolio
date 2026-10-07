export function CardWindow({
	children,
	title,
}: {
	children: React.ReactNode;
	title: React.ReactNode;
}) {
	return (
		<div className="w-full max-w-165 rounded-xl bg-[#0a0c07] border border-lime-accent/20 shadow-2xl overflow-hidden">
			<div className="h-10 flex items-center gap-2 px-4 bg-[#12140d] border-b border-white/5 relative">
				{title}
			</div>
			<div className="p-4 sm:p-6">{children}</div>
		</div>
	);
}

export function Placeholder({
	children,
	className = '',
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div
			className={`border border-white/10 rounded-lg bg-white/3 px-3 py-2.5 sm:px-3.5 sm:py-3 text-xs sm:text-sm mb-4 sm:mb-5 ${className}`}
		>
			{children}
		</div>
	);
}

export function Pin({
	children,
	className = '',
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div
			className={`text-lime-accent bg-lime-accent/10 border border-lime-accent/30 text-[12px] tracking-wider px-3 py-0.75 rounded-full ml-auto ${className}`}
		>
			{children}
		</div>
	);
}
