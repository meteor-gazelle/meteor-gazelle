import { UserClass } from './userClass.js';

//TODO(ajax) Add permissions and login check
Meteor.publish('manage-user-classes', function () {
  return UserClass.find();
});
