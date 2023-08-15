import { PlayPauseButton } from "./PlayPauseButton";
import { PlayerButton } from "./PlayerButton";
import { RestartButton } from "./RestartButton";
import { Display } from "./Display";

function App() {
  return (
    <>
      <Display />
      <div class="buttons">
       <div class="buttons-row">
          <PlayerButton player={"player1"} />
          <PlayerButton player={"player2"} />
        </div>
       <div class="buttons-row">
          <RestartButton />
          <PlayPauseButton />
        </div>
      </div>
    </>
  );
}

export default App;
