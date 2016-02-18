export const UserClass = new Meteor.Collection('userClass');

UserClass.schema = new SimpleSchema({
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
    type: [String],
    defaultValue: [],
    optional: true
  }
});

UserClass.attachSchema(UserClass.schema);

//TODO(ajax) Add permission check
//TODO(ajax) Both this method and its sister can be made less redundant
UserClass.addClassToUser = (userId, classIds) => {
  check(userId, String);
  check(classIds, [String]);

  // Confirm the user exists
  const user = Meteor.users.findOne(userId);

  if (user) {
    // Find classes based on passed in class ids
    const classes = UserClass.find({_id: {$in: classIds}});
    const foundClassIds = classes.map(value => value._id);
    const permissions = classes.map(value => value.permissions);
    // Add class ids to the user's class id set
    Meteor.users.update(user._id, {$addToSet: {classIds: foundClassIds, classPermissions: permissions}});
  }
};

UserClass.removeClassFromUser = (userId, classIds) => {
  check(userId, String);
  check(classIds, [String]);

  // Confirm the user exists
  const user = Meteor.users.findOne(userId);

  if (user) {
    // Find classes based on passed in class ids
    const classes = UserClass.find({_id: {$in: classIds}});
    const foundClassIds = classes.map(value => value._id);
    const permissions = classes.map(value => value.permissions);
    // Remove class ids frmo the user's class id set
    Meteor.users.update(user._id, {$pull: {classIds: foundClassIds, classPermissions: permissions}});
  }
};

//TODO(ajax) Need to attach this schema to Meteor.users pending an issue from collections2
const userSchema = new SimpleSchema({
  classPermissions: {
    type: [String],
    optional: true,
    index: true
  },
  classIds: {
    type: [String],
    optional: true,
    index: true
  }
});

//Meteor.users.attachSchema(userClassesSchema);

/*
 if (Meteor.isServer) {
 Meteor.publish('user-classes-manage', () => {
 User.checkLoggedIn(this);
 return UserClasses.find();
 });
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
 let userClass = Meteor.users.find({ _id: userId },
 {
 $elemMatch: {
 classes: classDoc.className
 }
 });
 if (userClass.length > 0) {
 throw new Meteor.Error('invalid-arguments',
 'User is already a member of the class');
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
 */
