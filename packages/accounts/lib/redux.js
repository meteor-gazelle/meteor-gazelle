import { Methods } from './methods.js';

Redux.registerReducer((() => {
  // Create a new reducer for account states
  const reactiveDict = new ReactiveDict('accountsState');

  return {
    accounts (state, action) {
      state = state || reactiveDict;

      switch (action.type) {
        case 'LOGIN_SUCCESS':
          // Successful login
          state.clear();
          state.set({ username: action.username });
          return state;
        case 'LOGIN_FAILED':
          // Failed login,log attempts
          const loginAttempts = state.get('loginAttempts');
          state.set('loginAttempts', !!loginAttempts ? (loginAttempts + 1) : 1);
          return state;
        case 'LOGOUT':
          // Logging out
          state.clear();
        case 'REGISTER_SUCCESS':
          // Successful registration
          state.clear();
          state.set({ username: action.username });
          return state;
        case 'REGISTER_FAILED':
          // Failed registration
          return state;
        default:
          return state;
      }
    }
  };
})());

// Successful login
const loginSuccesful = (username, password) => {
  return {
    type: 'LOGIN_SUCCESS',
    username: username,
    password: password
  };
};

// Failed login
const loginFailed = (username, password) => {
  return {
    type: 'LOGIN_FAILED',
    username: username,
    password: password
  };
};

// Log the user out
const logoutUser = () => {
  Meteor.logout();
  FlowRouter.go('/');

  return {
    type: 'LOGOUT'
  };
};

// Successful registration
const registerSuccessful = (email, username, password) => {
  FlowRouter.go('/login');

  return {
    type: 'REGISTER_SUCCESS',
    username: username,
    password: password
  };
};

// Failed registration
const registerFailed = (email, username, password) => {
  return {
    type: 'REGISTER_FAILED',
    username: username,
    password: password
  };
};

const Actions = {
  // Log the user in
  loginUser (username, password) {
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
  // Register a user
  registerUser (email, username, password) {
    return (dispatch, getState) => {
      Methods.registerUser.call({
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
    };
  },
  //Log the user out
  logoutUser () {
    return (dispatch, getState) => {
      dispatch(logoutUser());
    };
  }
};

export { Actions };
