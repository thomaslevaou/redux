# Écrivez moins de code grâce à Redux Toolkit

Le **Redux-toolkit** est un projet permettant de réduire les quantités de code ("boilerplate") qu'on écrit en Redux.

On l'installe avec `yarn add @reduxjs/toolkit`.

Dans le cadre de ce cours, on va surtout l'utiliser pour simplifier des créations de store avec `configureStore`, `createAction` pour les actions, ainsi que `createReducer` pour les reduces (et notre utilisation d'Immer).

## configureStore

Permet de créer un store utilisant directement `combineReducers`, et sans avoir besoin d'une bidouille pour utiliser les Redux Dev Tools.

La création du store dans `shiny-react/src/utils/store.js` s'en retrouve ainsi bien plus simplifiée.