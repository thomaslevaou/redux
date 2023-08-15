import { createStore } from 'redux';
import { produce } from "immer";

// Le state
const initialState = {
  player1: 0,
  player2: 0,
  advantage: null,
  winner: null,
  playing: true
};

// Les actions creators
export const playPause = () => ({ type: "playPause" });
export const restartGame = () => ({ type: "restart" });
export const pointScored = (player) => ({
  type: "pointScored",
  payload: { player: player }
});

// Le reducer
function reducer(state, action) {
  if (action.type === "restart") {
    return initialState;
  }

  if (action.type === "playPause") {
    if (state.winner) {
      return state;
    }

    return produce(state, draft => {
      draft.playing = !draft.playing;
    })
  }

  if (action.type === "pointScored") {
    const player = action.payload.player;
    const otherPlayer = player === "player1" ? "player2" : "player1";
    if (state.winner) {
      return state;
    }
    if (state.playing === false) {
      return state;
    }
    const currentPlayerScore = state[player];
    if (currentPlayerScore <= 15) {
      return { ...state, [player]: currentPlayerScore + 15 };
    }
    if (currentPlayerScore === 30) {
      return { ...state, [player]: 40 };
    }

    if (currentPlayerScore === 40) {
      if (state[otherPlayer] !== 40) {
        return { ...state, winner: player };
      }
      if (state.advantage === player) {
        return { ...state, winner: player };
      }
      if (state.advantage === null) {
        return { ...state, advantage: player };
      }
      return { ...state, advantage: null };
    }
  }
  return state;
}

export const store = createStore(reducer, initialState);