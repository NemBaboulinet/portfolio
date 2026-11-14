export default function Footer() {
	return (
		<footer className="mt-6 sm:mt-10 px-4 text-center font-mono text-[11px] text-white/55 leading-relaxed">
			<p>
				© {new Date().getFullYear()} Kevin BYTEBIER · GREP.STUDIO ·
				SIRET 131 979 122 00010
			</p>
			<p>
				<a
					href="/mentions-legales.html"
					className="hover:text-white underline-offset-2 hover:underline"
				>
					Mentions légales
				</a>
				{' · '}
				<a
					href="/confidentialite.html"
					className="hover:text-white underline-offset-2 hover:underline"
				>
					Confidentialité
				</a>
			</p>
			<p className="mt-1">
				<span className="text-lime-accent">&lt;/&gt;</span> Portfolio
				codé à la main
			</p>
		</footer>
	);
}
