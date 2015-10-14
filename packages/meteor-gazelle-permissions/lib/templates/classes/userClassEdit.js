Template.userClassEdit.helpers({
  userClass: function () {
    return UserClasses.findOne(FlowRouter.getParam('id'));
  },
  isReady: function () {
    return Template.instance().ready.get();
  },
  onSuccessfulDelete: function () {
    return function() {
      FlowRouter.redirect('/admin/classes');
    }
  }
});

Template.userClassEdit.onCreated(function () {
  var self = this;
  self.ready = new ReactiveVar();
  self.autorun(function () {
    var handle = UserClassesSubs.subscribe('user-classes-admin');
    self.ready.set(handle.ready());
  });
});

Template.userClassEdit.onRendered(function () {
});

Template.userClassEdit.onDestroyed(function () {
});

