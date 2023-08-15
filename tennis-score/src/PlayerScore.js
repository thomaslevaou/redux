import { useSelector } from 'react-redux'
import { selectPlayerHasAdvantage, countHitsLeftUntilVictory } from './selectors'

export function PlayerScore ({ playerId, playerName }) {
    const score = useSelector((state) => state[playerId]);
    const hasAdvantage = useSelector(selectPlayerHasAdvantage(playerId));
    const hitsLeftUntilVictory = useSelector(countHitsLeftUntilVictory(playerId));

    return (
        <div className="player-score">
            <p>{playerName}</p>
            <p>{(hasAdvantage ? "Avantage - " : "") + score}</p>
            {hitsLeftUntilVictory !== 0 && (<p>À {hitsLeftUntilVictory} échange(s) de la victoire</p>)}
        </div>
    );
}