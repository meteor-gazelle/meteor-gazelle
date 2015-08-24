// Based on the meteor-astronomy-timestamp-behavior package:
// https://github.com/jagi/meteor-astronomy-timestamp-behavior/
Astro.createBehavior({
  name: 'createdby',
  options: {
    hasCreatedByField: true,
    createdByFieldName: 'createdBy',
    hasUpdatedByField: true,
    updatedByFieldName: 'updatedBy'
  },
  validators: {
    'hasCreatedByField': Validators.boolean(),
    'createdByFieldName': Validators.string(),
    'hasUpdatedByField': Validators.boolean(),
    'updatedByFieldName': Validators.string()
  },
  events: {
    addbehavior: function (behaviorData) {

      // Set default behavior's options if they were not provided in the schema.
      if (_.isUndefined(behaviorData.hasCreatedByField)) {
        behaviorData.hasCreatedByField = behavior.options.hasCreatedByField;
      }
      if (_.isUndefined(behaviorData.CreatedByFieldName)) {
        behaviorData.createdByFieldName = behavior.options.CreatedByFieldName;
      }
      if (_.isUndefined(behaviorData.hasUpdatedByField)) {
        behaviorData.hasUpdatedByField = behavior.options.hasUpdatedByField;
      }
      if (_.isUndefined(behaviorData.updatedByFieldName)) {
        behaviorData.updatedByFieldName = behavior.options.updatedByFieldName;
      }

      // Add created field to the this if not disabled.
      if (behaviorData.hasCreatedByField) {
        // Get created field name (can be overridden by user).
        var createdByFieldName = behaviorData.CreatedByFieldName;

        // Add field of "string" type.
        this.addField(createdByFieldName, {
          type: 'string',
          default: null
        });
      }

      // Add updated field to the this if not disabled.
      if (behaviorData.hasUpdatedByField) {
        // Get updated field name (can be overridden by user).
        var updatedByFieldName = behaviorData.updatedByFieldName;

        // Add field of "string" type.
        this.addField(updatedByFieldName, {
          type: 'string',
          default: null
        });
      }

      // Add events to this.
      this.addEvents(events);
    }
  }
});