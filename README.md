# Workspace React + Bun + TSX sous Apache

Cet environnement de développement pré-configuré vous permet de développer une application React avec **TypeScript (TSX)** en utilisant le runtime ultra-rapide **Bun**, tout en servant l'application via un serveur web **Apache (httpd)** localisé dans le conteneur.

## 🚀 Démarrage Rapide

1. **Ouvrir le projet dans VS Code**
2. Lorsque VS Code le propose, cliquez sur **"Reopen in Container"** (Réouvrir dans le conteneur). Sinon, ouvrez la palette de commandes (`F1` ou `Ctrl+Shift+P`) et sélectionnez `Dev Containers: Reopen in Container`.
3. Une fois dans le conteneur, installez les dépendances :

   ```bash
   bun install
   ```

---

## 🛠️ Utilisation et Flux de Travail

### Option 1 : Compilation continue et service par Apache (Recommandé pour la production/tests réels)

Dans cette configuration, **Bun** compile en continu l'application vers le répertoire `dist/`, et **Apache** se charge de servir les fichiers statiques de ce répertoire sur le port `80`.

1. Lancez le watcher Bun :

   ```bash
   bun run build --watch
   ```

2. Ouvrez votre navigateur sur [http://localhost](http://localhost) (Port `80`).
3. Toute modification de vos fichiers `.tsx` déclenchera instantanément une recompilation et Apache servira les nouveaux fichiers à la volée.

*Note : La réécriture d'URL est configurée (`mod_rewrite` dans Apache) pour rediriger toutes les requêtes virtuelles vers `index.html`, ce qui permet d'utiliser des routeurs côté client (comme React Router) sans erreur 404 lors du rafraîchissement d'une page.*

### Option 2 : Mode Serveur de Développement Vite classique

Si vous préférez le rechargement à chaud (HMR - Hot Module Replacement) classique de Vite :

1. Lancez le serveur de développement :

   ```bash
   bun run dev
   ```

2. Ouvrez votre navigateur sur [http://localhost:5173](http://localhost:5173).

---

## 📂 Structure du Conteneur de Développement

- **[.devcontainer/devcontainer.json](file:///.devcontainer/devcontainer.json)** : Configure le conteneur, installe l'extension VS Code pour Bun, pré-configure Zsh, et mappe les ports.
- **[.devcontainer/Dockerfile](file:///.devcontainer/Dockerfile)** : Construit l'image système, installe Apache2 et active le module `mod_rewrite`.
- **[.devcontainer/apache-vhost.conf](file:///.devcontainer/apache-vhost.conf)** : Fichier de configuration Apache virtuel pour servir le dossier `/workspaces/Portfolio/dist` avec support des Single Page Applications (SPA).
