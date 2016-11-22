Redux.registerReducer((() => {
  const reactiveDict = new ReactiveDict('userProfile');

  return {
    userProfile (state, action) {
      state = state || reactiveDict;

      switch (action.type) {
        default:
          return state;
      }
    }
  };
})());

const Actions = {
};

export { Actions };
