# Écrivez moins de code grâce à Redux Toolkit

Le **Redux-toolkit** est un projet permettant de réduire les quantités de code ("boilerplate") qu'on écrit en Redux.

On l'installe avec `yarn add @reduxjs/toolkit`.

Dans le cadre de ce cours, on va surtout l'utiliser pour simplifier des créations de store avec `configureStore`, `createAction` pour les actions, ainsi que `createReducer` pour les reduces (et notre utilisation d'Immer).

## configureStore

Permet de créer un store utilisant directement `combineReducers`, et sans avoir besoin d'une bidouille pour utiliser les Redux Dev Tools.

La création du store dans `shiny-react/src/utils/store.js` s'en retrouve ainsi bien plus simplifiée.

Ceci m'évite aussi le message de dépréciation à l'utilisation de `createStore` dans VS Code.

## createAction

Génère automatiquement un action creator, c'est-à-dire que le code là :

```JS
export const toggleTheme = () => ({ type: TOGGLE_THEME })
```

Peut être replacé par :

```JS
export const toggleTheme = createAction('theme/toggle');
```

Sachant que si j'envoie un paramètre à cette nouvelle fonction créée (par exemple, `toggleTheme('light')`), alors cette valeur en paramètre sera automatiquement envoyée dans un `payload` dans l'action.

On peut aussi utiliser une fonction en 2nd paramètre de `createAction` :

```JS
const freelanceResolved = createAction(
    'freelance/resolved',
    (freelanceId, data) => ({
        payload: { freelanceId, data },
    })
)
```

Mais attention parce que dans ce cas, la valeur à droite de `payload` devra obligatoirement être un objet !
