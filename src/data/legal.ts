export interface LegalInfo {
	owner: string;
	brand: string;
	siret: string;
}

export interface LegalLink {
	label: string;
	href: string;
}

export const LEGAL_INFO: LegalInfo = {
	owner: 'Kevin BYTEBIER',
	brand: 'GREP.STUDIO',
	siret: '131 979 122 00010',
};

export const LEGAL_LINKS: LegalLink[] = [
	{ label: 'Mentions légales', href: '/mentions-legales.html' },
	{ label: 'Confidentialité', href: '/confidentialite.html' },
];
