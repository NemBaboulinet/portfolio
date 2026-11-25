# Portfolio

Portfolio one-page de développeur freelance : présentation, projets, services, historique Git et formulaire de contact.

## Stack

- **React 18** + **TypeScript**, bundlé avec **Vite**
- **Tailwind CSS 4** et **Ant Design 6** pour l'interface
- **three.js** / **@react-three/fiber** pour le fond animé
- **Formspree** pour le formulaire de contact
- **Vercel** pour l'hébergement et **@vercel/analytics**
- **Bun** comme gestionnaire de paquets et runtime

## Démarrage rapide

```bash
bun install
cp .env.example .env.local   # puis renseigner VITE_FORMSPREE_ENDPOINT
bun run dev                  # http://localhost:5173
```

## Variables d'environnement

| Variable                  | Rôle                                                      |
| ------------------------- | --------------------------------------------------------- |
| `VITE_FORMSPREE_ENDPOINT` | URL du formulaire Formspree (`https://formspree.io/f/xxx`) |

Sans cette variable, l'envoi du formulaire de contact échoue. Sur Vercel, la définir dans *Project Settings → Environment Variables*.

## Scripts

| Commande              | Action                                   |
| --------------------- | ---------------------------------------- |
| `bun run dev`         | Serveur de dev Vite (HMR)                |
| `bun run build`       | Build de production dans `dist/`         |
| `bun run preview`     | Prévisualise le build                    |
| `bun run lint`        | ESLint                                   |
| `bun run lint-fix`    | ESLint avec correction automatique       |
| `bun run format`      | Prettier sur `src/`                      |

## Export des statistiques (optionnel)

Le dossier `scripts/analytics/` contient un script autonome (hors site, exclu du build, de Vercel et d'ESLint) qui exporte les statistiques **Vercel Web Analytics** (visiteurs, pages vues, sources, pages, pays) vers un fichier Excel, puis génère un tableau de bord HTML.

```bash
cd scripts/analytics
bun install
# créer scripts/analytics/.env avec les variables ci-dessous (jamais commité)
node export.mjs              # recalcule les 14 derniers jours
node export.mjs --since 2026-01-01 --from 2026-06-01
```

| Variable            | Rôle                                                   |
| ------------------- | ------------------------------------------------------ |
| `VERCEL_TOKEN`      | Jeton d'API Vercel (lecture des analytics), obligatoire |
| `VERCEL_PROJECT_ID` | Identifiant du projet Vercel, obligatoire              |
| `VERCEL_TEAM_SLUG`  | Slug de l'équipe, uniquement pour un projet d'équipe   |

- `--since AAAA-MM-JJ` : premier jour à (re)calculer. Sans option, les 14 derniers jours sont recalculés pour rattraper les jours manquants.
- `--from AAAA-MM-JJ` : début de la période affichée dans le dashboard. Le fichier Excel conserve tout l'historique.
- Sorties : `visiteurs.xlsx` et `dashboard.html`, générés localement.

> **Sécurité** : ne jamais commiter le jeton ni les fichiers générés. `.env`, `.env.local`, `*.xlsx` et `*.html` de ce dossier sont ignorés par Git, et les données de visite ne doivent pas être publiées.

## Structure

```
src/
├── App.tsx            # Assemble les sections et la navigation
├── components/        # Un composant par section (AboutMe, Projects, Services, ContactMe…)
└── data/
    ├── projects.ts    # Projets affichés (cadran + prévisualisation vidéo)
    ├── services.ts    # Cartes de services
    └── contact.ts     # Liens de contact (e-mail, LinkedIn, GitHub)
scripts/analytics/   # Export des statistiques Vercel (hors site)
public/
├── projects/          # Médias des projets (vidéo mp4/webm + poster)
└── kbPortfolio.png
```

Sections, dans l'ordre : Bienvenue, À propos, Projets, Services, Historique Git, Contact.

## Modifier le contenu

Le contenu se change dans `src/data/`, sans toucher aux composants.

- **Ajouter un projet** : ajouter un objet dans `PROJECTS` (`src/data/projects.ts`). `short` est le libellé du cadran, 14 caractères max. `preview` est optionnel : placer `video.mp4`, `video.webm` et `poster.jpg` dans `public/projects/<nom>/`.
- **Ajouter un service** : ajouter un objet dans `SERVICES` (`src/data/services.ts`).
- **Changer les liens de contact** : éditer `src/data/contact.ts`.

## Déploiement

Le site est déployé sur **Vercel** (build `bun run build`, sortie `dist/`). Penser à définir `VITE_FORMSPREE_ENDPOINT` dans les variables d'environnement du projet Vercel.

## Environnement de développement (Dev Container, optionnel)

Un Dev Container est fourni dans `.devcontainer/` (Ubuntu, Bun, Apache). Il permet de simuler la production : Bun compile en continu dans `dist/` et Apache sert ce dossier sur le port `80`, avec réécriture d'URL vers `index.html`.

1. Installer Docker et l'extension VS Code **Dev Containers**.
2. Ouvrir le dossier dans VS Code, puis *Reopen in Container*. `bun install` se lance automatiquement.
3. Au choix :
   - `bun run dev` → http://localhost:5173
   - `bun run build --watch` → http://localhost (Apache)

Sous Windows 11, cloner le dépôt dans le système de fichiers WSL 2 (et non `/mnt/c`) et configurer `git config --global core.autocrlf input` pour éviter les conflits de fins de ligne.
