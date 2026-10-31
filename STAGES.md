# Les étapes du cours

Pour chaque tag : `git checkout <tag>`, puis `npm run db:reset` dans `api/` pour repartir des 3 comptes. Voir le README pour lancer l'API et le front.

Les fichiers indiqués sont ceux qui changent par rapport à l'étape précédente. Compte de démonstration : `sara@example.com` / `demo-sara-123`.

## ch01-boucle

Fichiers : tout le projet de départ. API en lecture seule (`GET /api/users`), `web/src/App.jsx` affiche `Users` directement, `web/src/Users.jsx` appelle `fetch` dans le corps du composant.

Résultat attendu : la liste s'affiche, mais le compteur de Network monte sans s'arrêter (2760 requêtes en 3 secondes lors du test ; le nombre dépend de la machine). Pas de token ni de `requireJwt`. Ferme l'onglet après avoir regardé.

## ch02-api

Fichiers : `api/app.js`, `api/routes/users.js`, `api/routes/auth.js`, `api/controllers/userController.js`, `api/controllers/authController.js`, `api/models/userModel.js`, `api/middleware/requireJwt.js`.

Résultat attendu : `GET`, `POST`, `PUT` et `DELETE` sur `/api/users` répondent en JSON, sans token. `/api/users` renvoie `id`, `nom`, `email`, jamais le mot de passe. `requireJwt` existe mais ne protège pas encore `/api/users`. Le front n'a pas changé : il boucle encore.

## ch03-effect

Fichiers : `web/src/Users.jsx`.

Résultat attendu : `useEffect` avec `[]`, fonction `async` interne et `ignore`. Network s'arrête à 2 requêtes en développement à cause de StrictMode, 1 après `npm run build` et `npm run preview`. Si la réponse du premier passage arrive après la seconde, elle est ignorée. Essai possible : écrire `async` directement devant la fonction de `useEffect` donne l'avertissement de React dans la console, puis l'erreur `destroy is not a function` et une page vide.

## ch04-etats-debut

Fichiers : `web/src/Users.jsx`.

Résultat attendu : réseau ralenti, le message « Chargement… » s'affiche. MySQL coupé puis page rechargée : Network montre 500, `fetch` ne passe pas par `catch`, `users.map` casse le rendu et la page devient vide.

## ch04-etats

Fichiers : `web/src/Users.jsx`.

Résultat attendu : MySQL coupé, le message « Erreur 500 » et le bouton Réessayer s'affichent. Offline dans le navigateur puis Réessayer : `Failed to fetch` (texte de Chrome). Offline retiré, MySQL rallumé, Réessayer : la liste revient sans recharger la page.

## ch05-ajout

Fichiers : `web/src/UserForm.jsx`, `web/src/Users.jsx`, puis `web/src/api.js`. Deux commits : le POST écrit à la main dans le handler (commit sans tag), puis `request` dans `api.js` (ce tag).

Résultat attendu : l'ajout fait un seul `POST`, sans recharger la liste, et le formulaire se vide. L'email de Sara une deuxième fois : 409, « Cet email existe déjà. » sous le formulaire, qui reste rempli.

## ch06-crud

Fichiers : `web/src/UserRow.jsx`, `web/src/Users.jsx`, `web/src/api.js`.

Résultat attendu : Modifier ouvre deux champs sur la ligne, Enregistrer envoie un seul `PUT /api/users/:id`. Après rechargement, le nouveau nom est toujours là. Supprimer envoie un `DELETE`, et la ligne ne revient pas après rechargement. Aucune connexion n'est demandée.

## ch07-login

Fichiers : `web/src/LoginForm.jsx`, `web/src/App.jsx`.

Résultat attendu : mauvais mot de passe et email inconnu donnent le même message, « Email ou mot de passe incorrect. ». La connexion renvoie `token` et `user` (onglet Response de Network), le token contient `userId` et expire après 1 heure. Le header affiche « Mer7ba Sara » et Déconnexion. Les routes restent ouvertes : `curl -X DELETE http://127.0.0.1:3000/api/users/3` répond 204.

## ch08-avant-bearer

Fichiers : `api/routes/users.js`.

Résultat attendu : le même `curl` répond 401. Déconnexion puis connexion : « Connexion requise. » et Réessayer, 401 dans Network, pas de header `Authorization` dans la requête.

## ch08-bearer

Fichiers : `web/src/api.js`, `web/src/App.jsx`, `web/src/Users.jsx`.

Résultat attendu : la liste revient et chaque requête porte `Authorization: Bearer <token>`. Un token altéré reçoit 401. Après Déconnexion, un token copié reste valide jusqu'à son expiration. Un rechargement de la page ramène au formulaire de connexion.

## ch09-filtre

Fichiers : `web/src/Users.jsx`.

Résultat attendu : la recherche filtre au rendu, sans requête ni state supplémentaire pour le résultat. Une recherche sans résultat affiche « Aucun utilisateur trouvé. », et vider le champ rend la liste complète.

## final

Même commit que `ch09-filtre` : le code de la fin de la vidéo.
