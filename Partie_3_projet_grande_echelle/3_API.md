# Interagissez avec des API

On va déplacer les traitements gérant les listes de freelances de l'application Shiny dans des traitements Redux.

La différence avec la logique du changement de thème, c'est que cette fois on va utiliser un code faisant appel à des API dans une logique Redux.

Une fois mis en place, la partie du state sur les `freelances` est visible dans le Redux-devtools.

En utilisant le paradigme Redux, la fonction qui va appeler l'API sera placée dans un `useEffect`. En effet, si on ne fait pas ça, les freelances vont être appelées à chaque fois qu'un truc change sur la page (re-render du state), comme les autres variables. On rappelle que les variables sont réinitialisées à chaque re-render (contrairement au state qui les garde en mémoire) et le re-render peut arriver à chaque modification de variable ou du state, et qu'un changement de useRef ne provoque pas de re-render (alors que le state oui). Ici en utilisant useEffect, on appellera donc notre liste seulement au premier render du composant. Sa valeur sera conservée ensuite.

On va appliquer ce `useEffect` au `store`, mais comme il ne change jamais (store =/= state global), ça revient à faire un `[]`. C'est juste que le linter interdit ça (bizarre ça existe mais bon).