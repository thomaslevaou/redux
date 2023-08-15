# Facilitez la manipulation du state avec Immer

On rappelle qu'en JavaScript, les tableaux et objets fonctionnent par référence.
C'est pour ça que quand on veut créer un tableau2 ayant la même valeur que tableau1 en JavaScript, on utilise les `...`, comme ci-dessous :

```JS
let matos2020 = ['ordinateur'];
let matos2021 = [...matos2020]; // Créer une autre variable, alors que `= matos2020` aurait fait une référence (pas besoin d'utiliser _cloneDeep btw)
```

La même chose appliquée aux objets s'appelle la **déstructuration**. Et c'est pour ça qu'on fait des retours par déstructuration pour modifier un state global en redux, ça évite des embrouilles qui pourraient arriver si on modifiait directement la valeur initiale par référence.

Dans des gros state, on peut parfois se retrouver à devoir gérer des imbrications de grosses structurations pour mettre à jour un gros state global.
Pour simplifier le code et éviter que des fautes de frappes arrivent dans ce genre de situation, on peut faire appel à la bibliothèque `Immer`.
Cette biblio fournit une fonction `produce`, prenant en paramètre le state initial, puis en deuxième paramètre une variable qu'on va appeler par convention `draft`, et qui va prendre la nouvelle valeur du state à la fin de son exécution. D'où le fait qu'on indiquera à ce draft les changements qu'on souhaite effectuer sur le state initial.

Exemple d'utilisation :

```JS
import produce from "immer";

const baseState = {
  todos: [
    { name: 'Apprendre React', done: true },
    { name: 'Maîtriser Redux', done: false },
  ]
}

const nextState = produce(baseState, (draft) => {
  draft.todos[1].done = true;
  draft.todos.push({ name: 'Utiliser Immer', done: false });
});
```

On l'installe préalablement avec `yarn add immer` (je ne préciserai pas ce genre d'installation à faire dans les prochains chapitres pour gagner du temps).
