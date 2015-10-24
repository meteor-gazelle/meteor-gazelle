UserClasses.attachSchema(Gazelle.schema.userClass);
UserClassesSubs = new SubsManager();


UserClasses = (function () {
  var UserClasses = new Mongo.Collection('userClasses');
  var subs = new SubsManager();

  return {
    _collections: {
      userClasses: UserClasses
    },
    _schemas: {
      userClass: GazelleSchema.collections
    },
    _subs: subs
  }
})();

Permissions = (function () {
  var roles = {};
  var permissions = [];

  /**
   *
   * Gets user's permissions sub document
   *
   * @param userId The user's id
   * @returns The permissions sub document on Meteor.user
   */
  var getUserPermissions = function (userId) {
    check(userId, String);

    var results = Meteor.users.findOne(userId, {
      fields: {
        permissions: 1
      }
    });

    if (results === undefined) {
      throw new Meteor.Error('User not found');
    }

    return results.permissions;
  }

  return {
    hasRole: function(userId, role) {

    }
  };


})();


/**
 *
 * Gets user's permissions sub document
 *
 * @param userId The user's id
 * @returns The permissions sub document on Meteor.user
 */
var getUserPermissions = function (userId) {
  check(userId, String);

  var results = Meteor.users.findOne(userId, {
    fields: {
      permissions: 1
    }
  });

  if (results === undefined) {
    throw new Meteor.Error('User not found');
  }

  return results.permissions;
}

Permissions = {
  permissions: [],
  roles: {},
  hasRole: function (userId, role) {
    check(userId, String);
    debugger;
    var userPermissions = getUserPermissions(userId);
  },
  hasPermission: function (userId, permission) {
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
  fireman: {
    title: 'Fireman',
    description: 'Does fireman things',
    permissions: ['put-out-fires', 'save-cats']
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


  // This hook runs when new users are created.
  // The first parameter, 'userId' can be null, use doc._id
  Meteor.users.after.insert(function (userId, doc) {
    setSuperUser(doc._id);
    setDefaultClasses(doc._id);
  });

  /**
   *
   * Checks if is first user on the site
   * if they are then give them the super-user role
   *
   * @param userId The user's id
   */
  var setSuperUser = function (userId) {
    var isFirstUser = Meteor.users.find().count() === 1;
    if (isFirstUser) {
      Meteor.users.update(
        {_id: doc._id},
        {$push: {'permissions.enabledPermissions': 'super-user'}}
      );
    }
  }

  /**
   * Assigns default classes to the user
   *
   * @param userId The user's id
   */
  var setDefaultClasses = function (userId) {
    //TODO This can be written with less lines
    var defaultClasses = UserClasses.find({isDefault: true}, {fields: {_id: 1}});
    var classIds = [];
    defaultClasses.forEach(function (defaultClass) {
      classIds.push(defaultClass._id);
    });
    Meteor.users.update(
      {_id: doc.userId},
      {$set: {'permissions.classes': classIds}});
  };
}
