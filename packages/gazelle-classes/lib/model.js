Meteor.methods({
  updateUserClass: function (modifier, documentId) {
    UserClass.update({ _id: documentId }, modifier);
    var newUserClass = UserClass.findOne({ _id: documentId });
    User.update({ 'classes.classId': documentId }, {
      $set: {
        'classes.$.title': newUserClass.title,
        'classes.$.shortTitle': newUserClass.shortTitle,
        'classes.$.secondary': newUserClass.secondary,
      }
    }, { multi: true });
  },
  createUserClass: function (doc) {
    Schemas.userClass.clean(doc);
    UserClass.insert(doc);
  },
  updateUsersClasses: function (doc) {
    //TODO: Come up with a better way to handle class deletion
    User.update({ _id: doc.userId }, { $unset: { classes: '' }});
    Roles.setUserRoles(doc.userId, [], 'class');
    doc.classes.forEach(function (element) {
      var classId = element.classId;
      var classDoc = UserClass.findOne({ _id: classId });
      if (!classDoc) {
        console.log('Cannot find class ID: ' + classId);
        return false;
      }
      classDoc.classId = classDoc._id;
      User.update({ _id: doc.userId }, { $addToSet: { classes: classDoc }});
      Roles.addUsersToRoles(doc.userId,
        UserClass.findOne({ _id: classId }, { fields: { roles: 1 }}).roles,
        'class');
    });
  }
});
