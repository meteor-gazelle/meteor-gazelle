function loginFailed (username, password)  {
  return {
    type: 'LOGIN_FAILED',
    username: username,
    password: password
  }
};

function loginSuccesful(username, password) {
  return {
    type: 'LOGIN_SUCCESS',
    username: username,
    password: password
  }
};

export const Actions = {
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


