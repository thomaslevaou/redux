# Unifiez actions et reducers grâce aux slices de Redux-Toolkit

L'idée des `slices` de Redux-toolkit est de créer des actions et un reducer, en un seul appel de fonction.

Elle s'utilise comme maintenant utilisée dans `theme.js`, par exemple.

Pour récupérer les actions, on doit récupérer le retour de `createSlice`, qui contient les actions et le reducer.
Et en déstructurant les actions, on obtient nos actions de notre besoin (`set` et `toggle` dans notre exemple).

On passe par un `import * as` pour importer ces nouvelles manières d'avoir nos actions dans nos composants React ensuite.

Dans le slice, la valeur de l'action peut être un objet au lieu d'une fonction, ce qui peut être utile pour préciser le comportement du payload. Dans ce cas, le reducer "final" devra être précisé dans l'attribut `reducer` (cette fois au singulier). La fonction de précision de comportement sur le payload devra être précisée dans l'attribut `prepare`.
Notons que c'est donc dans un endroit "plus proche" du reducer, qu'on fait le traitement que nous réalisions avec `createAction` dans l'action.

Le reducer du slice fait automatiquement une copie par variable du state (donc pas besoin d'utiliser `immer`).

Avec tout au même endroit, le code se retrouve plus facile à maintenir.

Notons que dans `freelances`, on peut faire `(actions.resolved(data))` sans avoir précisé un `prepare` pour la gestion du data dans le payload. De la même manière qu'avec les `createActions`, l'ajout de la donnée dans le payload est ici implicite.

La dernière partie de l'exo consiste à utiliser les `slices` de `Redux` au lieu de `useContext` pour gérer les réponses dans `answers`.

Lors d'un createSlice, le `name` sert de préfixe à toutes les actions, cf code ci-dessous :

```JS
import { createSlice } from '@reduxjs/toolkit'

const themeSlice = createSlice({
    // le nom du slice
    name: 'theme',
    // le state initial
    initialState: 'light',
    // reducers permet de définir les actions et le reducer
    reducers: {
        // l'action toggle ('theme/toggle')
        toggle: (state) => {
            return state === 'light' ? 'dark' : 'light'
        },
        // l'action set ('theme/set')
        set: (state, action) => {
            return action.payload
        },
    },
})
```
