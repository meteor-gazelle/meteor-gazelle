Redux.registerReducer((() => {
  const reactiveDict = new ReactiveDict('userProfile');

  return {
    userProfile (state, action) {
      state = state || reactiveDict;

      switch (action.type) {
        case 'LOAD_PROFILE':
          state.clear();
          state.set({ userId: action.userId, username: action.username });
          return state;
        case 'USER_NOT_FOUND':
          state.clear();
          state.set({ error: action.error });
          return state;
        default:
          return state;
      }
    }
  };
})());

const loadProfile = (user) => {
  return {
    type: 'LOAD_PROFILE',
    userId: user._id,
    username: user.username
  };
};

const userNotFound = () => {
  return {
    type: 'USER_NOT_FOUND',
    error: 'User not found'
  };
};

const Actions = {
  loadProfile (userId) {
    return (dispatch, getState) => {
      let user = null;
      user = Meteor.users.findOne(userId);
      if (user) {
        dispatch(loadProfile(user));
      } else {
        dispatch(userNotFound());
      }
    };
  }
};

export { Actions };
