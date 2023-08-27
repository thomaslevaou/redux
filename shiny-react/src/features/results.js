import { createSlice } from '@reduxjs/toolkit'
import { selectResults } from '../utils/selectors'

const initialState = {
  status: 'void',
  data: null,
  error: null,
  params: null, // on ne met à jour la page que si les paramètres ont changé, pour la perf
}

const { actions, reducer } = createSlice({
  name: 'results',
  initialState,
  reducers: {
    fetching: {
      prepare: (params) => ({
        payload: { params },
      }),
      reducer: (draft, action) => {
        const params = action.payload.params
        if (draft.status === 'void') {
          draft.status = 'pending'
          draft.params = params
          return
        }
        draft.status = 'updating'
        draft.params = params
      },
      resolved: {
        prepare: (params, data) => ({
          payload: { params, data },
        }),
        reducer: (draft, action) => {
          if (draft.params !== action.payload.params) {
            return
          }
          if (draft.status === 'pending' || draft.status === 'updating') {
            draft.data = action.payload.data
            draft.status = 'resolved'
            return
          }
          return
        },
      },
      rejected: {
        prepare: (params, error) => ({
          payload: { params, error },
        }),
        reducer: (draft, action) => {
          if (draft.params !== action.payload.params) {
            return
          }
          if (draft.status === 'pending' || draft.status === 'updating') {
            draft.error = action.payload.error
            draft.data = null
            draft.status = 'rejected'
            return
          }
        },
      },
    },
  },
})

export function fetchOrUpdateResults(resultsQueryParams) {
  return async (dispatch, getState) => {
    const results = selectResults(getState())
    if (results.status === 'void' || results.params !== resultsQueryParams) {
      dispatch(actions.fetching(resultsQueryParams))
      try {
        const response = await fetch(
          `http://localhost:8000/results?${resultsQueryParams}`
        )
        const data = await response.json()
        dispatch(actions.resolved(resultsQueryParams, data))
      } catch (error) {
        dispatch(actions.rejected(resultsQueryParams, error))
      }
    }
  }
}

export default reducer
