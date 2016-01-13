Permissions = {
  register (permissionGroup) {
    // Only accept argument of type PermissionGroup
    if (permissionGroup instanceof PermissionGroup) {
      // Determine if a group exists in the database
      const group = PermissionGroupsCollection.findOne({ title: permissionGroup.title });
      let groupId = null;

      // If there's no group, insert one.
      if (!group) {
        groupId = PermissionGroupsCollection.insert({ title: permissionGroup.title, description: permissionGroup.description });
      } else {
        groupId = group._id;
      }

      // Determine if permissions inside the group exist in the database
      //TODO(ajax) Potential pain point: How to handle description changes? Currently they aren't kept in sync.
      for (let key in permissionGroup.permissions) {
        const description = permissionGroup.permissions[key];
        // Insert permission if it does not exist.
        PermissionsCollection.upsert({ groupId: groupId, title: key },
          { $set : { groupId: groupId, title: key, description: description }});
      }
    }
    else {
      throw new Meteor.Error('invalid-parameter', 'Permissions.register expects a PermissionGroup');
    }
  }
};
