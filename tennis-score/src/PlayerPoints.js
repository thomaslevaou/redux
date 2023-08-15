import { useSelector } from 'react-redux'
import { countWonGamesOfPlayer } from './selectors'

export function PlayerPoints ({ playerId, playerName }) {
    const wonGames = useSelector(countWonGamesOfPlayer(playerId));

    return (
        <div className="player-games">
            <p>{playerName}</p>
            <p>{wonGames <= 1 ? wonGames + " jeu gagné" : wonGames + " jeux gagnés"}</p>
        </div>
    );
}