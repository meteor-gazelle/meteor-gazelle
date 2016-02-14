Redux.registerReducer((() => {
  const reactiveDict = new ReactiveDict('accountsState');

  return {
    accounts: (state, action) => {
      state = state || reactiveDict;

      switch (action.type) {
        case 'LOGIN_SUCCESS':
          state.clear();
          state.set({username: action.username});
          return state;
        case 'LOGIN_FAILED':
          const loginAttempts = state.get('loginAttempts');
          state.set('loginAttempts', !!loginAttempts ? (loginAttempts + 1) : 1);
          return state;
        case 'LOGOUT':
          state.clear();
        case 'REGISTER_SUCCESS':
          state.clear();
          state.set({username: action.username});
          return state;
        case 'REGISTER_FAILED':
          return state;
        default:
          return state;
      }
    }
  }
})());

const loginSuccesful = (username, password) => {
  return {
    type: 'LOGIN_SUCCESS',
    username: username,
    password: password
  }
};

const loginFailed = (username, password) => {
  return {
    type: 'LOGIN_FAILED',
    username: username,
    password: password
  }
};

const logoutUser = () => {
  Meteor.logout();
  FlowRouter.go('/');

  return {
    type: 'LOGOUT'
  }
};

const registerSuccessful = (email, username, password) => {
  FlowRouter.go('/home');

  return {
    type: 'REGISTER_SUCCESS',
    username: username,
    password: password
  }
};

const registerFailed = (email, username, password) => {
  return {
    type: 'REGISTER_FAILED',
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
  },
  registerUser: (email, username, password) => {
    return (dispatch, getState) => {
      Accounts.createUser({
        email: email,
        username: username,
        password: password
      }, (err) => {
        if (!err) {
          //TODO(ajax) Integrate routing with redux state
          dispatch(registerSuccessful(email, username, password));
        } else {
          dispatch(registerFailed(email, username, password));
        }
      });
    }
  },
  logoutUser: () => {
    return (dispatch, getState) => {
      dispatch(logoutUser());
    }
  }
};

export { Actions };
