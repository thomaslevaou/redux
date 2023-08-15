export const selectPlayerHasAdvantage = (playerId) => {
    return (state) => state.advantage === playerId;
}

export const countWonGamesOfPlayer = (playerId) => {
    return (state) => {
        const gamesWithPlayerIdAsWinner = state.history.filter((game) => game.winner === playerId);
        return gamesWithPlayerIdAsWinner.length;
    };
}

export const countHitsLeftUntilVictory = (playerId) => {
    return (state) => {
        if (state.winner) {
            return 0;
        }
        const otherPlayer = playerId === "player1" ? "player2" : "player1";
        const currentPlayerScore = state[playerId];
        const otherPlayerScore = state[otherPlayer];
        const necessaryHitsToWinIfOpponentDidNotReach40 = {
            0: 4,
            15: 3,
            30: 2,
            40: 1
        }
        if (otherPlayerScore === 40) {
            if (state.advantage === null) {
                return necessaryHitsToWinIfOpponentDidNotReach40[currentPlayerScore] + 1;
            }
            if (state.advantage === otherPlayer) {
                return necessaryHitsToWinIfOpponentDidNotReach40[currentPlayerScore] + 2;
            }
        }
        return necessaryHitsToWinIfOpponentDidNotReach40[currentPlayerScore];
    }
}