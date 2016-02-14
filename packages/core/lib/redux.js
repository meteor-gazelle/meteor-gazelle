Redux.registerReducer((() => {
  const reactiveDict = new ReactiveDict('loginState');

  return {
    core: (state, action) => {
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
    }
  }
})());

const loginFailed = (username, password) => {
  return {
    type: 'LOGIN_FAILED',
    username: username,
    password: password
  }
};

const loginSuccesful = (username, password) => {
  return {
    type: 'LOGIN_SUCCESS',
    username: username,
    password: password
  }
};

const logout = (username, password) => {
  return {
    type: 'LOGOUT',
    username: username,
    password: password
  }
};

const Actions = {
  loginUser: (username, password) => {
    return (dispatch, getState) => {
      Meteor.loginWithPassword(username, password, (err) => {
        //TODO(ajax) Improve login error handling
        if (!err) {
          dispatch(loginSuccesful(username, password));
        } else {
          dispatch(loginFailed(username, password));
        }
      });
    };
  }
};

export { Actions };
