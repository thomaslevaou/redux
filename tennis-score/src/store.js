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
      return produce(state, draft => {
        draft[player] = currentPlayerScore + 15;
      })
    }
    if (currentPlayerScore === 30) {
      return produce(state, draft => {
        draft[player] = 40;
      })
    }

    if (currentPlayerScore === 40) {
      // si APRES avoir cliqué sur le bouton joueur en ayant un score de 40, le joueur 2 a moins de 40 ou qu'il a 40 et que j'ai l'avantage, je gagne
      if (state[otherPlayer] < 40 || state.advantage === player) {
        return produce(state, draft => {
          draft.winner = player;
        })
      }
      // cas où le joueur actuel a 40, a cliqué sur le bouton mais l'adversaire a 40 aussi et l'avantage n'est pas défini
      // dans ce cas, le joueur courant a l'avantage. S'il n'a pas perdu l'avantage au prochain tour, il gagne au vu de la condition ci-dessus.
      if (state.advantage === null) {
        return produce(state, draft => {
          draft.advantage = player;
        })
      }
      // cas où le joueur actuel a 40, a cliqué sur le bouton mais c'est l'adversaire qui a l'avantage
      // On réinitialise alors l'avantage. Si l'adversaire ne le chope pas au prochain tour, lui peut le choper au tour suivant. S'il arrive à la conserver à son tour suivant ensuite, il gagne la partie.
      return produce(state, draft => {
        draft.advantage = null;
      })
    }
  }
  return state;
}

export const store = createStore(reducer, initialState);