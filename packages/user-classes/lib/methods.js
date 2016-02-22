import { LoggedInMixin } from 'meteor/meteor-gazelle:method-mixins';
import { UserClass } from './userClass.js';
import { Permissions } from 'meteor/meteor-gazelle:permissions';

const checkPermissions = (userClass) => {
  if (userClass.permissions) {
    userClass.permissions.forEach(value => {
      Permissions.exists(value);
    });
  }
};

//TODO(ajax) Permission checks
export const Methods = {
  create: new ValidatedMethod({
    name: 'UserClass.methods.create',
    mixins: [LoggedInMixin],
    validate: UserClass.schema.validator({clean: true}),
    run (userClass) {
      checkPermissions(userClass);
      UserClass.insert(userClass);
    }
  }),
  remove: new ValidatedMethod({
    name: 'UserClass.methods.remove',
    mixins: [LoggedInMixin],
    validate: null,
    run ({ _id }) {
      UserClass.remove(_id);
    }
  }),
  update: new ValidatedMethod({
    name: 'UserClass.methods.edit',
    mixins: [LoggedInMixin],
    validate: null,
    run (userClass) {
      checkPermissions(userClass);
      const userClassId = userClass._id;
      delete userClass._id;
      UserClass.update(userClassId, {$set: userClass});
    }
  })
};
