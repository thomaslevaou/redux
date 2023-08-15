# Utilisez tout le potentiel des Selectors

Notons que même si on peut toujours techniquement utiliser des props pour transmettre certaines données existant déjà dans le state global, la documentation officielle de Redux recommande de connecter autant que possible les composants au store global, pour des raisons de performance.

Au lieu d'avoir un simple retour quand on utilise `useSelector` (`useSelector((state) => state.playing);` par exemple), on peut utiliser la fonction fléchée en paramètre de ce hook pour simplifier certains traitements.

Pour faciliter certaines abstractions / factorisations de code, on va aussi créer des fonctions retournant des fonctions qu'on pourra utiliser avec `useSelector`. Ces nouvelles fonctions seront, par convention ici, placées dans un nouveau fichier `selectors.js`.

Pour des exemples plus parlants, voir `PlayerScore.js`.

Attention à ne pas retourner de tableau ou d'objet dans une référence ! En effet, comme une nouvelle référence est crée à chaque appel (contrairement aux types primitifs où le re-render ne se fera que si la valeur change), ça va plomber les performances du composant. Quitte à avoir deux selectors au lieu d'un pour récupérer deux informations dans un objet, par exemple. Au pire du pire, on peut utiliser une biblio comme `reselect`, mais ce sera hors-scope de ce cours.