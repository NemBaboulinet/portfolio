# 🚀 Portfolio - Guide d'Installation sur Windows 11

Ce projet est un portfolio construit avec **React**, **TypeScript (TSX)** et le runtime **Bun**, configuré pour s'exécuter dans un conteneur de développement (**Dev Container**) et servi localement par un serveur web **Apache (httpd)** hébergé dans le conteneur.

Ce guide explique pas-à-pas comment installer, configurer et builder ce projet sous **Windows 11**.

---

## 🛠️ Prérequis sur Windows 11

Pour exécuter ce projet avec le Dev Container sur Windows 11, vous devez installer et configurer les outils suivants :

### 1. Activer et installer WSL 2 (Windows Subsystem for Linux)
Les Dev Containers sous Windows fonctionnent de manière optimale avec WSL 2.
1. Ouvrez **PowerShell** ou l'**Invite de commandes** en mode **Administrateur**.
2. Exécutez la commande suivante :
   ```powershell
   wsl --install
   ```
3. Redémarrez votre ordinateur si nécessaire.
4. Au redémarrage, terminez l'installation de la distribution Linux par défaut (Ubuntu) en configurant votre nom d'utilisateur et votre mot de passe dans le terminal qui s'ouvre.

### 2. Installer Docker Desktop pour Windows
1. Téléchargez et installez [Docker Desktop pour Windows](https://www.docker.com/products/docker-desktop/).
2. Lors de l'installation, veillez à cocher l'option **"Use the WSL 2 based engine"** (Utiliser le moteur basé sur WSL 2).
3. Une fois installé et démarré, ouvrez les paramètres de Docker Desktop (`Settings` > `Resources` > `WSL Integration`) et assurez-vous que l'intégration est activée pour votre distribution Linux par défaut (ex. `Ubuntu`).

### 3. Configurer Git pour Windows
1. Téléchargez et installez [Git pour Windows](https://git-scm.com/download/win).
2. **Recommandation critique sur les sauts de ligne (LF vs CRLF) :**
   Pour éviter les conflits de format de fin de ligne entre Windows (CRLF) et Linux/Docker (LF), ouvrez **PowerShell** et exécutez la commande globale suivante :
   ```powershell
   git config --global core.autocrlf input
   ```

### 4. Installer VS Code et l'extension Dev Containers
1. Installez [Visual Studio Code](https://code.visualstudio.com/).
2. Ouvrez VS Code, accédez aux extensions (`Ctrl+Shift+X`), et installez l'extension officielle :
   - **Dev Containers** (`ms-vscode-remote.remote-containers`)

---

## 🚀 Cloner et Ouvrir le Projet

> [!TIP]
> **Performance recommandée :** 
> Le partage de fichiers entre le système hôte Windows (`C:\...` ou `/mnt/c/...`) et Docker peut être ralenti par des conversions de système de fichiers.
> Il est **fortement recommandé** de cloner le projet directement dans le système de fichiers de WSL 2 (ex: `/home/votre-nom/Portfolio`).

### Option A : Cloner directement dans WSL 2 (Recommandé)
1. Ouvrez votre terminal WSL 2 (ex. Ubuntu).
2. Clonez le dépôt et naviguez dans le dossier :
   ```bash
   git clone <URL_DU_DEPOT>
   cd Portfolio
   ```
3. Ouvrez le dossier dans VS Code :
   ```bash
   code .
   ```
4. VS Code détectera automatiquement la configuration du Dev Container et affichera une notification en bas à droite : **"Reopen in Container"** (Réouvrir dans le conteneur). Cliquez dessus.
   *(Si le pop-up n'apparaît pas, ouvrez la palette de commandes via `Ctrl+Shift+P` ou `F1`, tapez `Dev Containers: Reopen in Container` et validez).*

### Option B : Cloner sous Windows
1. Clonez le dépôt sous Windows :
   ```powershell
   git clone <URL_DU_DEPOT>
   ```
2. Ouvrez VS Code, allez dans `Fichier` > `Ouvrir le dossier...` et sélectionnez le dossier `Portfolio`.
3. Cliquez sur **"Reopen in Container"** dans le pop-up en bas à droite.

---

## 🐳 Initialisation automatique des Dépendances

Une fois que VS Code a démarré le conteneur :
- Docker télécharge l'image de base et installe Apache2.
- L'extension VS Code pour Bun s'installe automatiquement dans l'éditeur.
- La tâche de création (`postCreateCommand` définie dans [.devcontainer/devcontainer.json](file:///home/baboulinet/Arbeit/Portfolio/.devcontainer/devcontainer.json)) exécute automatiquement l'installation des dépendances avec :
  ```bash
  bun install
  ```
  et lance un premier linter pour s'assurer que tout est en ordre.

Vous n'avez pas besoin d'installer de dépendances manuellement sur votre machine hôte Windows.

---

## 🛠️ Utilisation et Flux de Travail dans le Conteneur

Une fois connecté au conteneur, utilisez le terminal intégré de VS Code pour exécuter les commandes suivantes définies dans le fichier [package.json](file:///home/baboulinet/Arbeit/Portfolio/package.json) :

### 1. Mode Serveur de Développement Vite classique (HMR)
Pour développer avec le rechargement à chaud (Hot Module Replacement) :
```bash
bun run dev
```
- Le serveur de développement démarre et est accessible sur [http://localhost:5173](http://localhost:5173).
- Ouvrez cette adresse dans votre navigateur sous Windows.

### 2. Compilation continue et service par Apache (Simuler la production)
Dans cette configuration, **Bun** compile en continu l'application dans le répertoire `dist/`, et **Apache** se charge de servir les fichiers statiques de ce répertoire sur le port `80`.
```bash
bun run build --watch
```
- Ouvrez votre navigateur sur [http://localhost](http://localhost) (Port `80`).
- Toute modification de vos fichiers `.tsx` déclenchera instantanément une recompilation et Apache servira les nouveaux fichiers à la volée.

> [!NOTE]
> La réécriture d'URL est pré-configurée (`mod_rewrite` dans Apache via le fichier [.devcontainer/apache-vhost.conf](file:///home/baboulinet/Arbeit/Portfolio/.devcontainer/apache-vhost.conf)) pour rediriger toutes les requêtes virtuelles vers `index.html`, ce qui permet d'utiliser des routeurs côté client (comme React Router) sans erreur 404 lors du rafraîchissement d'une page.

### 3. Compiler pour la Production (Build)
Pour générer les fichiers de production optimisés dans le dossier `dist/` :
```bash
bun run build
```

### 4. Linter & Formateur
- **Vérifier les erreurs de style et de type :**
  ```bash
  bun run lint
  ```
- **Corriger automatiquement les erreurs :**
  ```bash
  bun run lint-fix
  ```
- **Formater le code :**
  ```bash
  bun run format
  ```

---

## 📂 Configuration du Dev Container

L'environnement de développement est structuré autour des fichiers suivants :
- **[.devcontainer/devcontainer.json](file:///home/baboulinet/Arbeit/Portfolio/.devcontainer/devcontainer.json)** : Configure le conteneur, installe les extensions VS Code, mappe les ports (`80` et `5173`), et gère le cycle de vie de l'initialisation.
- **[.devcontainer/Dockerfile](file:///home/baboulinet/Arbeit/Portfolio/.devcontainer/Dockerfile)** : Construit le conteneur sous Ubuntu en y installant Apache2 et en activant le module de réécriture `mod_rewrite`.
- **[.devcontainer/apache-vhost.conf](file:///home/baboulinet/Arbeit/Portfolio/.devcontainer/apache-vhost.conf)** : Configure l'hôte virtuel Apache pour pointer vers le dossier `/workspaces/Portfolio/dist` avec support pour les Single Page Applications (SPA).
