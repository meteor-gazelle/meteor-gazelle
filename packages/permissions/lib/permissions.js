let permissionSchema = new SimpleSchema({
  groupId: {
    type: String,
    index: true
  },
  title: {
    type: String,
    index: true
  },
  description: {
    type: String
  }
});

let groupSchema = new SimpleSchema({
  title: {
    type: String,
    index: true,
    unique: true
  },
  description: {
    type: String
  }
});

let permissionsCollection = new Meteor.Collection('permissions');
permissionsCollection.attachSchema(permissionSchema);

let permissionGroupsCollection = new Meteor.Collection('permissionGroups');
permissionGroupsCollection.attachSchema(groupSchema);

Permissions = {
  register (permissionGroup) {
    if (permissionGroup instanceof PermissionGroup) {
      let group = permissionGroupsCollection.findOne({ title: permissionGroup.title });
      let groupId = null;

      if (!group) {
        groupId = permissionGroupsCollection.insert({ title: permissionGroup.title, description: permissionGroup.description });
      } else {
        groupId = group._id;
      }

      for (let key in permissionGroup.permissions) {
        let description = permissionGroup.permissions[key];
        /*
        let permission = permissionsCollection.findOne({ groupId: groupId, title: key });
        if (!permission) {
          permissionsCollection.insert({groupId: groupId, title: key, description: description});
        }*/
        permissionsCollection.upsert({ groupId: groupId, title: key },
          { $set : { groupId: groupId, title: key, description: description }});
      }
    }
    else {
      throw new Meteor.Error('invalid-parameter', 'Permissions.register expects a PermissionGroup');
    }
  }
};


/*let userPermissionsSchema = new SimpleSchema({
 permissionsAllowed: {
 type: Object,
 optional: true
 },
 permissionsDenied: {
 type: Object,
 optional: true
 }
 });

 Meteor.users.attachSchema(userPermissionsSchema);

 Permissions = {};

 if (Meteor.isServer) {

 }

 /*
 Permissions = {
 _groups: {},
 _collections: {},
 register (group) {
 // Check that the group is a string
 check(group, String);
 // The group hasn't been defined yet then assign it an empty array to hold the permissions
 if (this._groups[group] === undefined) {
 this._groups[group] = [];
 }
 return {
 add: (permissions) => {
 // Convert passed in permission to an array if necessary
 permissions = Array.isArray(permissions) ? permissions.slice() : [permissions];
 // For each passed in permission
 permissions.forEach(permission => {
 // Check that permission is a string
 check(permission, String);
 // If the permission is duplicate (already been registered) throw an exception
 if (this._groups[group].indexOf(permission) !== -1) {
 throw new Meteor.Error(`Permission ${permission} already registered in group ${group}`);
 }
 });
 // Push the permission onto their corresponding group
 this._groups[group].push(...permissions);
 }
 };
 },
 addPermission (userId, group, permission) {

 },
 removePermission (userId, group, permission) {

 },
 hasPermission (userId, group, permission) {

 }
 };
 */
