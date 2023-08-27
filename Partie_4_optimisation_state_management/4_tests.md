# Mettez votre logique Redux à l’épreuve avec les tests

Si je lance un `npm run test` dans Shiny React comme ça, on peut voir que les tests plantent avec un message de la forme `could not find react-redux context value; please ensure the component is wrapped in a <Provider>`.

On peut déjà temporairement ignorer les tests relou avec un `it.skip()`, en mettant `it.skip('should display the results after the data...` au lieu de `it('should display...)` par exemple.

Un exemple de test est d'appeler une action, et de vérifier qu'elle affiche bien un objet attendu (comme avec `themeActions` par exemple).

On peut aussi tester les reducers, en lançant une action et en vérifiant que le nouveau state a bien pris la nouvelle action en compte.

Ça fait un petit filet de sécurité sur notre redux comme ça, par exemple.
