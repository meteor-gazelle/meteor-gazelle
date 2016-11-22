const LoggedInMixin = (methodOptions)=> {
  // See if custom checkLoggedInError error object is provided in
  // ValidatedMethod definition
  if (methodOptions.hasOwnProperty('checkLoggedInError')) {
    // Validate the error object
    check(methodOptions.checkLoggedInError, Match.ObjectIncluding({
      error: String,
      message: Match.Optional(String),
      reason: Match.Optional(String)
    }));
  } else {
    // Use default error object
    methodOptions.checkLoggedInError = LoggedInMixin._defaultError;
  }

  // Save the function being called
  const runFunc = methodOptions.run;

  // Overwrite the function in order to check if user is logged in first.
  methodOptions.run = function () {
    if (!this.userId) {
      // Throw error if user isn't logged in
      throw new Meteor.Error(..._.values(methodOptions.checkLoggedInError));
    }

    // Run the original function being called after validation
    return runFunc.call(this, ...arguments);
  };

  return methodOptions;
};

// Define the base default error
LoggedInMixin._defaultError = {
  error: 'userNotLoggedIn'
};

// Set the default error
LoggedInMixin.setDefaultError = (defaultError) => {
  check(defaultError, Match.ObjectIncluding({
    error: String,
    message: Match.Optional(String),
    reason: Match.Optional(String)
  }));
  LoggedInMixin._defaultError = defaultError;
};


export { LoggedInMixin };
