import { PermissionGroup } from './permissionGroup.js';
import { PermissionUtils } from './permissionUtils.js';

export const Permissions = new Meteor.Collection('permissions');

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

//TODO(ajax) This method can be more efficient by taking in an array of permission strings
Permissions.exists = (permission) => {
  const normalized = PermissionUtils.normalizePermissionString(permission);
  return PermissionUtils.validatePermissionExists(normalized.group, normalized.permission);
};

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
      throw new Meteor.Error('invalid-parameter',
        'Permissions.register expects a PermissionGroup');
    }
  };
}


Permissions.hasEnabledPermission = PermissionUtils.hasEnabledPermission;
Permissions.hasDisabledPermission = PermissionUtils.hasDisabledPermission;

/*

 Permissions

 Each user carries a set of permissions.
 Users can have permissons that are enable or disabled.
 Lack of a permission does not mean it's in the enabled set.

 Permissions are defined server side by creating PermissionGroups
 and adding permissions to them.
 On app startup, registered permissions are stored in the database.
 Permissions are broken up into permission groups which collects a group
 of permissions related to their functionality.

 The Meteor.user document is modified to store the specific user's permissions
 in enabled, disabled, and class permission sets.
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

 Class permissions need to be stored in its own set on the user document rather
 than the enabled permissions set.

 Class methods
 CRUD
 getClassesForUser
 addClassToUser
 removeClassFromUser

 Thoughts
 Need to be diligent about changing permission related metadata since changes
 arent synced to the db.
 Groups are looked up by title. Permission Group and permission titles must be
 looked after with care.
 Should Meteor.user permissions and classes be published for caching in
 minimongo?
 */
