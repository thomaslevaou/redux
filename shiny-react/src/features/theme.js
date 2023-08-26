import { createAction } from '@reduxjs/toolkit'

// action creators
export const toggleTheme = createAction('theme/toggle')
export const setTheme = createAction('theme/set')

// Le reducer
// on utilise une valeur par défaut pour donner le state initial
// Il est appelé themeReducer dans store.js
// Notons qu'il n'utilise qu'un state partiel, combiné via combineReducers dans store.js
export default function reducer(state = 'light', action) {
  if (action.type === toggleTheme.toString()) {
    return state === 'light' ? 'dark' : 'light'
  }
  if (action.type === setTheme.toString()) {
    return action.payload
  }
  return state
}
