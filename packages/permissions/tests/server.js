import {Permissions, PermissionGroup} from 'meteor/meteor-gazelle:permissions';

describe('permissions', () => {
  describe('Permissions.register', () => {
    it('Registers permissions', () => {
      const permissionA = {
        title: 'permission-a',
        description: 'This is permission a'
      };

      const permissionB = {
        title: 'permission-b',
        description: 'This is permission b'
      };

      const group = new PermissionGroup('permission-group', 'Permission group description', [permissionA, permissionB]);

      Permissions.register(group);

      const found = Permissions.findOne({title: 'permission-group'});

      assert.deepEqual(found.permissions[0], permissionA);
      assert.deepEqual(found.permissions[1], permissionB);
    });
  });
});
