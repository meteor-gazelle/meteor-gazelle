UserClassesPermissions = new PermissionGroup('user-classes',
  'User class permissions', [
    {
      title: 'create-class',
      description: 'Create a user class'
    },
    {
      title: 'edit-class',
      description: 'Edit a user class'
    }
  ]);

Meteor.startup(() => {
  if (Meteor.isServer) {
    Permissions.register(UserClassesPermissions);
  }
});
