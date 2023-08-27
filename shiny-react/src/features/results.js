import { createAction, createReducer } from '@reduxjs/toolkit'
import { selectResults } from '../utils/selectors'

const initialState = {
  status: 'void',
  data: null,
  error: null,
  params: null, // on ne met à jour la page que si les paramètres ont changé, pour la perf
}

const resultsFetching = createAction('results/fetching', (params) => ({
  payload: { params },
}))
const resultsResolved = createAction('results/resolved', (params, data) => ({
  payload: { params, data },
}))
const resultsRejected = createAction('results/rejected', (params, error) => ({
  payload: { params, error },
}))

export function fetchOrUpdateResults(resultsQueryParams) {
  return async (dispatch, getState) => {
    const results = selectResults(getState())
    if (results.status === 'void' || results.params !== resultsQueryParams) {
      dispatch(resultsFetching(resultsQueryParams))
      try {
        const response = await fetch(
          `http://localhost:8000/results?${resultsQueryParams}`
        )
        const data = await response.json()
        dispatch(resultsResolved(resultsQueryParams, data))
      } catch (error) {
        dispatch(resultsRejected(resultsQueryParams, error))
      }
    }
  }
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(resultsFetching, (draft, action) => {
      const params = action.payload.params
      if (draft.status === 'void') {
        draft.status = 'pending'
        draft.params = params
        return
      }
      draft.status = 'updating'
      draft.params = params
    })
    .addCase(resultsResolved, (draft, action) => {
      if (draft.params !== action.payload.params) {
        return
      }
      if (draft.status === 'pending' || draft.status === 'updating') {
        draft.data = action.payload.data
        draft.status = 'resolved'
        return
      }
      return
    })
    .addCase(resultsRejected, (draft, action) => {
      if (draft.params !== action.payload.params) {
        return
      }
      if (draft.status === 'pending' || draft.status === 'updating') {
        draft.error = action.payload.error
        draft.data = null
        draft.status = 'rejected'
        return
      }
    })
)
