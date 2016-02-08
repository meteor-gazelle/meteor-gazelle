Tinytest.add('Permissions.register', (test) => {

  const permission = {
    title: 'permission-a',
    description: 'This is permission a'
  };

  const group = new PermissionGroup('permission-group', 'Permission group description', [permission]);

  Permissions.register(group);

  const foundGroup = PermissionsCollection.findOne({title: 'permission-group'});
  test.ok(foundGroup);

  const foundPermission = foundGroup.permissions[0];
  test.equal(foundPermission, permission);

});
