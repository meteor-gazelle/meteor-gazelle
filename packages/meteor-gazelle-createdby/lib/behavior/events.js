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
      this.set(behaviorData.updatedFieldName, new Date());
    }
  }
};


this.addEvents({
  beforeInsert: function () {
    if ( behaviorData.hasCreatedByField ) {
      this.createdByFieldName = Meteor.userId();
    }
  },
  beforeUpdate: function () {
    if ( behaviorData.hasCreatedByField ) {
      this.updatedByFieldName.push(Meteor.userId());
    }
  }
});