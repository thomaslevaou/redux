# Unifiez actions et reducers grâce aux slices de Redux-Toolkit

L'idée des `slices` de Redux-toolkit est de créer des actions et un reducer, en un seul appel de fonction.

Elle s'utilise comme maintenant utilisée dans `theme.js`, par exemple.

Pour récupérer les actions, on doit récupérer le retour de `createSlice`, qui contient les actions et le reducer.
Et en déstructurant les actions, on obtient nos actions de notre besoin (`set` et `toggle` dans notre exemple).

On passe par un `import * as` pour importer ces nouvelles manières d'avoir nos actions dans nos composants React ensuite.

Dans le slice, la valeur de l'action peut être un objet au lieu d'une fonction, ce qui peut être utile pour préciser le comportement du payload. Dans ce cas, le reducer "final" devra être précisé dans l'attribut `reducer`.