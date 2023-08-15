# Implication de Redux dans une app React

Attention le projet servant de référence pour le cours (<https://github.com/OpenClassrooms-Student-Center/7150626-Redux-Tennis-Score>) tourne en Node **16** (pas 18) et avec yarn (pas npm).

On va faire tourner Redux avec React en utilisant la bibliothèque **React-Redux**. On pourrait techniquement s'en passer (en mettant par exemple des `ReactDOM.render()` dans le `store.subscribe()` de Redux), mais ça poserait des problèmes d'utilisation et de performance par rapport à la bibliothèque qu'on va utiliser.

J'initie le projet "from scratch" (pas celui du cours) dans notre repo git.

Commandes utilisées :

```bash
npx create-react-app tennis-score
```

Pour lancer le projet, j'utiliserai `yarn` (pas `npm`) pour rester homogène avec le tuto (et ainsi éviter de perdre du temps sur de sales bugs...).

Comme indiqué dans le tuto, j'importe progressivement le css du projet "tennis-score" pour bien comprendre l'utilisation de Redux "from scratch".

L'installation de React-redux se fait ici via un `yarn add redux react-redux`.

Comme l'indique mon VS code, je vais essayer d'utiliser `configureStore` à la place de `createStore`, cette dernière fonction étant dépréciée. Si vraiment ça me pose souci, je repasserai à `createStore`, mais je verrai bien si ça se produit d'ici là.