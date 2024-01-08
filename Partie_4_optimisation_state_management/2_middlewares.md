# Modifiez le fonctionnement de Redux grâce aux middlewares

Un `middleware` est une fonction qui va agir avant la réalisation de chaque action Redux.
Elle est utile quand on veut appliquer un traitement commun à toutes nos actions (un exemple au pif: afficher en console chaque nom d'action), sans avoir à l'écrire dans le reducer.

On peut alors appeler les middlewares qu'on souhaite via le paramètre à ce nom dans `configureStore`, une fois qu'on a créé ceux dont on a besoin.

Le middleware le plus couramment utilisé est le middleware `thunk`. C'est un middleware qui a la particularité de pouvoir récupérer et exécuter une fonction, si une fonction est envoyée en paramètre lors de l'appel à ce middleware, et à condition que la fonction ait pour paramètre le `dispatch` et le `getState` du store en paramètres, en plus de pouvoir appliquer un traitement commun à n'importe quelle action (rôle standard du middleware).

Genre c'est un truc comme ça quoi :

```JS
const thunkMiddleware = (store) => (next) => (action) => {
    // si l'action est une fonction...
    if (typeof action === 'function') {
        // on l'exécute avec `dispatch` et `getState` en paramètre
        return action(store.dispatch, store.getState)
    }
    // sinon on envoie l'action au reducer
    return next(action)
}
```

On voit bien que l'action n'est donc pas envoyée au reducer, si le middleware thunk a reçu une fonction en paramètre.

Le middleware thunk est installé par défaut avec Redux-Toolkit. Une fonction qui a pour but d'être appelée par le thunk middleware est appelée un `thunk`.

Attention, les thunks n'apparaissent pas dans les devtools redux : seuls les actions objets apparaissent dessus.
Dans le projet Shiny, utiliser thunk permet de simplifier un peu l'appel asynchrone à "fetch or update freelances".

Dans LaBO à Label Emmaüs, appeler de manière asynchrone `loadFormSchemaThunk` n'est pas une "mauvaise idée" en soi (si cette fonction a bien besoin de dispatch en paramètre), mais elle est mal gérée par l'appel à ce même thunk lors de l'affichage du catalogue. En gros, pour que ça marche, il faudrait mettre un logo de chargement sur le formulaire, et faire en sorte qu'il se recharge lorsque ce thunk est appelé (de manière similaire au `fetchOrUpdateFreelances` ici).

Le store en général est synchrone, c'est seulement lorsque nous on veut mettre en place des actions asynchrones (par exemple, lors d'appels API) qu'il ne l'est plus. C'est pour ça que je pense que le code de la leaving confirmation modal pourrait être amélioré.

Dans Shiny, on peut en tout cas appeler le thunk avec `dispatch` (dans un `useEffect` de `Freelances`, maintenant supprimée), sans avoir besoin d'appeler le store via `useStore`.

Pour envoyer des paramètres supplémentaires à un thunk, on doit créer une fonction qui retourne un thunk. On appelle ce genre de fonction un `thunk creator`, comme utilisé pour récupérer les données d'un seul freelance.

En général, on utilisera les thunks quand on devra faire des appels API qui ont besoin du state redux et/ou qui le modifient à son retour.
On pourrait s'en servir dans plein d'endroits sur LaBO, à condition de ne pas faire n'importe quoi avec.

En soi, on pourrait s'en servir pour optimiser le nb de lignes de codes de tous les appels asynchrones à des API faits dans LaBO. À voir en fonction du bordel que ça engendrerait.