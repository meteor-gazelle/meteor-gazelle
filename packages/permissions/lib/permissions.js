Permissions = {};

Permissions.methods = {};


Permissions.methods = {
  hasEnabledPermission (group, permissions) {
    return Meteor.call('Permissions.methods.hasEnabledPermission', permissions);
  },
  hasDisabledPermission (group, permissions) {
    return Meteor.call('Permissions.methods.hasDisabledPermission', permissions);
  },
  addEnabledPermission (group, permission) {

  },
  removeEnabledPermission (group, permission) {

  },
  addDisabledPermission (group, permission) {

  },
  removeDisabledPermission (group, permission) {

  }
};

function validate (context, group, permissions) {
  User.checkLoggedIn(this);

  check(group, String);
  check(permissions, [String]);
}

function permissionsExist (group, permissions) {
  let doc = PermissionsCollection.findOne({ group: title });
  if (!doc) {
    throw new Meteor.Error('invalid-arguments', 'Permission group does not exist');
  }
  if (!doc.permissions || !Array.isArray(doc.permissions)) {
    throw new Meteor.Error('invalid-arguments', 'No permissions in group');
  }
  if (!doc.)

}

Meteor.methods({
  'Permissions.methods.hasEnabledPermission' (group, permissions) {
    validate(this, group, permissions);
  },
  'Permissions.methods.hasDisabledPermission' (group, permissions) {
    validate(this, group, permissions);

    let permissionsDisabled = Meteor.users.find(this.userId, {enabledPermissions: 1});
  },
  'Permissions.methods.addEnabledPermission' (group, permissions) {
    validate(this, group, permissions);
  }
});
