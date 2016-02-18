import { LoggedInMixin } from 'meteor/meteor-gazelle:method-mixins';
import { UserClass } from './userClass.js';
import { Permissions } from 'meteor/meteor-gazelle:permissions';

//TODO(ajax) Permission checks
export const Methods = {
  create: new ValidatedMethod({
    name: 'UserClass.methods.create',
    mixins: [LoggedInMixin],
    validate: null,
    run (userClass) {
      // Check that passed in permissions are valid
      userClass.permissions.forEach(value => {
        Permissions.exists(value);
      });
      UserClass.insert(userClass);
    }
  }),
  remove: new ValidatedMethod({
    name: 'UserClass.methods.remove',
    mixins: [LoggedInMixin],
    validate: null,
    run ({ classId }) {

    }
  }),
  edit: new ValidatedMethod({
    name: 'UserClass.methods.edit',
    mixins: [LoggedInMixin],
    validate: null,
    run ({ classId }) {

    }
  }),
};
