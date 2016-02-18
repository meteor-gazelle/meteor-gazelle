import { Hooks } from 'meteor/meteor-gazelle:hooks';
import { UserClass } from './userClass.js';

// Add default classes to user on registration

const addDefaultClasses = (userId) => {
  // Find the default classes
  const defaultClasses = UserClass.find({ isDefaultClass: true });
  // Store their class ids
  const classIds = defaultClasses.map(value => value._id);
  if (classIds.length) {
    // Add default classes to user
    UserClass.addClassToUser(userId, classIds);
  }
};

Hooks.addCallback('userRegistered', (userId) => {
  addDefaultClasses(userId);
});
