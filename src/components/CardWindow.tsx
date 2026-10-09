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

export function FieldBox({
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

export function AnimatedCursor() {
	return (
		<span className="inline-block w-2.25 h-4.25 bg-lime-accent align-[-3px] animate-[blink_1.1s_step-end_infinite]" />
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
		<span
			className={`text-lime-accent bg-lime-accent/10 border border-lime-accent/30 text-[12px] tracking-wider px-3 py-0.75 rounded-full ${className}`}
		>
			{children}
		</span>
	);
}

export function InputField({
	className = '',
	...props
}: React.ComponentProps<'input'>) {
	return (
		<input
			{...props}
			className={`w-full border border-white/10 rounded-lg bg-white/3 px-3 py-2.5 sm:px-3.5 sm:py-3 text-xs sm:text-sm mb-4 sm:mb-5 text-white outline-none focus:border-lime-accent caret-lime-accent placeholder:text-white/35 ${className}`}
		/>
	);
}

export function TextField({
	className = '',
	...props
}: React.ComponentProps<'textarea'>) {
	return (
		<textarea
			{...props}
			className={`w-full border border-white/10 rounded-lg bg-white/3 px-3 py-2.5 sm:px-3.5 sm:py-3 text-xs sm:text-sm mb-4 sm:mb-5 text-white outline-none focus:border-lime-accent caret-lime-accent resize-none placeholder:text-white/35 ${className}`}
		/>
	);
}
export function ButtonStyle({
	children,
	className = '',
	...props
}: React.ComponentProps<'button'>) {
	return (
		<button
			{...props}
			className={`bg-lime-accent/80 text-black font-bold rounded-lg px-5 py-2.5 text-sm cursor-pointer hover:bg-lime-accent transform hover:scale-105 ${className}`}
		>
			{children}
		</button>
	);
}
