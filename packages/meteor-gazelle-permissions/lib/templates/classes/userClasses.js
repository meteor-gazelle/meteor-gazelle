Template.userClasses.helpers({
  userClasses: function () {
    return UserClasses.find();
  },
  isReady: function () {
    return Template.instance().ready.get();
  },
  formAttr: function (userClass) {
    return {
      collection: UserClasses, doc: userClass, id: userClass._id, type: "readonly"
    }
  }
});

Template.userClasses.onCreated(function () {
  var self = this;
  self.ready = new ReactiveVar();
  self.autorun(function () {
    var handle = UserClassesSubs.subscribe('user-classes-admin');
    self.ready.set(handle.ready());
  });
});

Template.userClasses.onRendered(function () {
});

Template.userClasses.onDestroyed(function () {
});

