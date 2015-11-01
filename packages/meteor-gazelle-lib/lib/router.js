var redirectToLogin = function (context, redirect) {
  if (!Meteor.userId()) {
    Router.loginRedirectContext.set(context);
    redirect('/login');
  }
};

var redirectToHome = function (context, redirect) {
  if (Meteor.userId()) {
    redirect('/home');
  }
};

Router.main = FlowRouter.group();

Router.public = Router.main.group({
  triggersEnter: [redirectToHome]
});

Router.app = Router.main.group({
  triggersEnter: [redirectToLogin]
});

Router.loginRedirectContext = new ReactiveVar();

FlowRouter.notFound = {
  action: function () {
    throw new Meteor.Error('Page not found');
  }
};
