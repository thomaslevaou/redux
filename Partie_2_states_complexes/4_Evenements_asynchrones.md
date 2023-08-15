# Adaptez vos actions pour manipuler des événements asynchrones

Le hook `useStore` permet d'appeler le store dans notre composant.
C'est très similaire au `import { store } from "./store";` qu'on fait dans `index.js`, à la différence que le fait d'utiliser `useStore` permettra de simplifier l'utilisation des tests unitaires ensuite.