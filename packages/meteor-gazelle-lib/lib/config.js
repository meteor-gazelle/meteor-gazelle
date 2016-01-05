Components = {};
Router = {};

FlowRouter.notFound = {
  action: function () {
    throw new Meteor.Error('Page not found');
  }
};
