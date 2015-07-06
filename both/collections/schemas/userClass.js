Schemas.userClass = new SimpleSchema({
  title: {
    type: String,
    label: 'The class title'
  },
  shortTitle: {
    type: String,
    label: 'The shortened title of the class'
  },
  roles: {
    type: [String],
    label: 'The roles this class carries'
  }
});
