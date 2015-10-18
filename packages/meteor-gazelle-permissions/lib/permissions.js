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
  },
  registerRoles: function (roles) {
    var registeredRoles = _.intersection(_.keys(this.roles), _.keys(roles));
    if (registeredRoles.length > 0) {
      throw new Meteor.Error('role-exists', 'One or more of these roles have already been registered', registeredRoles);
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
  }
};

Permissions.registerRoles({
  superuser: {
    title: "Super User",
    description: "This role provides super user permissions and is assigned to the first user on the site",
    permissions: []
  }
});

Permissions.registerRoles({
  fireman: {
    title: "Fireman",
    description: "Does fireman things",
    permissions: ["put-out-fires", "save-cats"]
  }
});

if (Meteor.isClient) {
  AutoForm.hooks({
    userClassEditForm: {
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

  Meteor.users.after.insert(function (userId, doc) {
    //TODO This can be written with less lines
    var defaultClasses = UserClasses.find({isDefault: true}, {fields: {_id: 1}});
    var classIds = [];
    defaultClasses.forEach(function (defaultClass) {
      classIds.push(defaultClass._id);
    });
    Meteor.users.update({_id: doc._id}, {$set: {"permissions.classes": classIds}});
  });

}
