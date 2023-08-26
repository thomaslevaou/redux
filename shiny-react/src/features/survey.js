import { produce } from 'immer'
import { selectFreelances } from '../utils/selectors'
import { createAction, createReducer } from '@reduxjs/toolkit'

const initialState = {
  status: 'void',
  data: null,
  error: null,
}

const surveyFetching = createAction('survey/fetching')
const surveyResolved = createAction('survey/resolved')
const surveyRejected = createAction('survey/rejected')

export async function fetchOrUpdateSurvey(store) {
  const status = selectFreelances(store.getState()).status
  if (status === 'pending' || status === 'updating') {
    return
  }
  store.dispatch(surveyFetching())
  try {
    const response = await fetch('http://localhost:8000/survey')
    const data = await response.json()
    store.dispatch(surveyResolved(data))
  } catch (error) {
    store.dispatch(surveyRejected(error))
  }
}

export default function surveyReducer(state = initialState, action) {
  // Y a pas moyen de rendre ça générique avec freelancesReducer ?
  return produce(state, (draft) => {
    switch (action.type) {
      case surveyFetching.toString(): {
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
      }
      case surveyResolved.toString(): {
        if (draft.status === 'pending' || draft.status === 'updating') {
          draft.data = action.payload
          draft.status = 'resolved'
          return
        }
        return
      }
      case surveyRejected.toString(): {
        if (draft.status === 'pending' || draft.status === 'updating') {
          draft.error = action.payload
          draft.data = null
          draft.status = 'rejected'
          return
        }
        return
      }
      default:
        return
    }
  })
}
