reactiveDict = new ReactiveDict('loginState');

const login = (state, action) => {
  state = state || reactiveDict;
  switch (action.type) {
    case 'LOGIN_FAILED':
      const loginAttempts = state.get('loginAttempts');
      state.set('loginAttempts', loginAttempts ? (loginAttempts + 1) : 0);
      return state;
    case 'LOGIN_SUCCESS':
      return state;
    default:
      return state;
  }
};

Redux.registerReducer(login);
