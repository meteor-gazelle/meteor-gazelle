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

      const found = Permissions.findOne({ title: 'permission-group' });

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

    // TODO(ajax) Write tests for removal and disabled permissions. Don't
    // forget to test edge cases.
    describe('add enabled', () => {
      it('addEnabledPermission', () => {
        Methods.addEnabledPermission._execute({ userId }, {
          userId: userId,
          group: 'permission-group',
          permissions: ['permission-a', 'permission-b']
        });

        const user = Meteor.users.findOne(userId);
        assert.include(user.permissionsEnabled,
          'permission-group:permission-a');
        assert.include(user.permissionsEnabled,
          'permission-group:permission-b');
      });

      it('Permissions.hasEnabledPermission', () => {
        assert.ok(Permissions.hasEnabledPermission(userId, 'permission-group',
          ['permission-a', 'permission-b']));
      });

      it('doesn\'t allow duplicate permissions', () => {
        Methods.addEnabledPermission._execute({ userId }, {
          userId: userId,
          group: 'permission-group',
          permissions: ['permission-a', 'permission-b']
        });

        Methods.addEnabledPermission._execute({ userId }, {
          userId: userId,
          group: 'permission-group',
          permissions: ['permission-a']
        });

        const user = Meteor.users.findOne(userId);
        assert.lengthOf(user.permissionsEnabled, 2);
        assert.sameMembers(user.permissionsEnabled,
          ['permission-group:permission-a', 'permission-group:permission-b']);
      });

      it('doesn\'t allow invalid permission groups', () => {
        try {
          Methods.addEnabledPermission._execute({ userId }, {
            userId: userId,
            group: 'invalid-group',
            permissions: ['permission-a']
          });
          assert.ok(false);
        } catch (err) {
          const user = Meteor.users.findOne(userId);
          assert.notInclude(user.permissionsEnabled,
            'invalid-group:permission-a');
        }
      });

      it('adds an enabled permission that\'s currently disabled', () => {
        Methods.addEnabledPermission._execute({ userId }, {
          userId: userId,
          group: 'permission-group',
          permissions: ['permission-a', 'permission-b']
        });

        Methods.addDisabledPermission._execute({ userId }, {
          userId: userId,
          group: 'permission-group',
          permissions: ['permission-b']
        });

        const user = Meteor.users.findOne(userId);

        assert.include(user.permissionsDisabled,
          'permission-group:permission-b');
        assert.include(user.permissionsEnabled,
          'permission-group:permission-a');
        assert.notInclude(user.permissionsEnabled,
          'permission-group:permission-b');
        assert.ok(Permissions.hasDisabledPermission(userId, 'permission-group',
          ['permission-b']));
      });

    });

    describe('remove enabled', () => {
      it('removeEnabledPermission', () => {
        Methods.addEnabledPermission._execute({ userId }, {
          userId: userId,
          group: 'permission-group',
          permissions: ['permission-a', 'permission-b']
        });

        Methods.removeEnabledPermission._execute({ userId }, {
          userId: userId,
          group: 'permission-group',
          permissions: ['permission-a']
        });

        const user = Meteor.users.findOne(userId);
        assert.include(user.permissionsEnabled,
          'permission-group:permission-b');
        assert.notInclude(user.permissionsEnabled,
          'permission-group:permission-a');

        it('Permissions.hasEnabledPermission', () => {
          assert.notOk(Permissions.hasEnabledPermission(userId,
            'permission-group', ['permission-a', 'permission-b']));
          assert.ok(Permissions.hasEnabledPermission(userId,
            'permission-group', ['permission-b']));
          assert.notOk(Permissions.hasEnabledPermission(userId,
            'permission-group', ['permission-a']));
        });
      });
    });

    describe('remove enabled', () => {
      it('removeEnabledPermission', () => {
        Methods.addEnabledPermission._execute({ userId }, {
          userId: userId,
          group: 'permission-group',
          permissions: ['permission-a', 'permission-b']
        });

        Methods.removeEnabledPermission._execute({ userId }, {
          userId: userId,
          group: 'permission-group',
          permissions: ['permission-a']
        });

        const user = Meteor.users.findOne(userId);
        assert.include(user.permissionsEnabled,
          'permission-group:permission-b');
        assert.notInclude(user.permissionsEnabled,
          'permission-group:permission-a');

        it('Permissions.hasEnabledPermission', () => {
          assert.notOk(Permissions.hasEnabledPermission(userId,
            'permission-group', ['permission-a', 'permission-b']));
          assert.ok(Permissions.hasEnabledPermission(userId, 'permission-group',
            ['permission-b']));
          assert.notOk(Permissions.hasEnabledPermission(userId,
            'permission-group', ['permission-a']));
        });
      });
    });

    describe('add disabled', () => {
      it('adds the disabled permission', () => {
        Methods.addDisabledPermission._execute({ userId }, {
          userId: userId,
          group: 'permission-group',
          permissions: ['permission-a', 'permission-b']
        });

        const user = Meteor.users.findOne(userId);
        assert.include(user.permissionsDisabled,
          'permission-group:permission-a');
        assert.include(user.permissionsDisabled,
          'permission-group:permission-b');
      });

      it('Permissions.hasDisabledPermission', () => {
        assert.ok(Permissions.hasDisabledPermission(userId, 'permission-group',
          ['permission-a', 'permission-b']));
      });

      it('adds a disabled permission that is currently enabled', () => {
        before(() => {
          // Make sure the database is clean
          Permissions.remove({});
        });

        // Add disabled when a perm is enabled
        Methods.addEnabledPermission._execute({ userId }, {
          userId: userId,
          group: 'permission-group',
          permissions: ['permission-a', 'permission-b']
        });

        Methods.addDisabledPermission._execute({ userId }, {
          userId: userId,
          group: 'permission-group',
          permissions: ['permission-a']
        });

        const user = Meteor.users.findOne(userId);

        assert.include(user.permissionsDisabled,
          'permission-group:permission-a');
        assert.include(user.permissionsEnabled,
          'permission-group:permission-b');
        assert.notInclude(user.permissionsEnabled,
          'permission-group:permission-a');

        it('has disabled permission', () => {
          assert.ok(Permissions.hasDisabledPermission(userId,
            'permission-group', ['permission-a']));
        });
      });
    });

    describe('remove disabled', () => {
      it('removes disabled permission', () => {
        Methods.addDisabledPermission._execute({ userId }, {
          userId: userId,
          group: 'permission-group',
          permissions: ['permission-a', 'permission-b']
        });

        Methods.removeDisabledPermission._execute({ userId }, {
          userId: userId,
          group: 'permission-group',
          permissions: ['permission-a']
        });

        const user = Meteor.users.findOne(userId);
        assert.include(user.permissionsDisabled,
          'permission-group:permission-b');
        assert.notInclude(user.permissionsDisabled,
          'permission-group:permission-a');

        it('properly removes permissions', () => {
          assert.notOk(Permissions.hasDisabledPermission(userId,
            'permission-group', ['permission-a', 'permission-b']));
          assert.ok(Permissions.hasDisabledPermission(userId,
            'permission-group', ['permission-b']));
          assert.notOk(Permissions.hasDisabledPermission(userId,
            'permission-group', ['permission-a']));
        });
      });
    });
  });
});
