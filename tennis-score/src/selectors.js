export const selectPlayerHasAdvantage = (playerId) => {
    return (state) => state.advantage === playerId;
}

export const countWonGamesOfPlayer = (playerId) => {
    return (state) => {
        let gamesWithPlayerIdAsWinner = state.history.filter((game) => game.winner === playerId);
        return gamesWithPlayerIdAsWinner.length;
    };
}