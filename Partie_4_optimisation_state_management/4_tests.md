# Mettez votre logique Redux à l’épreuve avec les tests

Si je lance un `npm run test` dans Shiny React comme ça, on peut voir que les tests plantent avec un message de la forme `could not find react-redux context value; please ensure the component is wrapped in a <Provider>`.

On peut déjà temporairement ignorer les tests relou avec un `it.skip()`, en mettant `it.skip('should display the results after the data...` au lieu de `it('should display...)` par exemple.

