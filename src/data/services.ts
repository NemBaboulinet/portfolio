export interface Service {
	id: string;
	/** Nom de fichier affiché dans la barre de titre de la carte */
	file: string;
	name: string;
	desc: string;
	items: string[];
	stack: string;
}

export const SERVICES: Service[] = [
	{
		id: 'web',
		file: 'applications-web.md',
		name: 'Applications web',
		desc: 'Conception et développement d’applications web sur mesure, du front au back.',
		items: [
			'Interfaces React et TypeScript',
			'API et services Node.js',
			'Applications responsives, du prototype à la mise en ligne',
		],
		stack: 'React · TypeScript · Node.js · Tailwind',
	},
	{
		id: 'internal-tools',
		file: 'outils-internes.md',
		name: 'Outils internes',
		desc: 'Des interfaces métier pour piloter votre activité au quotidien.',
		items: [
			'Back-offices et formulaires métier',
			'Tableaux de bord et graphiques',
			'Intégration d’API tierces',
		],
		stack: 'React · Highcharts · Ant Design',
	},
	{
		id: 'legacy',
		file: 'reprise-de-code.md',
		name: 'Reprise de code',
		desc: 'Reprendre, fiabiliser et moderniser une base de code existante sans tout réécrire.',
		items: [
			'Migration de versions et de bibliothèques',
			'Refonte d’interfaces et de formulaires',
			'Correction de bugs et typage TypeScript',
		],
		stack: 'React · TypeScript · Ant Design',
	},
	{
		id: 'automation',
		file: 'automatisation.md',
		name: 'Automatisation',
		desc: 'Des scripts et des outils pour supprimer les tâches répétitives et fiabiliser vos opérations.',
		items: [
			'Scripts Bash et tâches planifiées',
			'Sauvegarde, restauration et mise à jour',
			'Notifications (Discord, e-mail)',
		],
		stack: 'Bash · Taskfile · Node.js',
	},
	{
		id: 'devops',
		file: 'devops.md',
		name: 'DevOps',
		desc: 'Des environnements reproductibles et des déploiements fiables, de la machine du développeur à la production.',
		items: [
			'Conteneurisation avec Docker Compose',
			'Environnements de développement (Dev Container)',
			'Intégration et déploiement continus',
		],
		stack: 'Docker · Dev Container · CI/CD',
	},
];
