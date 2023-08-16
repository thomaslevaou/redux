import { produce } from 'immer'
import { selectProfile } from '../utils/selectors'

const initialState = {
  status: 'void',
  data: null,
  error: null,
}

const FETCHING = 'profile/fetching'
const RESOLVED = 'profile/resolved'
const REJECTED = 'profile/rejected'

const profileFetching = () => ({ type: FETCHING })
const profileResolved = (data) => ({ type: RESOLVED, payload: data })
const profileRejected = (error) => ({ type: REJECTED, payload: error })

export async function fetchOrUpdateProfile(store, profileId) {
  const status = selectProfile(store.getState()).status
  if (status === 'pending' || status === 'updating') {
    return
  }
  store.dispatch(profileFetching())
  try {
    const response = await fetch(
      'http://localhost:8000/freelance?id=' + profileId
    )
    const data = await response.json()
    console.log('freelance id')
    console.log(data)
    store.dispatch(profileResolved(data))
  } catch (error) {
    store.dispatch(profileRejected(error))
  }
}

export default function profileReducer(state = initialState, action) {
  // Y a pas moyen de rendre ça générique avec freelancesReducer ?
  return produce(state, (draft) => {
    switch (action.type) {
      case FETCHING: {
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
      case RESOLVED: {
        if (draft.status === 'pending' || draft.status === 'updating') {
          draft.data = action.payload
          draft.status = 'resolved'
          return
        }
        return
      }
      case REJECTED: {
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
