export interface ContactLink {
	label: string;
	href: string;
	/** Ouvre dans un nouvel onglet */
	external: boolean;
}

export const CONTACT_LINKS: ContactLink[] = [
	{
		label: 'email',
		href: 'mailto:contact@kevinbytebier.fr',
		external: false,
	},
	{
		label: 'linkedin',
		href: 'https://www.linkedin.com/in/kevin-bytebier-b2aa56362/',
		external: true,
	},
	{
		label: 'github',
		href: 'https://github.com/NemBaboulinet',
		external: true,
	},
];
