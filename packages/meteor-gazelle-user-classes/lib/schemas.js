Schemas = {};

Schemas.userClass = new SimpleSchema({
  title: {
    type: String,
    label: 'The user class title'
  },
  shortTitle: {
    type: String,
    label: 'The shortened title of the user class'
  },
  //TODO(ajax) enable ranking
  /*
  rank: {
    label: 'The user classes\' ranking in relation to other classes'
  }
  */
});
