let classesSchema = new SimpleSchema({
  title: {
    type: String
  },
  shortTitle: {
    type: String
  },
  description: {
    type: String
  },
  // The higher the class level the "lower" the class.
  // Level 0 is a primary class, 1 is secondary, so on and so forth.
  level: {
    type: Number,
    defaultValue: 0,
    min: 0
  },
  sort: {
    type: Number,
    defaultValue: 0,
    min: 0
  },
  isDefaultClass: {
    type: Boolean,
    defaultValue: false
  },
  permissions: {
    type: [String]
  }
});

let classPermissionsSchema = new SimpleSchema({
  classPermissions: {
    type: [String],
    optional: true,
    index: true
  }
});

Meteor.users.attachSchema(classPermissionsSchema);

let classesCollection = new Meteor.Collection('userClasses');
classesCollection.attachSchema(classesSchema);

let userClassesSchema = new SimpleSchema({
  classes: {
    type: [String],
    optional: true
  }
});

Meteor.users.attachSchema(userClassesSchema);

if (Meteor.isServer) {
  Meteor.publish('user-classes-manage', () => {
    User.checkLoggedIn(this);
    return UserClasses.find();
  });
}

UserClasses = {
  _collection: classesCollection
};

function getUserClassById (classId) {
  let classDoc = UserClasses._collection.find({ _id: classId });
  if (!classDoc) {
    throw new Meteor.Error('invalid-parameters', 'Invalid class ID');
  }

  return classId;
}

Meteor.methods({
  'UserClasses.methods.createClass' (doc) {
    User.checkLoggedIn(this);
    UserClasses._collection.insert(doc);
  },
  'UserClasses.methods.updateClass' (doc) {
    User.checkLoggedIn(this);
    UserClasses._collection.update(doc._id, {
      $set: doc
    });
  },
  'UserClasses.methods.removeClass' (id) {
    User.checkLoggedIn(this);
    UserClasses._collection.remove(id);
  },
  'UserClasses.methods.getClassesForUser' (id) {
    User.checkLoggedIn(this);
    return Meteor.users.find({ _id: id }).classes;
  },
  'UserClasses.methods.addClassToUser' (userId, classId) {
    User.checkLoggedIn(this);

    // Error checks
    let classDoc = getUserClassById(classId);
    let classPermissions = classDoc.permissions;
    let userClass = Meteor.users.find({ _id: userId }, { $elemMatch: { classes: classDoc.className }});
    if (userClass.length > 0) {
      throw new Meteor.Error('invalid-arguments', 'User is already a member of the class');
    }

    // Concatenate class title and permission for storage
    let updatedClassPermissions = classPermissions.map(permission => {
      return classDoc.title + '.' + permission;
    });

    // Add class and permissions to user
    Meteor.users.update(userId,
      { $addToSet: { classes: classDoc.className }},
      { $addToSet: { classPermissions: { $each: updatedClassPermissions }}});
  },
  'UserClasses.methods.removeClassFromUser' (userId, classId) {
    User.checkLoggedIn(this);

    // Error check
    let classDoc = getUserClassById(classId);
    let classPermissions = classDoc.permissions;

    // Concatenate class title and permissions for storage
    let updatedClassPermissions = classPermissions.map(permission => {
      return classDoc.title + '.' + permission;
    });

    // Remove user class and permissions from user
    Meteor.users.update(userId,
      { $pull: { classes: classDoc.className }},
      { $pullAll: { classPermissions: updatedClassPermissions }});
  }
});

UserClasses.methods = {
  createClass (doc) {
    Meteor.call('UserClasses.methods.createClass', doc);
  },
  updateClass (doc) {
    Meteor.call('UserClasses.methods.updateClass', doc);
  },
  removeClass (id) {
    Meteor.call('UserClasses.methods.removeClass', id);
  },
  getClassesForUser (id) {
    return Meteor.call('UserClasses.methods.getClassesForUser', id);
  },
  addClassToUser (userId, classId) {
    Meteor.call('UserClasses.methods.addClassToUser', userId, classId);
  },
  removeClassFromUser (userId, classId) {
    Meteor.call('UserClasses.methods.removeClassFromUser', userId, classId);
  }
};
