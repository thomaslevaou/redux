# Interagissez avec des API

On va déplacer les traitements gérant les listes de freelances de l'application Shiny dans des traitements Redux.

La différence avec la logique du changement de thème, c'est que cette fois on va utiliser un code faisant appel à des API dans une logique Redux.

Une fois mis en place, la partie du state sur les `freelances` est visible dans le Redux-devtools.

En utilisant le paradigme Redux, la fonction qui va appeler l'API sera placée dans un `useEffect`. En effet, si on ne fait pas ça, les freelances vont être appelées à chaque fois qu'un truc change sur la page (re-render du state), comme les autres variables. On rappelle que les variables sont réinitialisées à chaque re-render (contrairement au state qui les garde en mémoire) et le re-render peut arriver à chaque modification de variable ou du state, et qu'un changement de useRef ne provoque pas de re-render (alors que le state oui). Ici en utilisant useEffect, on appellera donc notre liste seulement au premier render du composant. Sa valeur sera conservée ensuite.

On va appliquer ce `useEffect` au `store`, mais comme il ne change jamais (store =/= state global), ça revient à faire un `[]`. C'est juste que le linter interdit ça (bizarre ça existe mais bon).

Notons qu'avec un chargement via Redux comme on a fait pour la liste de freelances, on peut quitter et revenir sur la page, et on aura la liste précédente qui sera gardée en mémoire pendant le fetch de la nouvelle (ce qui n'était pas le cas avec notre custom hook `useFetch`).

Attention à normaliser les données quand un front utilise une API, mais ça je le sais déjà.

On recommande de lancer une requête à chaque fois qu'on doit voir une donnée en lecture (ne pas modifier le sate manuellement), et d'utiliser un status pour suivre le résultat de la requête (ce qui permet de gérer le loader comme on a vu ici).

Le fait de mettre les status dans le state permet de ne pas avoir à gérer des booléens à déplacer entre les appels API et le composant, genre pour savoir si l'appel est en cours ou s'il y a eu une erreur par exemple. C'est juste une bonne pratique pour bien gérer les données. Sachant qu'on met les data quand il y a une data, et que c'est géré grâce aux actions. À retester pendant l'exercice (et voir dans quelle mesure appliquer ça dans LaBO ensuite ?).

Le code que j'ai mis pour gérer les détails d'un freelance relève plus de la blague. Le code de la correction fait foi !

En vrai pour éviter des temps de chargement où il y a des data partielles au lieu de rien, on pourrait mixer les solution du tableau général et le state tel que donné dans la correction. Mais la flemme pour juste un exo.

On peut gérer des chargements de plusieurs freelances en même temps avec un status pour chaque freelance (comme proposé dans la correction). Ce n'est pas utile dans l'état actuel de l'appli, mais pourquoi pas pour la suite. Sinon on aurait pu mettre un seul statut pour tous, si on n'avait besoin d'en charger qu'un à la fois. Pareil pour les erreurs : en cas d'un seul chargement à la fois, on ne peut stocker que la dernière erreur.

Ce qui est important c'est surtout de regrouper les données dans le state pour éviter d'avoir à charger deux fois le même freelance avec rien à l'écran au début. Comme ça, quand on repasse sur le même profil, sa dernière donnée est déjà chargée quand on arrive dessus, même si elle n'est pas 100% accurate si la donnée a changé côté serveur, pendant les premières secondes. Donc, certains clients préféreront un loader, mais au moins maintenant on a le choix.

