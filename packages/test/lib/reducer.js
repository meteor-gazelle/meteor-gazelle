var reactiveState = new ReactiveDict('redux-state2');

export const testReducer = (state, action) => {
  state = state || reactiveState;

  switch (action.type) {
    case 'TEST':
      state.set('test', action.playerId);
      return state;
    default:
      return state;
  }
};
