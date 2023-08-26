import { createAction, createReducer } from '@reduxjs/toolkit'

// action creators
export const toggleTheme = createAction('theme/toggle')
export const setTheme = createAction('theme/set')

// Le reducer
// on utilise une valeur par défaut pour donner le state initial
// Il est appelé themeReducer dans store.js
// Notons qu'il n'utilise qu'un state partiel, combiné via combineReducers dans store.js
// Premier paramètre de createReducer: default state
export default createReducer('light', (builder) =>
  builder
    .addCase(toggleTheme, (state) => {
      return state === 'light' ? 'dark' : 'light'
    })
    .addCase(setTheme, (state, action) => {
      return action.payload
    })
)
