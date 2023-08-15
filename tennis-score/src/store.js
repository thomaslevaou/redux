import { createStore } from 'redux';
import { produce } from "immer";

// Le state
const initialState = {
  player1: 0,
  player2: 0,
  advantage: null,
  winner: null,
  playing: false,
  history: [],
};

// Les actions creators
export const setPlaying = (playing) => ({
  type: "setPlaying",
  payload: playing
})
export const restartGame = () => ({ type: "restart" });
export const pointScored = (player) => ({
  type: "pointScored",
  payload: { player: player }
});
export const autoplay = (store) => {
  // On rappelle que dans ce code de test, `playing` vaut false à l'initialisation
  const isPlaying = store.getState().playing;
  // Le if ci-dessous est donc là pour bloquer ceux qui voudraient re-cliquer sur le bouton après qu'il ait été mis à true à la ligne suivante, mais alors que le timeOut de 2 sec n'est pas passé
  if (isPlaying) {
    return;
  }
  store.dispatch(setPlaying(true));

  window.setTimeout(() => {
      // Le if ci-dessous sert à vérifier qu'on n'a pas remis playing à sa valeur initiale (false) pendant les 2 secondes (ce qui peut arriver avec un bouton de remise à zéro par ex)
      if (store.getState().playing === false || store.getState().winner !== null) {
          store.dispatch(setPlaying(false)); // reset en cas de fin de partie
          return;
      }
      const pointWinner = Math.random() > 0.5 ? "player1" : "player2";
      store.dispatch(pointScored(pointWinner));
      store.dispatch(setPlaying(false));
      autoplay(store);
  }, 2000);
}

// Le reducer
function reducer(state, action) {
  if (action.type === "restart") {
    // Attention on doit réinitialiser de cette manière le state
    // sinon si on le met au moment où le winner est déclaré, un clic sur le bouton de réinitialisation supprimera le début d'historique créé !
    // Ce qu'Openclassrooms entend par "ajouter un state", c'est "ajouter un élément au state global" ici
    // Un peu chelou de faire cet exercice dans interface graphique pour ajouter / tester l'historique mais bon ok
    return produce(state, (draft) => {
      if (draft.winner) {
        draft.history.push({
          player1: draft.player1,
          player2: draft.player2,
          winner: draft.winner,
        });
      }
      draft.player1 = 0;
      draft.player2 = 0;
      draft.advantage = null;
      draft.winner = null;
      draft.playing = false;
    });
  }

  if (action.type === "setPlaying") {
    if (state.winner) {
      return state;
    }

    return produce(state, draft => {
      draft.playing = action.payload;
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
      // si APRES avoir cliqué sur le bouton du jouer courant en ayant un score de 40, si l'autre joueur a moins de 40, ou qu'il a 40 et que j'ai l'avantage, je gagne
      // On rappelle que le score n'augmente plus après 40 au tennis.
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