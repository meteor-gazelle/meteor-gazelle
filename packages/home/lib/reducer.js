var reactiveState = new ReactiveDict('redux-state');

export const homeReducer = (state, action) => {
  state = state || reactiveState;

  switch (action.type) {
    case 'SELECT_PLAYER':
      state.set('selectedPlayerId', action.playerId);
      //state.set('selectedPlayerName', action.playerName);
      return state;
    case 'INCREMENT_SCORE':
      return state;
    default:
      return state;
  }
};

export const homeReducer2 = (state, action) => {
  state = state || reactiveState;

  switch (action.type) {
    case 'SELECT_PLAYER':
      state.set('selectedPlayerId', action.playerId);
      //state.set('selectedPlayerName', action.playerName);
      return state;
    case 'INCREMENT_SCORE':
      return state;
    default:
      return state;
  }
};
