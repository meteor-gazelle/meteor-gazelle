Schemas.announcements = new SimpleSchema({
  title: {
    type: String,
    label: 'The title of the announcement'
  },
  body: {
    type: String,
    label: 'The body of the announcement'
  },
  createdBy: {
    type: String,
    label: 'The user who created this announcement',
    defaultValue: function () {
      return this.userId;
    },
    optional: true
  },
  createdAt: {
    type: Date,
    label: 'The time at which this announcement was created',
    autoValue: function () {
      return new Date();
    },
    optional: true
  }
});