import { createSlice } from '@reduxjs/toolkit'

const { actions, reducer } = createSlice({
  name: 'answers',
  initialState: {},
  reducers: {
    save: (draft, action) => {
      console.log(action.payload)
      // il vaut mieux éviter de passer par une déstructuration de draft ici (genre les ...draft), ça bugue sans que je sache pourquoi
      // Mais ici, on retrouve bien la bonne structure du useContext quand même en ne faisant que les modifications dans `Survey`, donc ça va
      draft[action.payload.questionNumber] = action.payload.answer
      console.log(draft)
    },
  },
})

export const { save } = actions

export default reducer
