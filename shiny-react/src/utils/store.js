import { configureStore } from '@reduxjs/toolkit'
import themeReducer from '../features/theme'
import freelancesReducer from '../features/freelances'
import surveyReducer from '../features/survey'
import freelanceReducer from '../features/freelance'

export default configureStore({
  reducer: {
    theme: themeReducer,
    freelances: freelancesReducer,
    survey: surveyReducer,
    freelance: freelanceReducer,
  },
})
