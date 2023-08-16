# Utilisez le state manager Redux pour gérer l’état de vos applications

On doit indiquer manuellement à Redux qu'on utilise les redux dev tools, en ajoutant un deuxième paramètre à `createStore`. La commande exacte est dans le tuto OpenClassrooms.

On peut alors recharger la page, et voir dans l'extension l'évolution de notre state redux quand on clique sur le bouton de changement de thème.
Avec le menu de gauche, on peut alors voir le state en attière pas à pas si besoin (pour déboguer ça a l'air bien sympathique).

Le menu "tests" auto-génère des tests pour l'action qu'on vient de faire. On peut revenir dans les logs aussi avec le slider en bas.
On a aussi un petit interpréteur en bas pour envoyer une action manuellement genre :

```JS
{
  type: 'theme/toggle'
}
```
