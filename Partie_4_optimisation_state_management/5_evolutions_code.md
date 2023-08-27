# Adaptez votre utilisation de Redux aux évolutions du code

En React standard, le hook `useReducer` permet de faire un `useState` pour simplifier l'utilisation de certains states (comme j'ai vu avec mon incrémentation dans LaBO une fois). Mais il n'est applicable que de manière locale, dans un composant (pas dans une application entière), et **ne remplace donc pas Redux**.

Si on a besoin d'utiliser plusieurs actions asynchrones en Redux un jour, on peut faire appel à `Redux-Saga`.

**React-Query** est un autre système de state management, compatible avec React uniquement (sans Redux). Son avantage est de mieux interagir avec un serveur.

J'ai l'impression que les gens développent des nouveaux outils pour faire du front-end littéralement tous les mois... Compliqué de ne pas se sentir à la ramasse dans ce secteur, ni de s'assurer en permanence qu'on est toujours compétent.

Je l'installe ici avec `yarn add react-query`. Il s'intègre ensuite avec son `QueryClientProvider`, comme indiqué dans `shiny-react/src/index.jsx`.
On peut alors utiliser le hook `useQuery`.

Alors après ça permet plein de trucs (imo le temps de formation n'est pas compensé par les fonctionnalités que ça apporte, mais bon).

Avec React-query, on peut remplacer ce bout de code de `Freelances/index.jsx`:

```JS
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchOrUpdateFreelances)
  }, [dispatch])
```

Par un appel à `useQuery`. Ce hook a trois paramètres:

- Une clé pour identifier l'appel (`freelances` ici);
- Une fonction qui fait la requête
- Des options (facultatives).

`useQuery` retourne un objet composé de `data` (le retour de la requête), un `isLoading` et un `error` si une erreur est survenue.

`useQuery` ressemble pas mal à `useFetch`, sauf qu'il utilise un cache (global avec cette clé).