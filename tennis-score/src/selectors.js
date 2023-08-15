export const selectPlayerHasAdvantage = (playerId) => {
    return (state) => state.advantage === playerId;
}