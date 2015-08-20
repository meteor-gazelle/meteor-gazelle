// Adapted from https://github.com/jagi/meteor-astronomy-timestamp-behavior/
events = {};

events.beforeInsert = function () {
  // Find a class on which the behavior had been set.
  var behaviorData = Astro.utils.behaviors.findBehavior(this.constructor,
                                                        'createdby');

  // If the "hasCreatedByField" option is set.
  if (behaviorData.hasCreatedByField) {
    // Set value for createdBy field.
    this.set(behaviorData.createdByFieldName, Meteor.userId());
  }

  // If the "hasCreatedAtField" option is set.
  if (behaviorData.hasCreatedAtField) {
    // Set createdAt field.
    this.set(behaviorData.createdAtFieldName, new Date());
  }
};

events.beforeUpdate = function () {
  // Find a class on which the behavior had been set.
  var behaviorData = Astro.utils.behaviors.findBehavior(this.constructor,
                                                        'createdby');

  // If the "hasUpdatedByField" option is set.
  if (behaviorData.hasUpdatedByField) {
    // We only set the "updatedAt" field if there are any changes.
    if (_.size(this.getModified())) {
      // Set value for the "updatedAt" field.
      this.set(behaviorData.updatedByFieldName, Meteor.userId());
    }
  }

  // If the "hasUpdatedAtField" option is set.
  if (behaviorData.hasUpdatedAtField) {
    // We only set the "updatedAt" field if there are any changes.
    if (_.size(this.getModified())) {
      // Set value for the "updatedAt" field.
      this.set(behaviorData.updatedAtFieldName, new Date());
    }
  }
};