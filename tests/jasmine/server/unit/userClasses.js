beforeEach(function () {
  MeteorStubs.install();
  mock(global, 'UserClass');
  mock(global, 'Class');
  mock(global, 'User');
  mock(global, 'Roles');
});

afterEach(function () {
  MeteorStubs.uninstall();
});

describe('updateUserClass method', function () {
  var newClass = {
    title: 'newTitle',
    shortTitle: 'NT'
  };

  it('updates all instances of the class', function () {
    var updatedClass = {};
    User.update = function (query, modifier, opts) {
      return {
        title: modifier.$set['classes.$.title'],
        shortTitle: modifier.$set['classes.$.shortTitle']
      };
    };
    UserClass.update = function (query, modifier, options) {
      updatedClass.title = modifier.$set.title;
      updatedClass.shortTitle = modifier.$set.shortTitle;
    };

    spyOn(User, 'update');
    spyOn(Class, 'findOne').and.returnValue(newClass);
    Meteor.call('updateUserClass', null, null);
    expect(updatedClass).toEqual(newClass);
    expect(User.update).toHaveBeenCalled();
  });
});

describe('createUserClass method', function () {
  var classInfo = {
    title: 'classTitle',
    shortTitle: 'CT',
    secondary: false,
    roles: [ '123', '456' ]
  };

  it('inserts into the database', function () {
    spyOn(Class, 'findOne').and.returnValue({
      _id: 1
    });
    spyOn(Class, 'insert');
    spyOn(UserClass, 'insert');
    Meteor.call('createUserClass', classInfo);
    expect(Class.insert).toHaveBeenCalledWith(classInfo);
    expect(UserClass.insert).toHaveBeenCalledWith({
      title: classInfo.title,
      shortTitle: classInfo.shortTitle,
      classId: Class.findOne(null, null)._id
    });
  });
});

describe('editUserClasses method', function () {
  it('adds appropriate roles', function () {
    var rolesParam = [];
    Roles.addUsersToRoles = function (userId, roles, group) {
      rolesParam = roles;
    };
    spyOn(Class, 'findOne').and.returnValue({
      roles: [ '1', '2', '3' ]
    });
    spyOn(UserClass, 'findOne').and.returnValue({
      classId: 1
    });
    Meteor.call('editUserClasses', {
      userId: 1,
      classes: [{
        classId: 2
      }]
    });
    expect(rolesParam).toEqual([ '1', '2', '3' ]);
  });

  it('adds classes to user', function () {
    var updatedUser = {};
    User.update = function (query, modifier) {
      if (typeof (modifier.$unset) === 'undefined') {
        updatedUser = modifier.$addToSet.classes;
      }
    };
    spyOn(UserClass, 'findOne').and.returnValue({
      classId: 2
    });
    spyOn(Class, 'findOne').and.returnValue({
      roles: [ '1', '2', '3' ]
    });
    Meteor.call('editUserClasses', {
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
