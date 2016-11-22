import { Methods } from './methods.js';

Redux.registerReducer((() => {
  const reactiveDict = new ReactiveDict('userClassManagement');

  return {
    accounts (state, action) {
      state = state || reactiveDict;

      switch (action.type) {
        case 'CREATE_CLASS_SUCCESS':
          return state;
        case 'UPDATE_CLASS_SUCCESS':
          return state;
        default:
          return state;
      }
    }
  };
})());

const createClassSuccesful = () => {
  return {
    type: 'CREATE_CLASS_SUCCESS',
  };
};

const updateClassSuccesful = () => {
  return {
    type: 'UPDATE_CLASS_SUCCESS',
  };
};

const Actions = {
  createClass (userClass) {
    return (dispatch, getState) => {
      Methods.create.call(userClass, (err, res) => {
        if (!err) {
          dispatch(createClassSuccesful());
        }
      });
    };
  },
  updateClass (userClass) {
    return (dispatch, getState) => {
      Methods.update.call(userClass, (err, res) => {
        if (!err) {
          dispatch(updateClassSuccesful());
        }
      });
    };
  },
  removeClass (_id) {
    return (dispatch, getState) => {
      Methods.remove.call({_id});
    };
  }
};

export { Actions };
