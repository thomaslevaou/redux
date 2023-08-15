# Utilisez combineReducers pour faciliter l’ajout de nouvelles fonctionnalités

On va faire appel à la fonction **combineReducers** pour répartir chaque partie du state à un sous-reducer différent (comme ça a déjà été fait dans LaBO à Label Emmaüs, donc je vais passer assez vite sur ce chapitre).

Dans le contexte de l'application Shiny, on va faire appel à un `usersReducer` pour la partie du state qui concerne les users, et de manière analogue un `postsReducer` et un `darkModeReducer`.

Utiliser une sous-partie du state, si la sous-partie est un type primitif (genre un booléen), alors ça veut dire que le sous-reducer associé sera aussi un type primitif (comme un booléen dans l'exemple d'openclassrooms). Deux sous-reducers peuvent quand même écouter la même action, si une action peut s'appliquer à deux sous-reducers différents concernés. On dit que les actions restent _globales_.

On peut alors créer un objet reducer, dans lequel on va combiner les deux sous-reducers dans un objet.
Enfin techniquement, ça pourrait marcher comme ça. Mais le problème, c'est que comme cette manière de faire créer un nouvel objet à chaque appel du reducer (même si rien n'a changé). Et c'est pour pallier à ce problème qu'on fait appel à la fonction `combineReducers`.

Une bonne pratique quand on utilise plusieurs reducers est de préfixer les actions, par exemple ici avec `darkMode/toggle` pour une action de toggle qui ne concerne que le reducer du darkmode.

Plusieurs organisations de fichier existent, mais celle recommandée par Redux est **l'organisation par fonctionnalité** (feature organisation).
Par exemple, on peut avoir un truc comme ça

features
- darkMode
  - reducer.js
  - actions.js
  - darkModeButton.jsx
- users # autre exemple de fonctionnalité
- posts
etc...

On peut aussi modifier le nom de `reducer.js` en `darkModeButton.reducer.js` par exemple.

Dans le projet de ce cours, les actions et reducers associés sont directement dans le fichier du composant.
Le store et les fonctions pour sélectors seront respectivement dans `store.js` et `selectors.js`.

On va cloner et utiliser le projet Shiny, je ne pourrai donc plus ajouter le code sur lequel je vais travailler dans ce suivi de cours. Enfin pour la partie API. Pour la partie React, ça baigne.
