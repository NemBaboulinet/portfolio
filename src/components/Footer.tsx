import { LEGAL_INFO, LEGAL_LINKS } from '../data/legal';

export default function Footer() {
	return (
		<footer className="mt-6 sm:mt-10 px-4 text-center font-mono text-[11px] text-white/55 leading-relaxed">
			<p>
				© {new Date().getFullYear()} {LEGAL_INFO.owner} ·{' '}
				{LEGAL_INFO.brand} · SIRET {LEGAL_INFO.siret}
			</p>
			<p>
				{LEGAL_LINKS.map((link, index) => (
					<span key={link.href}>
						{index > 0 && ' · '}
						<a
							href={link.href}
							className="hover:text-white transition-colors"
						>
							{link.label}
						</a>
					</span>
				))}
			</p>
			<p className="mt-1">
				<span className="text-lime-accent">&lt;/&gt;</span> Portfolio
				codé à la main
			</p>
		</footer>
	);
}
