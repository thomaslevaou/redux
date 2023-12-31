import { configureStore } from '@reduxjs/toolkit'
import themeReducer from '../features/theme'
import freelancesReducer from '../features/freelances'
import surveyReducer from '../features/survey'
import freelanceReducer from '../features/freelance'
import resultsReducer from '../features/results'
import answersReducer from '../features/answers'

export default configureStore({
  reducer: {
    theme: themeReducer,
    freelances: freelancesReducer,
    survey: surveyReducer,
    freelance: freelanceReducer,
    results: resultsReducer,
    answers: answersReducer,
  },
})
