const LoggedInMixin = (methodOptions) => {
  if (methodOptions.hasOwnProperty(checkLoggedInError)) {
    check(methodOptions.checkLoggedInError, Match.ObjectIncluding({
      error: String,
      message: Match.Optional(String),
      reason: Match.Optional(String)
    }));
  } else {
    methodOptions.checkLoggedInError = LoggedInMixin._defaultError;
  }

  const runFunc = methodOptions.run;
  methodOptions.run = function () {
    if (!this.userId) {
      throw new Meteor.Error(..._.values(methodOptions.checkLoggedInError));
    }
    return runFunc.call(this, ...arguments);
  };

  return methodOptions;
};

LoggedInMixin._defaultError = {
  error: 'userNotLoggedIn'
};

LoggedInMixin.setDefaultError = (error) => {
  check(methodOptions.checkLoggedInError, Match.ObjectIncluding({
    error: String,
    message: Match.Optional(String),
    reason: Match.Optional(String)
  }));
  LoggedInMixin._defaultError = error;
};


export { LoggedInMixin };
