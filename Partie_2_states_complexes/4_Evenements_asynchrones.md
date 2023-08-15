# Adaptez vos actions pour manipuler des événements asynchrones

Redux ne peut pas manipuler du code asynchrone comme `setTimeOut`. C'est pourquoi, dans ce genre de situation précisément, au lieu d'appeler `useSelector` et `useDispatch` pour manipuler une partie du state comme on a fait jusqu'à maintenant, on va importer le `store` et utiliser "à la main" sont `getState` et son `dispatch`, en prenant comme exemple l'autoplay, qui est la fonction réagissant au clic du bouton play / pause.

Le hook `useStore` permet d'appeler le store dans notre composant.
C'est très similaire au `import { store } from "./store";` qu'on fait dans `index.js`, à la différence que le fait d'utiliser `useStore` permettra de simplifier l'utilisation des tests unitaires ensuite.

On peut mettre le `store` en praramètre d'une fonction, ce qui peut être pratique pour éviter des fonctions trop longues dans un composant.