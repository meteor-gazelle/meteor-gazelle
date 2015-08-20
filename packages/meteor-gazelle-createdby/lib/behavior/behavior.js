// Based on the meteor-astronomy-timestamp-behavior package:
// https://github.com/jagi/meteor-astronomy-timestamp-behavior/
Astro.createBehavior({
  name: 'createdby',
  options: {
    hasCreatedByField: true,
    createdByFieldName: 'createdBy',
    hasUpdatedByField: true,
    updatedByFieldName: 'updatedBy',
    hasCreatedAtField: true,
    createdAtFieldName: 'createdAt',
    hasUpdatedAtField: true,
    updatedAtFieldName: 'updatedAt'
  },
  validators: {
    'hasCreatedByField': Validators.boolean(),
    'createdByFieldName': Validators.string(),
    'hasUpdatedByField': Validators.boolean(),
    'updatedByFieldName': Validators.string(),
    'hasCreatedAtField': Validators.boolean(),
    'createdAtFieldName': Validators.string(),
    'hasUpdatedAtField': Validators.boolean(),
    'updatedAtFieldName': Validators.string()
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
      if (_.isUndefined(behaviorData.hasCreatedAtField)) {
        behaviorData.hasCreatedAtField = behavior.options.hasCreatedAtField;
      }
      if (_.isUndefined(behaviorData.CreatedAtFieldName)) {
        behaviorData.createdAtFieldName = behavior.options.CreatedAtFieldName;
      }
      if (_.isUndefined(behaviorData.hasUpdatedAtField)) {
        behaviorData.hasUpdatedAtField = behavior.options.hasUpdatedAtField;
      }
      if (_.isUndefined(behaviorData.updatedAtFieldName)) {
        behaviorData.updatedAtFieldName = behavior.options.updatedAtFieldName;
      }

      // Check validity of options.
      checks.behaviorData.call(this, behaviorData);

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

      // Add createdAt field to the this if not disabled.
      if (behaviorData.hasCreatedAtField) {
        // Get createdAt field name (can be overridden by user).
        var createdAtFieldName = behaviorData.CreatedAtFieldName;

        // Add field of "date" type.
        this.addField(createdAtFieldName, {
          type: 'date',
          default: null
        });
      }

      // Add updatedAt field to the this if not disabled.
      if (behaviorData.hasUpdatedAtField) {
        // Get updatedAt field name (can be overridden At user).
        var updatedAtFieldName = behaviorData.updatedAtFieldName;

        // Add field of "date" type.
        this.addField(updatedAtFieldName, {
          type: 'date',
          default: null
        });
      }

      // Add events to this.
      this.addEvents(events);
    }
  }
});