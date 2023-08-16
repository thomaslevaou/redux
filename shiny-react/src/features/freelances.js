import { produce } from 'immer'
import { selectFreelances } from '../utils/selectors'

const initialState = {
  status: 'void',
  data: null,
  error: null,
}

const FETCHING = 'freelances/fetching'
const RESOLVED = 'freelances/resolved'
const REJECTED = 'freelances/rejected'
const FETCHING_PROFILE = 'profile/fetching'
const RESOLVED_PROFILE = 'profile/resolved'
const REJECTED_PROFILE = 'profile/rejected'

const freelancesFetching = () => ({ type: FETCHING })
const freelancesResolved = (data) => ({ type: RESOLVED, payload: data })
const freelancesRejected = (error) => ({ type: REJECTED, payload: error })
const profileFetching = () => ({ type: FETCHING_PROFILE })
const profileResolved = (data) => ({ type: RESOLVED_PROFILE, payload: data })
const profileRejected = (error) => ({ type: REJECTED_PROFILE, payload: error })

export async function fetchOrUpdateFreelances(store) {
  const status = selectFreelances(store.getState()).status
  if (status === 'pending' || status === 'updating') {
    return
  }
  store.dispatch(freelancesFetching())
  try {
    const response = await fetch('http://localhost:8000/freelances')
    const data = await response.json()
    store.dispatch(freelancesResolved(data))
  } catch (error) {
    store.dispatch(freelancesRejected(error))
  }
}

export async function fetchOrUpdateProfile(store, profileId) {
  const status = selectFreelances(store.getState()).status
  if (status === 'pending' || status === 'updating') {
    return
  }
  store.dispatch(profileFetching())
  try {
    const response = await fetch(
      'http://localhost:8000/freelance?id=' + profileId
    )
    const data = await response.json()
    console.log('dispatching data...')
    console.log(status)
    store.dispatch(profileResolved(data))
  } catch (error) {
    store.dispatch(profileRejected(error))
  }
}

export default function freelancesReducer(state = initialState, action) {
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
        console.log('resolved in profiles general !')
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
      case FETCHING_PROFILE: {
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
      case RESOLVED_PROFILE: {
        console.log('draft satus')
        console.log(draft.status)
        if (draft.status === 'pending' || draft.status === 'updating') {
          // console.log('resolved profile beginning...')
          // console.log(action.payload.freelanceData)
          // // draft.data.freelancesList[parseInt(action.payload.freelanceData.id)] =
          // // action.payload.freelanceData
          draft.data = action.payload
          draft.status = 'resolved'
          return
        }
        return
      }
      case REJECTED_PROFILE: {
        if (draft.status === 'pending' || draft.status === 'updating') {
          draft.error = action.payload
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
