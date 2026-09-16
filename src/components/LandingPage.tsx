export default function LandingPage() {
	return (
		<div className="flex flex-col items-center px-6">
			<span className="font-mono text-[13px] tracking-[0.22em] uppercase text-white/55 mb-6">
				Kevin BYTEBIER
			</span>

			<div className="w-full max-w-165 rounded-xl bg-[#0a0c07] border border-lime-accent/20 shadow-2xl overflow-hidden">
				{/* barre de titre */}
				<div className="h-10 flex items-center gap-2 px-4 bg-[#12140d] border-b border-white/5 relative">
					<span className="w-2.75 h-2.75 rounded-full bg-[#ff5f56]" />
					<span className="w-2.75 h-2.75 rounded-full bg-[#ffbd2e]" />
					<span className="w-2.75 h-2.75 rounded-full bg-[#27c93f]" />
					<span className="absolute left-1/2 -translate-x-1/2 font-mono text-xs text-white/40">
						kevin@portfolio — zsh
					</span>
				</div>

				<div className="px-8 py-7 font-mono text-[15px] leading-[1.95]">
					<p className="text-white">
						<span className="text-lime-accent">❯</span> whoami
					</p>
					<p className="text-white/60 mb-4">
						kevin_bytebier - développeur «full-stack» junior
					</p>

					<p className="text-white">
						<span className="text-lime-accent">❯</span> ls ./stack
					</p>
					<p className="text-white/60 mb-4">
						React&nbsp;&nbsp;&nbsp;TypeScript&nbsp;&nbsp;&nbsp;Node.js&nbsp;&nbsp;&nbsp;Tailwind&nbsp;&nbsp;&nbsp;Git
					</p>

					<a
						href="#aboutMe"
						className="group block text-white hover:text-[#c3ff4d]"
					>
						<span className="text-lime-accent">❯</span> cd
						./a-propos-de-moi{' '}
						<span className="inline-block text-white/40 transition-transform group-hover:translate-x-1">
							→
						</span>
					</a>

					<a
						href="#gitHistoric"
						className="group block text-white hover:text-[#c3ff4d] mb-1"
					>
						<span className="text-lime-accent">❯</span> cd
						./historique-git{' '}
						<span className="inline-block text-white/40 transition-transform group-hover:translate-x-1">
							→
						</span>
					</a>
					<p>
						<span className="text-lime-accent">❯</span>{' '}
						<span className="inline-block w-2.25 h-4.25 bg-lime-accent align-[-3px] animate-[blink_1.1s_step-end_infinite]" />
					</p>
				</div>
			</div>
		</div>
	);
}
