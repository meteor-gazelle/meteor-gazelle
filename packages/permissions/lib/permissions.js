import { PermissionGroup } from './permissionGroup.js'

class PermisionsCollection extends Mongo.Collection {
  /*
  insert(doc, callback) {
  }

  update(selector, modifier) {
  }

  remove(selector) {
  }
  */
}


export const Permissions = new PermisionsCollection('permissions');

Permissions.schema = new SimpleSchema({
  title: {
    type: String,
    index: true,
    unique: true
  },
  description: {
    type: String
  },
  permissions: {
    type: [new SimpleSchema({
      title: {
        type: String,
        index: true
      },
      description: {
        type: String
      }
    })],
    index: true,
    defaultValue: []
  }
});

if (Meteor.isServer) {
  Permissions.register = (permissionGroup) => {
    // Only accept argument of type PermissionGroup
    if (permissionGroup instanceof PermissionGroup) {
      Permissions.upsert({title: permissionGroup.title}, {
        $set: {
          title: permissionGroup.title,
          description: permissionGroup.description,
          permissions: permissionGroup.permissions
        }
      });
    }
    else {
      throw new Meteor.Error('invalid-parameter', 'Permissions.register expects a PermissionGroup');
    }
  };
}

Meteor.startup(() => {
  const userPermissionsSchema = new SimpleSchema({
    permissionsEnabled: {
      type: [String],
      optional: true,
      index: true
    },
    permissionsDisabled: {
      type: [String],
      optional: true,
      index: true
    }
  });

  Meteor.users.attachSchema(userPermissionsSchema);
});



/*

 Permissions

 Each user carries a set of permissions.
 Users can have permissons that are enable or disabled.
 Lack of a permission does not mean it's in the enabled set.

 Permissions are defined server side by creating PermissionGroups and adding permissions to them.
 On app startup, registered permissions are stored in the database.
 Permissions are broken up into permission groups which collects a group of permissions related to their functionality.

 The Meteor.user document is modified to store the specific user's permissions in enabled, disabled, and class permission sets.
 Permission methods
 register -  Register permissions by writing them to db. - Done
 hasPermission - Check that user has a permission to perform an action.
 hasClassPermission - Check that user has a class permission.
 hasEnabledPermission - Check that user has an enabled permission.
 hasDisabledPermission - Check that user has a disabled permission.
 enablePermissions - Adds an enabled permission.
 disablePermissions - Adds a disabled permission.


 Classes

 Each user carries a set of classes.
 Classes are created by priveleged users through the site.
 Classes carry a set of permissions.
 If a user has a class then they have the class permissions enabled.

 Class permissions need to be stored in its own set on the user document rather than the enabled permissions set.

 Class methods
 CRUD
 getClassesForUser
 addClassToUser
 removeClassFromUser

 Thoughts
 Need to be diligent about changing permission related metadata since changes arent synced to the db.
 Groups are looked up by title. Permission Group and permission titles must be looked after with care.
 Should Meteor.user permissions and classes be published for caching in minimongo?




 Permissions = {};

 Permissions.methods = {};

 const ENABLED_PERMISSIONS_FIELD = 'permissionsEnabled';
 const DISABLED_PERMISSIONS_FIELD = 'permissionsDisabled';

 Permissions.methods = {
 hasEnabledPermission (group, permissions, callback) {
 return Meteor.call('Permissions.methods.hasEnabledPermission', group, permissions, callback);
 },
 hasDisabledPermission (group, permissions, callback) {
 return Meteor.call('Permissions.methods.hasDisabledPermission', group, permissions, callback);
 },
 addEnabledPermissions (userId, group, permission) {
 return Meteor.call('Permissions.methods.addEnabledPermissions', userId, group, permission);
 },
 removeEnabledPermissions (userId, group, permission) {
 return Meteor.call('Permissions.methods.removeEnabledPermissions', userId, group, permission);
 },
 addDisabledPermissions (userId, group, permission) {
 return Meteor.call('Permissions.methods.addDisabledPermissions', userId, group, permission);
 },
 removeDisabledPermissions (userId, group, permission) {
 return Meteor.call('Permissions.methods.removeDisabledPermissions', userId, group, permission);
 }
 };

 Meteor.methods({
 'Permissions.methods.hasEnabledPermission' (group, permissions) {
 //TODO(ajax) How to handle 'private' Meteor methods without redundant User checks? Consider a GazelleMethod a la ValidatedMethod
 User.checkLoggedIn(this);
 return userHasPermission(group, permissions, ENABLED_PERMISSIONS_FIELD);
 },
 'Permissions.methods.hasDisabledPermission' (group, permissions) {
 User.checkLoggedIn(this);
 return userHasPermission(group, permissions, DISABLED_PERMISSIONS_FIELD);
 },
 'Permissions.methods.addEnabledPermissions' (userId, group, permissions) {
 User.checkLoggedIn(this);
 addPermissions(userId, group, permissions, ENABLED_PERMISSIONS_FIELD);
 },
 'Permissions.methods.removeEnabledPermissions' (userId, group, permissions) {
 User.checkLoggedIn(this);
 removePermissions(userId, group, permissions, ENABLED_PERMISSIONS_FIELD);
 },
 'Permissions.methods.addDisabledPermissions' (userId, group, permissions) {
 User.checkLoggedIn(this);
 addPermissions(userId, group, permissions, DISABLED_PERMISSIONS_FIELD);
 },
 'Permissions.methods.removeDisabledPermissions' (userId, group, permissions) {
 User.checkLoggedIn(this);
 removePermissions(userId, group, permissions, DISABLED_PERMISSIONS_FIELD);
 }
 });

 function getOppositeType(type) {
 return type === ENABLED_PERMISSIONS_FIELD ? DISABLED_PERMISSIONS_FIELD : ENABLED_PERMISSIONS_FIELD;
 }

 function findGroupByTitle(group) {
 return PermissionsCollection.findOne({title: group});
 }

 function validate(group, permissions) {
 //TODO(ajax) Need a permission to check that user who is running this method actually has permission to edit permissions
 check(group, String);
 check(permissions, [String]);
 }

 function validatePermissionType(type) {
 if (type !== ENABLED_PERMISSIONS_FIELD && type !== DISABLED_PERMISSIONS_FIELD) {
 throw new Meteor.Error('invalid-arguments', 'Invalid permission field name');
 }
 }

 function validatePermissionExists(group, permissions) {
 const doc = findGroupByTitle(group);
 if (!doc) {
 //TODO(ajax) Find standards for error messages. Expose an Errors key value object for storing them.
 throw new Meteor.Error('invalid-arguments', 'Permission group does not exist');
 }
 if (!doc.permissions || !Array.isArray(doc.permissions)) {
 throw new Meteor.Error('invalid-arguments', 'No permissions in group');
 }
 // Make sure the passed permissions are a proper subset of the registered permissions
 const permissionTitles = doc.permissions.map(value => value.title);
 if (_.difference(permissions, permissionTitles).length > 0) {
 throw new Meteor.Error('invalid-arguments', 'Invalid permission');
 }
 }

 function userHasPermission(group, permissions, type) {
 validatePermissionType(type);
 validate(group, permissions);
 //validatePermissionExists(group, permissions);

 const user = Meteor.users.findOne({_id: Meteor.userId()});
 const denormalizedPermissions = permissions.map((permission) => denormalizeGroupAndPermission(group, permission));

 if (user[type] === undefined) {
 return false;
 }

 const userPermissions = user[type];

 // If a passed in permission doesn't exist, return false, otherwise return true
 return _.difference(denormalizedPermissions, userPermissions).length === 0 ? true : false;
 }

 function addPermissions(userId, group, permissions, type) {
 validatePermissionType(type);
 validate(group, permissions);
 validatePermissionExists(group, permissions);

 // Build the query
 const query = {
 $addToSet: {},
 $pull: {}
 };

 // Denormalize the group and permissions
 const denormalizedPermissions = permissions.map((permission) => denormalizeGroupAndPermission(group, permission));

 query.$addToSet[type] = {$each: denormalizedPermissions};
 // If the permission is being enabled but already exists in the disabled set, remove it from the disabled set.
 query.$pull[getOppositeType(type)] = {$in: denormalizedPermissions};

 // Update the user's permissions
 Meteor.users.update(userId, query);
 }

 function removePermissions(userId, group, permissions, type) {
 validatePermissionType(type);
 validate(group, permissions);
 validatePermissionExists(group, permissions);

 // Build the query
 const query = {
 $pull: {}
 };

 // Denormalize the group and permissions
 const denormalizedPermissions = permissions.map((permission) => denormalizeGroupAndPermission(group, permission));

 query.$pull[type] = { $in: denormalizedPermissions };

 // Update the user's permissions
 Meteor.users.update(userId, query);
 }

 function denormalizeGroupAndPermission(group, permission) {
 //TODO(ajax) Make seperator configurable and potentially a disallowed character in permissions and group titles
 return group + ':' + permission;
 }


 */
