export interface ProjectPreviewMedia {
	mp4: string;
	webm: string;
	poster: string;
	caption: string;
}

export interface Project {
	id: string;
	/** Libellé du cadran, 14 caractères max */
	short: string;
	name: string;
	stack: string;
	period: string;
	desc: string;
	preview?: ProjectPreviewMedia;
	link?: { href: string; label: string };
}

export const PROJECTS: Project[] = [
	{
		id: 'saalto',
		short: 'Dubrulle-Downs',
		name: 'Dubrulle-Downs · SAALTO',
		stack: 'React 19 · TypeScript · Ant Design 6 · Jotai',
		period: 'Stage · janv – juin 2026',
		desc: "Portail de traçabilité et de logistique agricole. Refonte du tunnel de création de tâches : un seul formulaire qui s'adapte au type de tâche. En parallèle : migration Ant Design 5 → 6 et passage de Chart.js à Highcharts.",
		preview: {
			mp4: '/projects/downs/video.mp4',
			webm: '/projects/downs/video.webm',
			poster: '/projects/downs/poster.jpg',
			caption:
				'Formulaire de création de tâches · reconstitution, données fictives',
		},
	},
	{
		id: 'ark-server',
		short: 'Serveur Ark',
		name: 'Serveur dédié Ark',
		stack: 'Docker Compose · Bash · Taskfile · Discord',
		period: '2026',
		desc: "Un serveur Ark: Survival Evolved lancé en quelques minutes avec Docker Compose, un script d'administration (sauvegarde, restauration, mise à jour) et des notifications Discord.",
		link: {
			href: 'https://github.com/NemBaboulinet/ark-server',
			label: 'Voir sur GitHub',
		},
	},
	{
		id: 'portfolio',
		short: 'Portfolio',
		name: 'Portfolio',
		stack: 'React · TypeScript · Tailwind 4 · Ant Design 6 · Three.js',
		period: '2026',
		desc: 'Ce site : sections plein écran, fond en 3D, formulaire de contact et environnement reproductible avec Bun et un Dev Container.',
		link: {
			href: 'https://github.com/NemBaboulinet/portfolio',
			label: 'Voir sur GitHub',
		},
	},
];
