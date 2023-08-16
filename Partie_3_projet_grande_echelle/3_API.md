# Interagissez avec des API

On va déplacer les traitements gérant les listes de freelances de l'application Shiny dans des traitements Redux.

La différence avec la logique du changement de thème, c'est que cette fois on va utiliser un code faisant appel à des API dans une logique Redux.

Une fois mis en place, la partie du state sur les `freelances` est visible dans le Redux-devtools.

En utilisant le paradigme Redux, la fonction qui va appeler l'API sera placée dans un `useEffect`.

En effet, même si ici l'action sera faite au chargement de la page, pour éviter que React ne considère le lancement de Redux ici comme un effet de bord, l'appel API devra être fait dans un `useEffect`. On va appliquer ce `useEffect` au `store`, mais comme il ne change jamais (store =/= state global), j'ai l'impression que ça revient à faire un `[]`