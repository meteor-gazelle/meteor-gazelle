beforeEach(function () {
  MeteorStubs.install();
  mock(global, 'UserClass');
  mock(global, 'User');
  mock(global, 'Roles');
});

afterEach(function () {
  MeteorStubs.uninstall();
});

describe('updateUserClass method', function () {
  it('updates all instances of the class', function () {
    var newClass = {
      title: 'newTitle',
      shortTitle: 'NT',
      secondary: true
    };
    var updatedClass = {};

    User.update = function (query, modifier, opts) {
      updatedClass.title = modifier.$set['classes.$.title'];
      updatedClass.shortTitle = modifier.$set['classes.$.shortTitle'];
      updatedClass.secondary = modifier.$set['classes.$.secondary'];
    };

    spyOn(UserClass, 'findOne').and.returnValue(newClass);
    Meteor.call('updateUserClass', null, null);
    expect(updatedClass).toEqual(newClass);
  });
});

describe('createUserClass method', function () {
  var classInfo = {
    title: 'classTitle',
    shortTitle: 'CT',
    secondary: false,
    roles: ['123', '456']
  };

  it('inserts into the database', function () {
    spyOn(UserClass, 'findOne').and.returnValue({
      _id: 1
    });
    spyOn(UserClass, 'insert');
    Meteor.call('createUserClass', classInfo);
    expect(UserClass.insert).toHaveBeenCalledWith(classInfo);
  });
});

describe('updateUsersClasses method', function () {
  it('adds appropriate roles', function () {
    var rolesParam = [];
    Roles.addUsersToRoles = function (userId, roles, group) {
      rolesParam = roles;
    };
    spyOn(UserClass, 'findOne').and.returnValue({
      _id: 2,
      roles: ['1', '2', '3']
    });
    Meteor.call('updateUsersClasses', {
      userId: 1,
      classes: [{
        classId: 2
      }]
    });
    expect(rolesParam).toEqual(['1', '2', '3']);
  });

  it('adds classes to user', function () {
    var updatedUser = {};
    User.update = function (query, modifier) {
      if (typeof (modifier.$unset) === 'undefined') {
        updatedUser = _.pick(modifier.$addToSet.classes, 'classId');
      }
    };
    spyOn(UserClass, 'findOne').and.returnValue({
      _id: 2,
      roles: ['1', '2', '3']
    });
    Meteor.call('updateUsersClasses', {
      userId: 1,
      classes: [{
        classId: 2
      }]
    });
    expect(updatedUser).toEqual({
      classId: 2
    });
  });
});
