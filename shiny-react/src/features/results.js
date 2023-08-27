import { createAction, createReducer } from '@reduxjs/toolkit'
import { selectResults } from '../utils/selectors'

const initialState = {
  status: 'void',
  data: null,
  error: null,
}

const resultsFetching = createAction('results/fetching')
const resultsResolved = createAction('results/resolved')
const resultsRejected = createAction('results/rejected')

export function fetchOrUpdateResults(resultsQueryParams) {
  return async (dispatch, getState) => {
    const status = selectResults(getState()).status
    if (status === 'pending' || status === 'updating') {
      return
    }
    dispatch(resultsFetching())
    try {
      const response = await fetch(
        `http://localhost:8000/results?${resultsQueryParams}`
      )
      const data = await response.json()
      dispatch(resultsResolved(data))
    } catch (error) {
      dispatch(resultsRejected(error))
    }
  }
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(resultsFetching, (draft) => {
      if (draft.status === 'void') {
        draft.status = 'pending'
        return
      }
      if (draft.status === 'rejected') {
        draft.error = null
        draft.status = 'pending'
        return
      }
      if (draft.status === 'resolved') {
        draft.status = 'updating'
        return
      }
      return
    })
    .addCase(resultsResolved, (draft, action) => {
      if (draft.status === 'pending' || draft.status === 'updating') {
        draft.data = action.payload
        draft.status = 'resolved'
        return
      }
      return
    })
    .addCase(resultsRejected, (draft, action) => {
      if (draft.status === 'pending' || draft.status === 'updating') {
        draft.error = action.payload
        draft.data = null
        draft.status = 'rejected'
        return
      }
      return
    })
)
