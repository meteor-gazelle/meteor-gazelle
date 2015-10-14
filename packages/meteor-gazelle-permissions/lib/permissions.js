Meteor.users.attachSchema(Gazelle.schema.userPermissions);
Gazelle.collections.UserClasses = UserClasses = new Mongo.Collection('userClasses');
UserClasses.attachSchema(Gazelle.schema.userClass);
UserClassesSubs = new SubsManager();

Permissions = {
  permissions: [],
  roles: {},
  check: function (userId, role, permissions, callbacks) {
    check(userId, String);
    check(role, String);
    check(permissions, [String]);

    var results = Meteor.users.findOne(userId, {
      fields: {
        permissions: 1
      }
    });

    if (results === undefined) {
      throw new Meteor.Error('User not found');
    }

    debugger;
  },
  registerRoles: function (roles) {
    var registeredRoles = _.intersection(_.keys(this.roles), _.keys(roles));
    if (registeredRoles.length > 0) {
      throw new Meteor.Error('role-exists', 'One or more of these roles have already been registered', registeredRoles)
    }
    for (role in roles) {
      // TODO Improve validation
      // TODO Add titles and descriptions to a permission
      check(role, String);
      check(roles[role], {
        title: String,
        description: String,
        permissions: [String]
      });

      // TODO Change this so permissions between roles don't need to be unique
      var registeredPermission = _.intersection(this.permissions, roles[role].permissions);
      if (registeredPermission.length > 0) {
        throw new Meteor.Error('permission-exists', 'One or more of these permissions already exist in a registered role', registeredPermission)
      }

      this.roles[role] = roles[role];
      this.permissions.push(roles[role].permissions);
    }
  },
  addRoles: function (userId, roles) {
    check(userId, String);
    check(roles, [String]);
    Meteor.users.update({_id: userId}, {$push: {'permissions.$.roles': roles}});
  },
  removeRoles: function (userId, roles) {
    check(userId, String);
    check(roles, [String]);
    Meteor.users.update({_id: userId}, {$pull: {'permissions.$.roles': roles}});
  },
  isInRoles: function (userId, roles) {
    check(userId, String);
    check(roles, [String]);
  },
  addEnabledPermissions: function (userId, permissions) {
    check(userId, String);
    check(permissions, [String]);
  },
  removeEnabledPermissions: function (userId, permissions) {
    check(userId, String);
    check(permissions, [String]);
  },
  hasEnabledPermissions: function (userId, permissions) {
    check(userId, String);
    check(permissions, [String]);
  },
  addDisabledPermissions: function (userId, permissions) {
    check(userId, String);
    check(permissions, [String]);
  },
  removeDisabledPermissions: function (userId, permissions) {
    check(userId, String);
    check(permissions, [String]);
  },
  hasDisabledPermissions: function (userId, permissions) {
    check(userId, String);
    check(permissions, [String]);
  },
  addClasss: function (userId, classIds) {
    check(userId, String);
    check(permissions, [String]);
  },
  removeClasss: function (userId, classIds) {
    check(userId, String);
    check(permissions, [String]);
  },
  isInClasss: function (userId, classIds) {
    check(userId, String);
    check(permissions, [String]);
  },
  createClass: function (classObj) {

  },
  updateClass: function (classId, classObj) {

  },
  removeClass: function (classId) {

  }
};

Permissions.registerRoles({
  fireman: {
    title: "A fireman",
    description: "Does fireman things",
    permissions: ["put-out-fires", "save-cats"]
  }
});

if (Meteor.isClient) {
  AutoForm.hooks({
    userClassUpdateForm: {
      onSuccess: function (formType, result) {
        FlowRouter.redirect('/admin/classes');
      }
    }
  });
}

if (Meteor.isServer) {
  UserClasses.permit(['insert', 'update', 'remove']).apply();

  Meteor.publish(null, function () {
    return Meteor.users.find({_id: this.userId}, {fields: {permissions: 1}});
  });

  Meteor.publish('user-classes-admin', function () {
    //TODO Permission check
    return UserClasses.find();
  });

  /*
   Meteor.publish('user-classes', function () {
   var result = Meteor.users.findOne({_id: this.userId}, {fields: {userClasses: 1}});
   if (Array.isArray(result.userClasses)) {
   return UserClasses.find({_id: {$in: [result.userClasses]}});
   }
   });
   */


  Meteor.users.after.insert(function (userId, doc) {
    //TODO This function can be writen with less lines
    var defaultClasses = UserClasses.find({isDefault: true}, {fields: {_id: 1}});
    var classIds = [];
    defaultClasses.forEach(function (defaultClass) {
      classIds.push(defaultClass._id);
    });
    Meteor.users.update({_id: doc._id}, {$set: {"permissions.classes": classIds}});
  });

}

/*
 Meteor.methods({
 'userClasses/insert': function (doc) {
 check(doc, Gazelle.schema.userClass);
 UserClasses.insert(doc);
 },
 'userClasses/update': function (doc, docId) {
 check(doc, Gazelle.schema.userClass);
 UserClasses.update(docId, {$set: doc.$set});
 },
 'userClasses/delete': function (docId) {
 UserClasses.remove(docId);
 }
 });
 */
