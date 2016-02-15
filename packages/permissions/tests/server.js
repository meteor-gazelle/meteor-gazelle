import {
  Permissions,
  PermissionGroup,
  Methods
} from 'meteor/meteor-gazelle:permissions';

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

      const group = new PermissionGroup('permission-group',
        'Permission group description', [permissionA, permissionB]);

      Permissions.register(group);

      const found = Permissions.findOne({title: 'permission-group'});

      assert.deepEqual(found.permissions[0], permissionA);
      assert.deepEqual(found.permissions[1], permissionB);
    });
  });

  describe('Methods', () => {
    let userId = null;

    before(() => {
      // TODO(ajax) We need a factory for user creation
      Meteor.users.remove({});
      userId = Accounts.createUser({
        email: 'test1@test.com',
        username: 'test1',
        'password': '123456'
      });
    });

    // TODO(ajax) Write tests for removal and disabled permissions. Don't forget to test edge cases.
    describe('enabled', () => {
      it('addEnabledPermission', () => {
        Methods.addEnabledPermission._execute({userId}, {
          userId: userId,
          group: 'permission-group',
          permissions: ['permission-a', 'permission-b']
        });

        const user = Meteor.users.findOne(userId);
        assert.include(user.permissionsEnabled, 'permission-group:permission-a');
        assert.include(user.permissionsEnabled, 'permission-group:permission-b');
      });

      it('Permissions.hasEnabledPermission', () => {
        assert.ok(Permissions.hasEnabledPermission(userId, 'permission-group', ['permission-a', 'permission-b']));
      });
    });

  });
});
