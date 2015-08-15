Astro.createBehavior({
  name: 'createdBy',
  events: {
    addbehavior: function(behaviorData) {
      var self = this;

      self.addFields({
        createdBy: {
          type: 'string',
          default: null
        },
        updatedBy: {
          type: 'string',
          default: []
        }
      });

      self.addEvents({
        beforeInsert: function() {
          self.createdBy = Meteor.userId();
        },
        beforeUpdate: function() {
          self.updatedBy.push(Meteor.userId());
        }
      })
    },
    initclass: function(schemaDefinition) {
      self.createdBy = Meteor.userId();
      self.updatedBy = [];
    }
  }
})