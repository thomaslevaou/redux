import { useStore } from "react-redux";
import { setPlaying, pointScored } from "./store";

export function PlayPauseButton() {
  const store = useStore();

  return (
    <button
      onClick={() => {
        // On rappelle que dans ce code de test, `playing` vaut false à l'initialisation
        const isPlaying = store.getState().playing;
        // Le if ci-dessous est donc là pour bloquer ceux qui voudraient re-cliquer sur le bouton alors que le timeOut n'est pas passé
        if (isPlaying) {
          return;
        }
        store.dispatch(setPlaying(true));

        window.setTimeout(() => {
            // Le if ci-dessous sert à vérifier qu'on n'a pas remis playing à sa valeur initiale (false) pendant les 2 secondes (ce qui peut arriver avec un bouton de remise à zéro par ex)
            if (store.getState().playing === false) {
                return;
            }
            const pointWinner = Math.random() > 0.5 ? "player1" : "player2";
            store.dispatch(pointScored(pointWinner));
            store.dispatch(setPlaying(false));
        }, 2000);
      }}
      class="button"
    >
      Pause / Reprendre
    </button>
  );
}
