// Adapted from https://github.com/jagi/meteor-astronomy-timestamp-behavior/
events = {};

events.beforeInsert = function () {
  // Find a class on which the behavior had been set.
  var behaviorData = Astro.utils.behaviors.findBehavior(this.constructor,
                                          'astronomy-createdby-behavior');

  // If the "hasCreatedByField" option is set.
  if (behaviorData.hasCreatedByField) {
    // Set value for createdBy field.
    this.set(behaviorData.createdByFieldName, Meteor.userId());
  }

  // Set so the updatedBy field is never null.
  if (behaviorData.hasUpdatedByField) {
    // Set value for updatedBy field.
    var updatedArray = this.get(behaviorData.updatedByFieldName)
                           .push(Meteor.userId());
    this.set(behaviorData.updatedByFieldName, updatedArray);
  }
};

events.beforeUpdate = function () {
  // Find a class on which the behavior had been set.
  var behaviorData = Astro.utils.behaviors.findBehavior(this.constructor,
                                          'astronomy-createdby-behavior');

  // If the "hasUpdatedByField" option is set.
  if (behaviorData.hasUpdatedByField) {
    // We only set the "updatedBy" field if there are any changes.
    if (_.size(this.getModified())) {
      // Set value for the "updatedBy"  field.
      this.set(behaviorData.updatedByFieldName, Meteor.userId());
    }
  }
};