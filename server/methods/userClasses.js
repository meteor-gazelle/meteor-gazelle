Meteor.methods({
  updateUserClass: function (modifier, documentId) {
    Class.update({ _id: documentId }, modifier);
    var newUserClass = Class.findOne({ _id: documentId });
    UserClass.update({ classId: documentId }, {
      $set: {
        title: newUserClass.title,
        shortTitle: newUserClass.shortTitle
      }
    });
    User.update({ 'classes.classId': documentId }, {
      $set: {
        'classes.$.title': newUserClass.title,
        'classes.$.shortTitle': newUserClass.shortTitle
      }
    }, { multi: true });
  },
  createUserClass: function (doc) {
    Schemas.class.clean(doc);
    Class.insert(doc);
    UserClass.insert({
      title: doc.title,
      shortTitle: doc.shortTitle,
      classId: Class.findOne({ title: doc.title }, { _id: 1 })._id
    });
  },
  editUserClasses: function (doc) {
    //TODO: Come up with a better way to handle class deletion
    User.update({ _id: doc.userId }, { $unset: { classes: '' }});
    Roles.setUserRoles(doc.userId, [], 'class');
    doc.classes.forEach(function (element) {
      var classId = element.classId;
      var classDoc = UserClass.findOne({ classId: classId });
      if (!classDoc) {
        console.log('Cannot find class ID: ' + classId);
        return false;
      }
      User.update({ _id: doc.userId }, { $addToSet: { classes: classDoc }});
      Roles.addUsersToRoles(doc.userId,
        Class.findOne({ _id: classDoc.classId }, { roles: 1 }).roles,
        'class');
    });
  }
});
