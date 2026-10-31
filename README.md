# Lara Academy · React consomme l'API du cours PHP → Node

`api/` : le mini CRUD et le login du cours Node, reconstruits avec des réponses JSON (Express, MySQL, bcrypt, JWT).
`web/` : le front React du cours.

## Récupérer le code

Adresse du dépôt public : **à renseigner**.

```sh
git clone <adresse du dépôt, à renseigner> lara-react-api
cd lara-react-api
```

## Lancer le projet

Node.js 24 et MySQL 8 sont nécessaires. Sans MySQL installé : `docker compose up -d` depuis ce dossier, puis attendre quelques secondes que la base démarre.

```sh
cd api
cp .env.example .env   # puis remplacer JWT_SECRET
npm ci
npm run db:init        # crée la table users et les comptes de démonstration
npm run dev
```

Dans un deuxième terminal :

```sh
cd web
npm ci
npm run dev
```

Ouvrir l'adresse affichée par Vite, en général `http://127.0.0.1:5173`. L'API doit tourner sur le port 3000.

Compte de démonstration : `sara@example.com` / `demo-sara-123`. Il sert seulement en local.

## Se placer sur une étape du cours

Chaque étape de la vidéo est un tag Git. La liste complète, avec les fichiers modifiés et le résultat attendu, est dans [STAGES.md](STAGES.md).

```sh
git tag                     # liste les étapes
git checkout ch03-effect    # se place sur une étape
git diff ch03-effect ch04-etats   # montre ce qui change entre deux étapes
git checkout main           # revient à la version finale
```

- Les dépendances sont les mêmes à toutes les étapes : `npm ci` une seule fois suffit.
- Après un changement d'étape, si l'API ne redémarre pas toute seule, l'arrêter puis relancer `npm run dev`.
- Pour retrouver exactement les 3 comptes de démonstration après tes essais : `npm run db:reset` dans `api/`. Cette commande efface la table `users` puis la recrée.
- Aux tags `ch01-boucle` et `ch02-api`, le front envoie des requêtes sans s'arrêter : c'est le bug montré dans la vidéo. Ferme l'onglet après avoir regardé Network.
- Si tu modifies du code sur une étape, range-le avant de changer de tag : `git stash` le met de côté, ou `git switch -c mon-essai` le garde sur ta propre branche.
