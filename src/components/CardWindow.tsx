export function CardWindow({ children }: { children: React.ReactNode }) {
	return (
		<div className="w-full max-w-165 rounded-xl bg-[#0a0c07] border border-lime-accent/20 shadow-2xl overflow-hidden">
			<div className="h-10 flex items-center gap-2 px-4 bg-[#12140d] border-b border-white/5 relative"></div>
			<div className="p-4">{children}</div>
		</div>
	);
}
