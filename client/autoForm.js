AutoForm.hooks({
  userEditForm: {
    docToForm: function (doc) {
      doc.userId = doc._id;
      return doc;
    }
  }
});
