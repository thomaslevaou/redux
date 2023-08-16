# Implication de Redux dans une app React

Attention le projet servant de référence pour le cours (<https://github.com/OpenClassrooms-Student-Center/7150626-Redux-Tennis-Score>) tourne en Node **16** (pas 18) et avec yarn (pas npm).

On va faire tourner Redux avec React en utilisant la bibliothèque **React-Redux**. On pourrait techniquement s'en passer (en mettant par exemple des `ReactDOM.render()` dans le `store.subscribe()` de Redux), mais ça poserait des problèmes d'utilisation et de performance par rapport à la bibliothèque qu'on va utiliser.

J'initie le projet "from scratch" (pas celui du cours) dans notre repo git.

Commande utilisée :

```bash
npx create-react-app tennis-score
```

Pour lancer le projet, j'utiliserai `yarn` (pas `npm`) pour rester homogène avec le tuto (et ainsi éviter de perdre du temps sur de sales bugs...).

Comme indiqué dans le tuto, j'importe progressivement le css du projet "tennis-score" pour bien comprendre l'utilisation de Redux "from scratch".

L'installation de React-redux se fait ici via un `yarn add redux react-redux`.

Comme l'indique mon VS code, je vais essayer d'utiliser `configureStore` à la place de `createStore`, cette dernière fonction étant dépréciée. Si vraiment ça me pose souci, je repasserai à `createStore`, mais je verrai bien si ça se produit d'ici là. En fait `configureStore` n'est pas reconnu par mon implémentation de Redux actuelle, donc pour éviter de perdre des heures sur ce problème, je vais pour le moment rester sur `createStore`.

On va utiliser des custom hooks de React-Redux pour utiliser Redux dans notre projet React.

Notamment `useDispatch` pour pouvoir utiliser la fonction `dispatch` du store Redux (qui est pour rappel l'équivalent de `setState`, mais pour mettre à jour le state global, et je pense que ça évite de passer par des props comme j'ai fait dans LaBO / c'est la manière la plus propre d'appeler dispatch en redux aujourd'hui, avec le moins de code parasite possible). Et pour utiliser le state Redux dans nos composants, on va utiliser `useSelector`. Même si la fonction `getState` existe, on préférera utiliser `useSelector` dans nos composants React fonction ici, car `useSelector` met le composant à jour lorsque le state change (et non, `getState` n'a pas l'air de faire ça).
Le hook `useDispatch` ne prend aucun paramètre.
Le hook `useSelector` prend toujours une fonction en paramètre. Cette fonction de selector est executée non seulement quand le state global change, mais aussi quand le composant est mis à jour (même si le retour n'est pas dans le state...), car les paramètres de la fonction selector peuvent avoir changé et Redux doit le vérifier.

On n'a donc plus besoin d'utilier `store.subscribe()`, le hook `useSelector` s'en occupe.

Comme en Redux à classe, l'application globale doit être enveloppée (wrappée) par un Provider global contenant le store en prop pour fonctionner.

On modifie donc le fichier `index.js` (attention, pas `App.js`).

Quand on regarde le code de la fonction `playPause` et de `reducer`  dans `store.js`, on constate bien au commit `edf62728f916e0c2470306f8126d7b3cf9321ee2` qu'on appelle le custom hook `useDispatch` pour mettre à jour le state global avec le retour de l'action `playPause`, qui appelle automatiquement le reducer pour mettre à jour ce state global. Cette nouvelle valeur est affichée dans le composant `Display` via l'appel au hook custom `useSelector`, qui pour rappel à pour avantage par rapport à `getState` de re-render le composant à chaque fois le state global se met à jour.

En guise d'exercice, on va généraliser cette utilisation pour arriver au codepen de la partie précédente du cours sur Redux.

Attention on rappelle que les hooks ne peuvent jamais être utilisés dans une condition...
